from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db, Follow

follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/<int:followed_id>', methods=['POST'])
@login_required
def follow_user(followed_id):
    followed_user = User.query.filter(User.id == followed_id).first()

    current_user_following_list = current_user.following
    check_follow_id = None
    for element in current_user_following_list:
        if element.to_dict()["followed_id"] == followed_id:
            check_follow_id = element.to_dict()["followed_id"]

    if followed_id != current_user.id:
        if followed_id != check_follow_id:
            follow = Follow(
                follower_id=current_user.id,
                followed_id=followed_user.id
            )
            db.session.add(follow)
            db.session.commit()
            return follow.to_dict()
        else:
            follows = Follow.query.filter(
                followed_id == Follow.followed_id).all()
            follow = [follow for follow in follows if follow.to_dict()[
                "follower_id"] == current_user.id]
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
    current_user = User.query.filter(User.id == user_id).first()

    current_user_followers_list = current_user.followers

    return jsonify([follow.to_dict() for follow in current_user_followers_list])


@follow_routes.route('/following/<int:user_id>')
@login_required
def get_following(user_id):
    current_user = User.query.filter(User.id == user_id).first()

    current_user_following_list = current_user.following

    return jsonify([follow.to_dict() for follow in current_user_following_list])
