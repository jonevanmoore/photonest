from .db import db


class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    followed_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)

    follower = db.relationship('User', foreign_keys=[
                               follower_id], back_populates='followers')
    followed = db.relationship('User', foreign_keys=[
                               followed_id], back_populates='following')

    def to_dict(self):
        return {
            'id': self.id,
            'follower_id': self.follower_id,
            'followed_id': self.followed_id,
            'follower_username': self.follower.username,
            'followed_username': self.followed.username
        }
