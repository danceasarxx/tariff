import flask
from app import api
from flask import request


@api.route('/')
def home():
    try:
        user = flask.session['user']
        return flask.render_template('dashboard.html', *user)
    except KeyError:
        return flask.render_template('login.html')


@api.route('/login', methods=['POST'])
def login():
    return str(request.args.get('phonenumber'))
