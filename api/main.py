from flask import Flask, request
from models.processo import Process
from models.regiao import Regiao
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# PROCESSOS
p = Process()


@app.route('/processos', methods=['POST'])
def product():
    return str(p.new(request))


@app.route('/processos/<num_processo>')
def get_process(num_processo):
    return p.json(p.get_process(num_processo))


@app.route('/processos/pagina/<int:num>')
def get_processes_by_page(num):
    return p.get_processes(num)


# REGIÕES
r = Regiao()


@app.route('/regioes/estados/siglas')
def estados_siglas():
    return r.get_estados_siglas()


@app.route('/regioes/municipios/<uf>')
def municipios_by_uf(uf):
    return r.get_municipios_by_uf(uf)


if __name__ == "__main__":
    app.run()
