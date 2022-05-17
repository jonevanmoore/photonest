from app.models import db, PostLike
from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from flask_login import current_user, login_required

post_like_routes = Blueprint('post_likes', __name__)


@post_like_routes.route('/<int:post_id>')
def get_post_likes(post_id):

    all_likes = PostLike.query.filter(PostLike.post_id == post_id).all()
    post_likes = [like.to_dict() for like in all_likes]
    return jsonify(post_likes)


@post_like_routes.route('/<int:post_id>', methods=['PUT'])
@login_required
def toggle_likes(post_id):
    user_id = current_user.id

    like = PostLike.query.filter(
        PostLike.user_id == user_id, PostLike.post_id == post_id).first()

    if like:
        db.session.delete(like)
        db.session.commit()
        return jsonify({"status": "deleted", "post_id": post_id, "like_id": like.id})
    else:
        data = {
            "post_id": post_id,
            "user_id": user_id
        }

        like = PostLike(**data)
        db.session.add(like)
        db.session.commit()
        return jsonify(like.to_dict())
