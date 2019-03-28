from mysql import connection
import json


@app.route('/processos/<id>')
def get_processo(id):
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
                WHERE num_processo = {id}""".format(id=id)
            cursor.execute(sql)


@app.route('/processos/page/<page>')
def get_processos_by_page(page):
    with connection.cursor() as cursor:
        sql = """SELECT p.num_processo, 
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
