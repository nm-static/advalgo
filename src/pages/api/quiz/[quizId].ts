import type { APIRoute } from "astro";
import { getAuthenticatedUser } from "@/lib/auth";
import { getStudentQuizData } from "@/lib/sheets";

export const prerender = false;

export const GET: APIRoute = async ({ params, cookies }) => {
  try {
    // Check authentication
    const email = await getAuthenticatedUser(cookies);

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: "Not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse quiz ID
    const quizId = parseInt(params.quizId || "", 10);

    if (isNaN(quizId) || quizId < 1 || quizId > 6) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid quiz ID" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch quiz data
    const quizData = await getStudentQuizData(email, quizId);

    return new Response(JSON.stringify({ success: true, data: quizData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Quiz data error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
