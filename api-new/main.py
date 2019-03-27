from flask import Flask
import json
import pymysql.cursors

app = Flask(__name__)

connection = pymysql.connect(host='186.202.152.122',
                             user='legal_insights',
                             password='kx03dbj49c1-',
                             db='legal_insights',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)


@app.route('/api/processos/page/<page>')
def hello_world(page):
    try:
        with connection.cursor() as cursor:
            sql = """SELECT 
                    p.num_processo, 
                    DATE_FORMAT(p.data_distrib, '%d/%m/%Y') as data_distrib,
                    p.reu_principal,
                    p.valor_causa,
                    p.vara,
                    p.comarca as codibge,
                    c.nome as comarca,
                    p.uf,
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
    finally:
        connection.close()
