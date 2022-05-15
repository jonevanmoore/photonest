from app.models import db, Post


def seed_posts():
    post1 = Post(user_id=1, post_image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
                 caption="Waited hours for the perfect shot!", created_at="Thu Aug 05 2021 01:34:51", updated_at="Fri Oct 22 2021 14:35:19")
    post2 = Post(user_id=4, post_image="https://images.all-free-download.com/images/graphiclarge/beauty_of_nature_17_211513.jpg",
                 caption="Time to get away from the city again.", created_at="Thu Aug 05 2021 01:34:51", updated_at="Fri Oct 22 2021 14:35:19")
    post3 = Post(user_id=1, post_image="https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528__340.jpg",
                 caption="When it's just you. :)", created_at="Thu Aug 05 2021 01:34:51", updated_at="Fri Oct 22 2021 14:35:19")

    posts = [post1, post2, post3]

    for post in posts:
        db.session.add(post)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
