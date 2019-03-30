from mysql import connection
import json


class Process:
    def __init__(self):
        self.process = []
        self.processes = []
        self.ppp = 1  # processes per page

    def json(self, data):
        return json.dumps(data, indent=4)

    def get_process(self, process_id):
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
                WHERE num_processo = {id}""".format(id=process_id)
            cursor.execute(sql)
            self.process = cursor.fetchone()

    def get_processes(self, pagina = 1, ret = False):
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
            self.processes = cursor.fetchall()
            if ret:
                total = len(self.processes)
                data = {
                    "items": self.processes,
                    "total": total,
                    "pagina": pagina,
                    "paginas": int(total / self.ppp)
                }
                return self.json(data)

