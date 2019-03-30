from mysql import connection
import json


class Regiao:

    def json(self, data):
        return json.dumps(data, indent=4)

    def get_estados_siglas(self):
        with connection.cursor() as cursor:
            siglas = []
            cursor.execute("SELECT sigla FROM estados")
            res = cursor.fetchall()
            for item in res:
                siglas.append(item['sigla'])
            return self.json(siglas)

    def get_municipios_by_uf(self, uf):
        with connection.cursor() as cursor:
            items = []
            cursor.execute("SELECT * FROM comarcas WHERE uf = '{uf}'".format(uf=uf))
            res = cursor.fetchall()
            for item in res:
                items.append({"codibge": item['codibge'], "nome": item['nome']})
            return self.json(items)

