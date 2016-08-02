import flask
from app import api


@api.route('/')
def login():
    return flask.render_template('Login.html')
