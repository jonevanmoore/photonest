from app.models import db, Comment
from datetime import datetime


def seed_comments():
    comment1 = Comment(user_id=2, post_id=2, content='That looks amazing!',
                       created_at=datetime.now(), updated_at=datetime.now())
    comment2 = Comment(user_id=3, post_id=1,
                       content='I think I\'ll go here for my next vacay!', created_at=datetime.now(), updated_at=datetime.now())
    comment3 = Comment(user_id=1, post_id=3, content='I need to get out more',
                       created_at=datetime.now(), updated_at=datetime.now())

    comments = [comment1, comment2, comment3]

    for comment in comments:
        db.session.add(comment)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
