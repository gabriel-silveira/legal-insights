from flask import Flask
from flask_cors import CORS
import json
import pymysql.cursors
from settings import config

app = Flask(__name__)
CORS(app)

connection = pymysql.connect(host=config['DB_HOST'],
                             user=config['DB_USER'],
                             password=config['DB_PASS'],
                             db=config['DB_NAME'],
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)


@app.route('/api/processos/page/<page>')
def get_processos_by_page(page):
    with connection.cursor() as cursor:
        sql = """SELECT p.num_processo, 
                DATE_FORMAT(p.data_distrib, '%d/%m/%Y') as data_distrib,
                p.reu_principal, p.valor_causa, p.vara, p.comarca as codibge,
                c.nome as comarca, p.uf,
                DATE_FORMAT(FROM_UNIXTIME(p.criado), '%d/%m/%Y') as criado,
                DATE_FORMAT(FROM_UNIXTIME(p.atualizado), '%d/%m/%Y') as atualizado
                FROM processos as p
                LEFT JOIN comarcas as c ON p.comarca = c.codibge 
                ORDER BY criado DESC"""
        cursor.execute(sql)
        processos = cursor.fetchall()
        data = {
            "items": processos,
            "total": 1,
            "limite": 1,
            "pagina": page,
            "paginas": 1
        }
        return json.dumps(data, indent=4)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port='8888', debug=True)
