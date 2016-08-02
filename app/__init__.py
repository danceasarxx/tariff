import flask
from flask import Flask

api = Flask(__name__)


@api.route('/')
def home():
    return flask.redirect('static/index.html')
