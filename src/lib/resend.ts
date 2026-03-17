import { Resend } from "resend";

/**
 * Send OTP email to student
 */
export async function sendOTPEmail(
  email: string,
  otp: string
): Promise<{ success: boolean; error?: string }> {
  const apiKey = import.meta.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return { success: false, error: "Email service not configured" };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: import.meta.env.RESEND_FROM_EMAIL || "Course Portal <noreply@resend.dev>",
      to: email,
      subject: "Your Login Code - Advanced Algorithms Course",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 24px; color: #111;">
            Your Login Code
          </h1>

          <p style="font-size: 16px; color: #444; margin-bottom: 24px;">
            Use this code to sign in to the Advanced Algorithms course portal:
          </p>

          <div style="background: #f5f5f5; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #111;">
              ${otp}
            </span>
          </div>

          <p style="font-size: 14px; color: #666; margin-bottom: 8px;">
            This code will expire in <strong>10 minutes</strong>.
          </p>

          <p style="font-size: 14px; color: #666;">
            If you didn't request this code, you can safely ignore this email.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />

          <p style="font-size: 12px; color: #999;">
            Advanced Algorithms Course Portal
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
