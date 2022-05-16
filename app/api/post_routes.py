from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, User, Post
from app.forms import NewPost, EditPost
from .aws import allowed_file, get_unique_filename, upload_file_to_s3

post_routes = Blueprint('posts', __name__)

# GET ALL POSTS


@post_routes.route('/')
@login_required
def all_posts():
    posts = Post.query.all()
    return jsonify([post.to_dict() for post in posts])

# CREATE POST


@post_routes.route('/<int:user_id>', methods=['POST'])
def create_post(user_id):
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]
    caption = request.values['caption']

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    # uploading to amazon and their response is an obj with url
    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    # pull url out of obj and assign the url to the database (line 58)
    url = upload["url"]
    # flask_login allows us to get the current user from the request
    # new_image = Image(user=current_user, url=url)

    post = Post(
        user_id=current_user.id,
        post_image=url,
        caption=caption
    )
    db.session.add(post)
    db.session.commit()
    # to_dict convert to python dictionary and gets packaged before sends to frontend as json
    return post.to_dict()


# UPDATE POST
@post_routes.route('/<int:id>', methods=['PUT'])
def update_post(id):

    post = Post.query.get(id)
    post.caption = request.json['caption']

    db.session.commit()
    return post.to_dict()


# DELETE POST
@post_routes.route('/<int:id>', methods=['DELETE'])
def delete_post(id):

    post = Post.query.get(id)

    db.session.delete(post)
    db.session.commit()
    return jsonify(id)
