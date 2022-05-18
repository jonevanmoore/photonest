from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


@user_routes.route('/<username>')
def user(username):
    user = User.query.filter(User.username == username).first()
    return user.to_dict()
