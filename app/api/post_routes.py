from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, User, Post
from app.forms import NewPost, EditPost
from app.api.utils import validation_errors_to_error_messages


post_routes = Blueprint('posts', __name__)


@post_routes.route('/<int:post_id>/')
def get_post(post_id):
    post = Post.query.get(post_id).to_dict()
    return jsonify(post)


@post_routes.route('/create/<user_id>', methods=['POST'])
@login_required
def create_post(user_id):
    form = NewPost()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = {
            "user_id": user_id,
            "post_image": form.data["post_image"],
            "caption": form.data["caption"],
        }

        post = Post(**data)
        db.session.add(post)
        db.session.commit()
        return jsonify(post.to_dict())
    print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
