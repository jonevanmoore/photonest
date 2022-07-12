from crypt import methods
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db, Follow

follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/<int:followed_req_id>', methods=['POST'])
@login_required
def follow_user(followed_req_id):
    curr_user = User.query.filter(User.id == current_user.id).first()
    followed_user = User.query.filter(User.id == followed_req_id).first()

    curr_user_following_list = curr_user.following
    check_follow_id = None
    for element in curr_user_following_list:
        if element.to_dict()["followed_id"] == followed_req_id:
            check_follow_id = element.to_dict()["followed_id"]

    if followed_req_id != curr_user.id:
        if followed_req_id != check_follow_id:
            follow = Follow(
                follower_id=curr_user.id,
                followed_id=followed_user.id
            )
            db.session.add(follow)
            db.session.commit()
            return follow.to_dict()
        else:
            follows = Follow.query.filter(followed_req_id == Follow.followed_id).all()
            follow = [follow for follow in follows if follow.to_dict()["follower_id"] == curr_user.id]
            if follow:
                db.session.delete(follow[0])
                db.session.commit()
                return follow[0].to_dict()
    else:
        pass

    return

@follow_routes.route('/followers/<int:user_id>')
@login_required
def get_followers(user_id):
    curr_user = User.query.filter(User.id == user_id).first()

    curr_user_followers_list = curr_user.followers

    return jsonify([follow.to_dict() for follow in curr_user_followers_list])

@follow_routes.route('/following/<int:user_id>')
@login_required
def get_following(user_id):
    curr_user = User.query.filter(User.id == user_id).first()

    curr_user_following_list = curr_user.following

    return jsonify([follow.to_dict() for follow in curr_user_following_list])
