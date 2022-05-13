from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.forms import CreateCommentForm, EditCommentForm
from app.models import db, Comment

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/')
def get_comments():
    comments = Comment.query.all()

    return jsonify([comment.to_dict() for comment in comments])


@comment_routes.route('/', methods=['POST'])
def create_comment():
    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            user_id=form.data['user_id'],
            post_it=form.data['post_id'],
            content=form.data['content']
        )

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
