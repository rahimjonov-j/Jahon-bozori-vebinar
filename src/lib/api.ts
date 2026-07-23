"use server";

export interface RegistrationData {
  ism: string;
  familya: string;
  nomer: string;
  yonalish: string;
}

/**
 * Reusable function to submit form data to Google Sheets via Google Apps Script.
 */
export async function submitRegistration(data: RegistrationData) {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  if (!url) {
    throw new Error("Google Script URL is not defined in environment variables");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  try {
    return await response.json();
  } catch (error) {
    // Some apps scripts don't return JSON
    return { success: true };
  }
}
