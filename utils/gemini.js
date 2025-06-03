import axios from "axios";

const GEMINI_API_KEY = "AIzaSyB9v27H-Rdg8Vwy-NmNtzuEmjTeJQ8qsWs"; // <-- jouw sleutel

export async function generateWithGemini(prompt) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY;

  try {
    const response = await axios.post(url, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Geen resultaat ontvangen."
    );
  } catch (error) {
    console.error("Gemini API fout:", error);
    return "Er ging iets mis bij het ophalen van een suggestie.";
  }
}
