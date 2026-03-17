import type { APIRoute } from "astro";
import { verifyOTP, createSession } from "@/lib/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!otp || typeof otp !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "OTP is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify OTP
    const isValid = verifyOTP(email, otp.trim());

    if (!isValid) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid or expired OTP" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create session
    const token = await createSession(email);

    // Set HttpOnly cookie
    cookies.set("session", token, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day
    });

    return new Response(
      JSON.stringify({ success: true, message: "Login successful" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Verify OTP error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
