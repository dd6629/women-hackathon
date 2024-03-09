from flask import Flask, render_template, request
import requests
from bs4 import BeautifulSoup

# Create a Flask application instance
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    """
    Handles GET and POST requests to the root URL ('/').

    - Processes form submission (POST) to extract and summarize content from a provided URL.
    - Returns the rendered 'index.html' template with content or an error message.
    """

    if request.method == 'POST':
        """
        Handles POST requests (form submission).
        """

        url = request.form['url']  # Get the entered URL from the form

        if url.startswith('http'):
            """
            Checks if the entered URL already includes a protocol (http or https).
            - If so, uses the URL directly without modification.
            """

            response = requests.get(url)  # Fetch the webpage content using requests

        else:
            """
            If the entered URL doesn't have a protocol, assumes it's a Wikipedia search term.
            - Constructs a complete URL by prepending 'https://en.wikipedia.org/wiki/'
            - Fetches the webpage content using requests
            """

            response = requests.get(f'https://en.wikipedia.org/wiki/{url}')

        if response.status_code == 200:  # Check if the request was successful (status code 200)
            """
            Parses the fetched HTML content using BeautifulSoup and the 'html.parser'
            """

            soup = BeautifulSoup(response.content, 'html.parser')

            try:
                """
                Attempts to extract the main content section from the parsed HTML.
                - Uses the specific ID 'bodyContent' (if present) for better targeting.
                - If 'bodyContent' is not found, falls back to using 'mw-content-text' (for Wikipedia).
                """

                content = soup.find('div', {'id': 'bodyContent'}).text.strip()
            except AttributeError:
                """
                Handles potential errors if the expected ID ('bodyContent') is not found.
                - Extracts content using the more generic 'mw-content-text' ID (if available).
                - Otherwise, returns an error message indicating that content extraction failed.
                """

                try:
                    content = soup.find('div', {'id': 'mw-content-text'}).text.strip()
                except AttributeError:
                    content = "Failed to extract content from the provided URL."

        else:
            """
            Handles unsuccessful requests (status code not 200).
            - Returns an error message indicating that the URL retrieval failed.
            """

            content = f"Error: Failed to retrieve content from the URL. Status code: {response.status_code}"

        return render_template('index.html', content=content)  # Render the template with extracted content

    return render_template('index.html')  # For GET requests, render the template without extracted content

if __name__ == '__main__':
    """
    Runs the Flask application in debug mode (useful for development).
    - Sets the 'SEND_FILE_MAX_AGE_DEFAULT' configuration to 0 to disable caching of static files
      during development, ensuring you see the latest changes.
    """

    app.run(debug=True)
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
