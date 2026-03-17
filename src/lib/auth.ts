import * as jose from "jose";

// In-memory OTP storage (works for low-traffic sites)
// For production with multiple serverless instances, consider using a KV store
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const SESSION_EXPIRY_SECONDS = 24 * 60 * 60; // 1 day

/**
 * Generate a 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Store OTP for an email address
 */
export function storeOTP(email: string, otp: string): void {
  const normalizedEmail = email.toLowerCase().trim();
  otpStore.set(normalizedEmail, {
    otp,
    expiresAt: Date.now() + OTP_EXPIRY_MS,
  });
}

/**
 * Verify OTP for an email address
 * Returns true if valid, false otherwise
 * Deletes the OTP after verification (one-time use)
 */
export function verifyOTP(email: string, otp: string): boolean {
  const normalizedEmail = email.toLowerCase().trim();
  const stored = otpStore.get(normalizedEmail);

  if (!stored) {
    return false;
  }

  // Check expiry
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(normalizedEmail);
    return false;
  }

  // Check OTP match
  if (stored.otp !== otp) {
    return false;
  }

  // Delete after successful verification
  otpStore.delete(normalizedEmail);
  return true;
}

/**
 * Create a JWT session token for authenticated user
 */
export async function createSession(email: string): Promise<string> {
  const secret = new TextEncoder().encode(
    import.meta.env.JWT_SECRET || "dev-secret-change-me"
  );

  const token = await new jose.SignJWT({ email: email.toLowerCase().trim() })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_EXPIRY_SECONDS}s`)
    .sign(secret);

  return token;
}

/**
 * Verify a JWT session token
 * Returns the email if valid, null otherwise
 */
export async function verifySession(token: string): Promise<string | null> {
  try {
    const secret = new TextEncoder().encode(
      import.meta.env.JWT_SECRET || "dev-secret-change-me"
    );

    const { payload } = await jose.jwtVerify(token, secret);

    if (typeof payload.email === "string") {
      return payload.email;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Get email from request cookies
 * Returns email if authenticated, null otherwise
 */
export async function getAuthenticatedUser(
  cookies: { get: (name: string) => { value: string } | undefined }
): Promise<string | null> {
  const sessionCookie = cookies.get("session");
  if (!sessionCookie) {
    return null;
  }
  return verifySession(sessionCookie.value);
}

// Clean up expired OTPs periodically (runs on module load)
setInterval(() => {
  const now = Date.now();
  for (const [email, data] of otpStore.entries()) {
    if (now > data.expiresAt) {
      otpStore.delete(email);
    }
  }
}, 60 * 1000); // Check every minute
