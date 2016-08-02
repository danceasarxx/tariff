from flask import Flask
from pymongo import MongoClient


api = Flask(__name__)
tariffClient = MongoClient()
tariffdb = tariffClient.tariffdb

from app import users  # noqa
