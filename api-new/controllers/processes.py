from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from models.processo import Process

process = Blueprint('processos', __name__)
CORS(process)

p = Process()


@process.route('/', methods=['POST'])
def product():
    data = request.json
    return p.json(data)


@process.route('/<num_processo>')
def get_process(num_processo):
    p.get_process(num_processo)
    return p.json(p.process)


@process.route('/pagina/<int:num>')
def get_processes_by_page(num):
    return p.get_processes(num, True)

