from flask import Flask
from flask_cors import CORS
from controllers.processes import process

app = Flask(__name__)
app.register_blueprint(process)
CORS(app)


if __name__ == "__main__":
    app.run()
