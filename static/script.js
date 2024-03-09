async function translateText(text, source = "en", target = "te") {
  // console.log(text);
  // console.log("Translation initiated");
  // Encode text to handle special characters
  const encodedText = encodeURI(text);

  // Construct the translation URL
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodedText}`;

  try {
    // Fetch translation data
    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);

    // Extract and join translated snippets
    const translatedText = data[0].map((snippet) => snippet[0]).join("");

    // Return the translated text
    console.log(translatedText);
    return translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    return "Translation error";
  }
}

// Example usage (assuming you have elements with IDs)
const scrapedContent = document.getElementById("scrapedContent");
const translatedText = document.getElementById("translatedText");
const languageSelect = document.getElementById("languageSelect");

const fetchButton = document.getElementById("fetchButton");

// languageSelect.addEventListener("change", async () => {
fetchButton.addEventListener("click", async () => {
  const selectedLanguage = languageSelect.value;
  console.log(selectedLanguage);
  const scraped = scrapedContent.value;
  console.log(scraped);

  const translated = await translateText(scraped, "en", selectedLanguage);
  //console.log(translated);
  if (translatedText === null) {
    console.error(
      "Error: The 'translatedText' element does not exist in the HTML"
    );
  } else {
    translatedText.textContent = translated;
  }
});
