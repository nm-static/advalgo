import { google } from "googleapis";
import { getActiveBatches, type BatchConfig } from "./batches";

export interface QuizData {
  quizNumber: number;
  answers: Record<string, string>; // { Q1: "A", Q2: "B", ... }
  total: number | null;
  found: boolean;
}

export interface BatchQuizData {
  batch: BatchConfig;
  quizzes: QuizData[];
}

// Sheet names expected in each Google Sheet
const QUIZ_SHEET_NAMES = [
  "Quiz 1",
  "Quiz 2",
  "Quiz 3",
  "Quiz 4",
  "Quiz 5",
  "Quiz 6",
];

/**
 * Get authenticated Google Sheets client
 */
function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: (import.meta.env.GOOGLE_PRIVATE_KEY || "").replace(
        /\\n/g,
        "\n"
      ),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return google.sheets({ version: "v4", auth });
}

/**
 * Get quiz data for a specific student, quiz number, and sheet ID
 */
async function getQuizDataFromSheet(
  email: string,
  quizNumber: number,
  sheetId: string
): Promise<QuizData> {
  const normalizedEmail = email.toLowerCase().trim();

  if (!sheetId) {
    return { quizNumber, answers: {}, total: null, found: false };
  }

  if (quizNumber < 1 || quizNumber > 6) {
    return { quizNumber, answers: {}, total: null, found: false };
  }

  const sheetName = QUIZ_SHEET_NAMES[quizNumber - 1];

  try {
    const sheets = getSheetsClient();

    console.log(`[Sheets] Fetching ${sheetName} from sheet ${sheetId} for email: ${normalizedEmail}`);

    // Get all data from the quiz sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `'${sheetName}'`,
    });

    const rows = response.data.values;
    console.log(`[Sheets] Got ${rows?.length || 0} rows from ${sheetName}`);

    if (!rows || rows.length < 2) {
      console.log(`[Sheets] No data in ${sheetName}`);
      return { quizNumber, answers: {}, total: null, found: false };
    }

    // First row is headers
    const headers = rows[0].map((h: string) => String(h).trim());

    // Find the email column (usually first column)
    const emailColIndex = headers.findIndex(
      (h: string) => h.toLowerCase() === "email"
    );
    console.log(`[Sheets] Headers: ${headers.join(', ')}`);
    console.log(`[Sheets] Email column index: ${emailColIndex}`);

    if (emailColIndex === -1) {
      console.error(`No 'Email' column found in ${sheetName}`);
      return { quizNumber, answers: {}, total: null, found: false };
    }

    // Find the total column
    const totalColIndex = headers.findIndex(
      (h: string) => h.toLowerCase() === "total"
    );

    // Find the student's row
    const studentRow = rows.find(
      (row: string[], index: number) =>
        index > 0 &&
        row[emailColIndex] &&
        String(row[emailColIndex]).toLowerCase().trim() === normalizedEmail
    );

    if (!studentRow) {
      return { quizNumber, answers: {}, total: null, found: false };
    }

    // Build answers object (only columns AFTER email, excluding total)
    const answers: Record<string, string> = {};
    headers.forEach((header: string, index: number) => {
      // Skip columns before or at email index, and skip total column
      if (
        index > emailColIndex &&
        index !== totalColIndex &&
        header &&
        studentRow[index] !== undefined
      ) {
        answers[header] = String(studentRow[index]);
      }
    });

    // Get total
    const total =
      totalColIndex !== -1 && studentRow[totalColIndex] !== undefined
        ? parseFloat(studentRow[totalColIndex]) || null
        : null;

    return { quizNumber, answers, total, found: true };
  } catch (error) {
    console.error(`Error fetching quiz ${quizNumber} data:`, error);
    return { quizNumber, answers: {}, total: null, found: false };
  }
}

/**
 * Get all quiz data for a student from a specific batch
 */
async function getAllQuizDataFromBatch(
  email: string,
  batch: BatchConfig
): Promise<BatchQuizData> {
  const quizzes = await Promise.all(
    [1, 2, 3, 4, 5, 6].map((quizNum) =>
      getQuizDataFromSheet(email, quizNum, batch.sheetId)
    )
  );

  return { batch, quizzes };
}

/**
 * Check if student exists in a specific batch (checks ALL quiz sheets)
 */
async function isStudentInBatch(
  email: string,
  sheetId: string
): Promise<boolean> {
  // Check all quiz sheets, not just Quiz 1
  const results = await Promise.all(
    [1, 2, 3, 4, 5, 6].map((quizNum) =>
      getQuizDataFromSheet(email, quizNum, sheetId)
    )
  );
  // Student is in batch if found in ANY quiz
  return results.some((quiz) => quiz.found);
}

/**
 * Get all quiz data for a student across ALL batches they're enrolled in
 * Returns data from multiple batches if student took the course multiple times
 */
export async function getAllStudentData(email: string): Promise<BatchQuizData[]> {
  const activeBatches = getActiveBatches();

  if (activeBatches.length === 0) {
    console.warn("No batches configured with valid sheet IDs");
    return [];
  }

  // Check all batches in parallel
  const results = await Promise.all(
    activeBatches.map(async (batch) => {
      const isEnrolled = await isStudentInBatch(email, batch.sheetId);
      if (isEnrolled) {
        return getAllQuizDataFromBatch(email, batch);
      }
      return null;
    })
  );

  // Filter out batches where student wasn't found
  return results.filter((result): result is BatchQuizData => result !== null);
}

/**
 * Check if an email exists in any batch
 */
export async function isStudentEnrolled(email: string): Promise<boolean> {
  const activeBatches = getActiveBatches();

  for (const batch of activeBatches) {
    if (await isStudentInBatch(email, batch.sheetId)) {
      return true;
    }
  }

  return false;
}

// Legacy exports for backward compatibility
export async function getStudentQuizData(
  email: string,
  quizNumber: number
): Promise<QuizData> {
  const activeBatches = getActiveBatches();
  if (activeBatches.length === 0) {
    return { quizNumber, answers: {}, total: null, found: false };
  }
  // Use first batch as default
  return getQuizDataFromSheet(email, quizNumber, activeBatches[0].sheetId);
}

export async function getAllQuizData(email: string): Promise<QuizData[]> {
  const allData = await getAllStudentData(email);
  if (allData.length === 0) {
    return [1, 2, 3, 4, 5, 6].map((quizNumber) => ({
      quizNumber,
      answers: {},
      total: null,
      found: false,
    }));
  }
  // Return first batch's data for legacy compatibility
  return allData[0].quizzes;
}
