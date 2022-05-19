from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import db, User
from app.forms import UpdateUserForm
from .aws import allowed_file, get_unique_filename, upload_file_to_s3

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


@user_routes.route('/<username>')
def user(username):
    user = User.query.filter(User.username == username).first()
    return user.to_dict()

@user_routes.route('/<int:user_id>/', methods=['PUT'])
@login_required
def update_profile(user_id):
        if "image" not in request.files:
            return {"errors": "image required"}, 400

        image = request.files["image"]
        username = request.values['username']
        first_name = request.values['first_name']
        last_name = request.values['last_name']


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
        user = User.query.filter(User.id == user_id).first()

        user.first_name = first_name
        user.last_name = last_name
        user.username = username
        user.profile_image = url

        db.session.commit()
        # to_dict convert to python dictionary and gets packaged before sends to frontend as json
        return user.to_dict()
