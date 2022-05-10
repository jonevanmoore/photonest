from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Doug', last_name='Demodome', username='dougdemodome', bio='My name is Doug Dimmadome! Owner of the Dimmsdale Dimmadome. Thats right, Doug Dimmadome! Billionare, real-estate tycoon, and de-stroyer of cherished childhood dreams! Like yours!', profile_image='default_pi.png', email='demo@aa.io', password='password')
    marnie = User(
        first_name='marnie', last_name='kate', username='marnie_aa', bio='Hi there :)', profile_image='default_pi.png', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='bobbie', last_name='Bouchay', username='bobbie_aa', bio='Bobbie was here', profile_image='default_pi.png', email='bobbie@aa.io', password='password')
    andres = User(
        first_name='Andres', last_name='Miotnik', username='andres_aa', bio='Oregon, hiking, reading!', profile_image='default_pi.png', email='andres@aa.io', password='password')
    caroline = User(
        first_name='Caroline', last_name='Gonzalez', username='caroline_aa', bio='', profile_image='default_pi.png', email='caroline@aa.io', password='password')

    db.session.add_all([demo, marnie, bobbie, andres, caroline])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
