from flask import Flask, render_template, request
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        url = request.form['url']
        if url.startswith('http'):
            response = requests.get(url)
            soup = BeautifulSoup(response.content, 'html.parser')
            content = soup.find('div', {'id': 'bodyContent'}).text  # Extract text content
        else:
            content = BeautifulSoup(requests.get(f'https://en.wikipedia.org/wiki/{url}').content, 'html.parser').find('div', {'id': 'mw-content-text'}).text

        return render_template('index.html', content=content)

    return render_template('index.html')

if __name__ == '_main_':
    app.run(debug=True)
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0