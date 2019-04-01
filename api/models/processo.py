from mysql import connection
import json


class Process:
    def __init__(self):
        self.ppp = 5  # processes per page

    def json(self, data):
        return json.dumps(data, indent=4)

    @staticmethod
    def new(req):
        data = req.json
        with connection.cursor() as cursor:
            sql = """INSERT INTO `processos` (`num_processo`, `data_distrib`, `reu_principal`, 
            `valor_causa`, `vara`, `comarca`, `uf`, `criado`, `atualizado`) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
            dt = data['data_distrib'].split('/')
            data_formatada = dt[2]+'-'+dt[1]+'-'+dt[0]
            rows = cursor.execute(sql, (data['num_processo'], data_formatada, data['reu'],
                                        data['valor'].replace('.', '').replace(',', '.'), data['vara'], data['codibge'], data['estado'], 0, 0))
        connection.commit()
        return 1 if rows > 0 else 0

    @staticmethod
    def get_process(process_id):
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
            return cursor.fetchone()

    def get_processes(self, page=1):
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
            processes = cursor.fetchall()
            total = len(processes)

            end = page * self.ppp
            start = end - self.ppp
            i = 1

            processes_page = {"items": []}
            for process in processes:
                if start < i <= end:
                    processes_page['items'].append(process)
                i += 1

            processes_page["total"] = total
            processes_page["pagina"] = page
            processes_page["paginas"] = int(total / self.ppp)
            return self.json(processes_page)

