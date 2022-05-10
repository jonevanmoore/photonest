from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Doug', last_name='Demodome', username='DougDemodome', bio='Owner of the Dimmsdale Dimmadome!', profile_image='/default_pi.png', email='demo@aa.io', password='password')
    marnie = User(
        first_name='marnie', last_name='cuddles', username='marniecuddles', bio='', profile_image='/default_pi.png', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='bobbie', last_name='young', username='bobbieyoung', bio='Bobbie was here', profile_image='/default_pi.png', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
