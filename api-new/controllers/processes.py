from flask import Blueprint
from models.processo import Process
p = Process()

process = Blueprint('processos', __name__, url_prefix='/processos')


@process.route('/<num_processo>')
def get_process(num_processo):
    p.get_process(num_processo)
    return p.json(p.process)


@process.route('/pagina/<num>')
def get_processes_by_page(num):
    p.get_processes(num)
    return p.json(p.processes)

