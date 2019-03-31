from dotenv import load_dotenv
import os
load_dotenv()


keys = ['DB_HOST', 'DB_USER', 'DB_PASS', 'DB_NAME']
config = {}
for key in keys:
    config[key] = os.getenv(key)
