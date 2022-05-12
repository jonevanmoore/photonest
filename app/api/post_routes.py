from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, User, Post
from app.forms import NewPost, EditPost


post_routes = Blueprint('posts', __name__)

# GET ALL POSTS


@post_routes.route('/')
@login_required
def all_posts():
    posts = Post.query.all()
    return jsonify([post.to_dict() for post in posts])

# CREATE POST


@post_routes.route('/', methods=['POST'])
def create_post():
    form = NewPost()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            post_image=form.data['post_image'],
            caption=form.data['caption'],
            user_id=form.data['user_id']

        )

        db.session.add(post)
        db.session.commit()
        return post.to_dict()


# UPDATE POST
@post_routes.route('/<int:id>', methods=['PUT'])
def update_post(id):

    post = Post.query.get(id)
    post.caption = request.json['caption']

    db.session.commit()
    return post.to_dict()
