from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, User, Post
from app.forms import NewPost, EditPost


post_routes = Blueprint('posts', __name__)


@post_routes.route('/<int:post_id>/')
def get_post(post_id):
    post = Post.query.get(post_id).to_dict()
    return jsonify(post)


@post_routes.route('/', methods=['POST'])
@login_required
def create_post():
    form = NewPost()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            post_image=form.data['post_image'],
            caption=form.data['caption'],
            user_id=form.data['user_id']

        )

        # form.populate_obj(post)
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
