async function translateText(text, source = "en", target = "te") {
  // **Comment:** This line defines an asynchronous function named `translateText` that takes three arguments:
  //   - `text`: The text to be translated.
  //   - `source` (optional): The source language (defaults to "en" for English).
  //   - `target` (optional): The target language (defaults to "te" for Telugu).

  // **Commented out lines:** These lines were likely for debugging purposes and could be removed.
  // - `console.log(text);`
  // - `console.log("Translation initiated");`

  // **Comment:** This line encodes the text to handle special characters that might cause issues in the translation request.
  const encodedText = encodeURI(text);

  // **Comment:** This line constructs the URL for the Google Translate API endpoint, including:
  //   - Base URL: `https://translate.googleapis.com/translate_a/single`
  //   - Parameters:
  //     - `client=gtx`: Identifies the translation client.
  //     - `sl=${source}`: Source language code (e.g., "en" for English).
  //     - `tl=${target}`: Target language code (e.g., "te" for Telugu).
  //     - `dt=t`: Translation type (text).
  //     - `q=${encodedText}`: Encoded text to be translated.
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=<span class="math-inline">\{source\}&tl\=</span>{target}&dt=t&q=${encodedText}`;
  try {
    // **Comment:** This block attempts to fetch the translation data using `fetch`.
    const response = await fetch(url);

    // **Comment:** This line waits for the response to be fully received and then parses it as JSON.
    const data = await response.json();

    // **Commented out line:** This line was likely for debugging purposes and could be removed.
    // - `console.log(data);`

    // **Comment:** This line extracts the translated text from the response data.
    // It iterates through the first element of the response array (`data[0]`) and joins the translated snippets from each element (`snippet[0]`).
    const translatedText = data[0].map((snippet) => snippet[0]).join("");

    // **Comment:** This line returns the translated text.
    console.log(translatedText);
    return translatedText;
  } catch (error) {
    // **Comment:** This block handles any errors that might occur during translation.
    console.error("Error translating text:", error);
    return "Translation error"; // Return a default message for error cases.
  }
}

// Example usage
const translatedText = document.getElementById("translatedText");
const languageSelect = document.getElementById("languageSelect");
const fetchButton = document.getElementById("fetchButton");

fetchButton.addEventListener("click", async () => {
  const selectedLanguage = languageSelect.value;
  console.log(selectedLanguage);

  // Check if scrapedContent element exists before accessing its value
  const scrapedContent = document.getElementById("scrapedContent");
  let scrapedText;
  if (scrapedContent) {
    scrapedText = scrapedContent.value;
  } else {
    console.error("Element with ID 'scrapedContent' not found.");
    return; // Exit if element is missing
  }
  console.log(scrapedText);

  const translated = await translateText(scrapedText, "en", selectedLanguage);
  translatedText.textContent = translated || "Translation failed"; // Set default if translation fails
});
