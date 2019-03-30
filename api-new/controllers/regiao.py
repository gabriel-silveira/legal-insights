from flask import Blueprint
from flask_cors import CORS, cross_origin
from models.regiao import Regiao

regiao = Blueprint('regioes', __name__)
CORS(regiao)

r = Regiao()


@regiao.route('/estados/siglas')
@cross_origin()
def estados_siglas():
    return r.get_estados_siglas()


@regiao.route('/municipios/<uf>')
@cross_origin()
def municipios_by_uf(uf):
    return r.get_municipios_by_uf(uf)
