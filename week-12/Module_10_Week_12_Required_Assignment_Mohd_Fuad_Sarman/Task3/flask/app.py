from flask import Flask, session

app = Flask(__name__)
app.secret_key = 'flask-cat-secret'

@app.route('/')
def home():
    session['visits'] = session.get('visits', 0) + 1
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
      <title>Flask Cat Page</title>
      <link rel="stylesheet" href="/static/style.css">
    </head>
    <body>
      <div class="container">
        <h1>Welcome to the Cat Lounge</h1>
        <p>You have visited this page <strong>{session['visits']}</strong> time(s).</p>
        <img src="/static/my-cat.jpeg" alt="My Cat" class="cat-img">
      </div>
    </body>
    </html>
    """

if __name__ == '__main__':
    app.run(port=3000, debug=True)
