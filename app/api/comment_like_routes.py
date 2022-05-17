from app.models import db, CommentLike
from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from flask_login import current_user, login_required

comment_like_routes = Blueprint('comment_likes', __name__)


@comment_like_routes.route('/<int:comment_id>')
def get_comment_likes(comment_id):

    all_likes = CommentLike.query.filter(
        CommentLike.comment_id == comment_id).all()
    comment_likes = [like.to_dict() for like in all_likes]
    return jsonify(comment_likes)


@comment_like_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def toggle_likes(comment_id):
    user_id = current_user.id

    like = CommentLike.query.filter(
        CommentLike.user_id == user_id, CommentLike.comment_id == comment_id).first()

    if like:
        db.session.delete(like)
        db.session.commit()
        return jsonify({"status": "deleted", "comment_id": comment_id, "like_id": like.id})
    else:
        data = {
            "comment_id": comment_id,
            "user_id": user_id
        }

        like = CommentLike(**data)
        db.session.add(like)
        db.session.commit()
        return jsonify(like.to_dict())
