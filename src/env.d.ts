/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly RESEND_FROM_EMAIL?: string;
  // Batch-specific Google Sheets IDs
  readonly GOOGLE_SHEETS_ID_2026?: string;
  readonly GOOGLE_SHEETS_ID_2027?: string;
  // Add more as needed: GOOGLE_SHEETS_ID_2028, etc.
  readonly GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  readonly GOOGLE_PRIVATE_KEY: string;
  readonly JWT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
