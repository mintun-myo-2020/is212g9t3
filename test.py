from sre_constants import JUMP
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS
import pymysql
pymysql.install_as_MySQLdb()
from datetime import datetime, timezone
from dotenv import load_dotenv

load_dotenv()

host=os.getenv('HOST')
port=3306
dbname="skillsdb"
user=os.getenv('USER')
password=os.getenv('PASSWORD')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{user}:{password}@{host}:{port}/{dbname}'


print(host, user, password)