import { toast } from "react-toastify";
import { FormData } from "../app/contact/components/ContactForm";

export async function sendEmail(data: FormData): Promise<unknown> {
  // Explicitly specify the return type
  const apiEndpoint = "/api/email";

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Ensure headers are set correctly
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const result = await response.json();
    toast.success(result.message);
    return result;
  } catch (err) {
    // @ts-expect-error fgdsfgfd
    toast.error(err.message || "An error occurred");
    throw err;
  }
}
