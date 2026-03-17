/**
 * Batch configuration for multiple course offerings
 * Add new batches here as you teach the course again
 */

export interface BatchConfig {
  id: string;           // Unique identifier
  name: string;         // Display name (e.g., "Jan-Apr 2026")
  sheetId: string;      // Google Sheets ID for this batch
  active?: boolean;     // Whether this batch is currently active
}

// Configure your batches here
// Sheet ID is the long string in the Google Sheets URL:
// https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
export const batches: BatchConfig[] = [
  {
    id: "2026-jan",
    name: "Jan-Apr 2026",
    sheetId: import.meta.env.GOOGLE_SHEETS_ID_2026 || "",
    active: true,
  },
  // Add future batches here:
  // {
  //   id: "2027-jan",
  //   name: "Jan-Apr 2027",
  //   sheetId: import.meta.env.GOOGLE_SHEETS_ID_2027 || "",
  //   active: true,
  // },
];

/**
 * Get all configured batches with valid sheet IDs
 */
export function getActiveBatches(): BatchConfig[] {
  return batches.filter(batch => batch.sheetId && batch.sheetId.length > 0);
}

/**
 * Get a specific batch by ID
 */
export function getBatchById(id: string): BatchConfig | undefined {
  return batches.find(batch => batch.id === id);
}
