from app.models import db, Post
from datetime import datetime


def seed_posts():
    post1 = Post(user_id=1, post_image="https://myphotonestbucket.s3.amazonaws.com/00d65e0dde374b26924d098d5560432b.png",
                 caption="\"Hold on your youthful enthusiams. You'll be able to use them better when you're older.\" - Seneca", created_at=datetime.now(), updated_at=datetime.now())
    post2 = Post(user_id=4, post_image="https://myphotonestbucket.s3.amazonaws.com/271c343e8a3f4b70a7e1cece24f05442.png",
                 caption="Time to get away from the city again.", created_at=datetime.now(), updated_at=datetime.now())
    post3 = Post(user_id=1, post_image="https://myphotonestbucket.s3.amazonaws.com/454b3d4874064c3d89f1345ccc99c816.png",
                 caption="When it's just you. :)", created_at=datetime.now(), updated_at=datetime.now())

    posts = [post1, post2, post3]

    for post in posts:
        db.session.add(post)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
