import pymysql.cursors
from settings import config


connection = pymysql.connect(host=config['DB_HOST'],
                             user=config['DB_USER'],
                             password=config['DB_PASS'],
                             db=config['DB_NAME'],
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
