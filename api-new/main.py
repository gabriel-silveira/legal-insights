from flask import Flask
from controllers.processes import process
from controllers.regiao import regiao

app = Flask(__name__)
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
app.register_blueprint(process, url_prefix='/processos')
app.register_blueprint(regiao, url_prefix='/regioes')


if __name__ == "__main__":
    app.run()
