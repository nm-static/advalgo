import type { APIRoute } from "astro";
import { google } from "googleapis";
import { getActiveBatches } from "@/lib/batches";
import { getAuthenticatedUser } from "@/lib/auth";

export const prerender = false;

/**
 * Debug endpoint to check Google Sheets connection
 * Access at /api/debug/sheets
 */
export const GET: APIRoute = async ({ cookies }) => {
  const email = await getAuthenticatedUser(cookies);

  if (!email) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const results: Record<string, unknown> = {
    loggedInAs: email,
    batches: [],
  };

  const activeBatches = getActiveBatches();

  if (activeBatches.length === 0) {
    results.error = "No batches configured with valid sheet IDs";
    results.envCheck = {
      GOOGLE_SHEETS_ID_2026: !!import.meta.env.GOOGLE_SHEETS_ID_2026,
      GOOGLE_SERVICE_ACCOUNT_EMAIL: !!import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY: !!import.meta.env.GOOGLE_PRIVATE_KEY,
    };
    return new Response(JSON.stringify(results, null, 2), {
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
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

    const sheets = google.sheets({ version: "v4", auth });

    for (const batch of activeBatches) {
      const batchResult: Record<string, unknown> = {
        batchId: batch.id,
        batchName: batch.name,
        sheetId: batch.sheetId,
        tabs: [],
      };

      try {
        // Get spreadsheet metadata to see available sheets
        const spreadsheet = await sheets.spreadsheets.get({
          spreadsheetId: batch.sheetId,
        });

        const sheetNames = spreadsheet.data.sheets?.map(
          (s) => s.properties?.title
        ) || [];
        batchResult.availableTabs = sheetNames;

        // Try to read Quiz 1 sheet
        try {
          const quiz1Response = await sheets.spreadsheets.values.get({
            spreadsheetId: batch.sheetId,
            range: "'Quiz 1'",
          });

          const rows = quiz1Response.data.values;
          if (rows && rows.length > 0) {
            const headers = rows[0];
            batchResult.quiz1Headers = headers;
            batchResult.quiz1RowCount = rows.length;

            // Check for email column
            const emailColIndex = headers.findIndex(
              (h: string) => String(h).toLowerCase().trim() === "email"
            );
            batchResult.emailColumnIndex = emailColIndex;

            if (emailColIndex !== -1 && rows.length > 1) {
              // Get sample emails (first 5, masked)
              const sampleEmails = rows.slice(1, 6).map((row: string[]) => {
                const e = row[emailColIndex];
                if (e) {
                  const parts = String(e).split("@");
                  if (parts.length === 2) {
                    return parts[0].substring(0, 3) + "***@" + parts[1];
                  }
                }
                return "(empty)";
              });
              batchResult.sampleEmails = sampleEmails;

              // Check if logged-in email exists
              const normalizedEmail = email.toLowerCase().trim();
              const found = rows.slice(1).some(
                (row: string[]) =>
                  row[emailColIndex] &&
                  String(row[emailColIndex]).toLowerCase().trim() === normalizedEmail
              );
              batchResult.loggedInEmailFound = found;
            }
          } else {
            batchResult.quiz1Error = "Sheet is empty";
          }
        } catch (quiz1Error) {
          batchResult.quiz1Error = String(quiz1Error);
        }
      } catch (batchError) {
        batchResult.error = String(batchError);
      }

      (results.batches as unknown[]).push(batchResult);
    }
  } catch (authError) {
    results.authError = String(authError);
  }

  return new Response(JSON.stringify(results, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
