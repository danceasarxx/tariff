import flask
from flask import request
from app import api


@api.route('/')
def home():
    try:
        user = flask.session['user']
        return flask.render_template('dashboard.html', *user)
    except KeyError:
        return flask.render_template('login.html')


@api.route('/login', methods=['POST'])
def login():
    print(request.args)
