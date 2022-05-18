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
            'follower_profile_pic': self.follower.profile_image,
            'followed_profile_pic': self.followed.profile_image,
            'follower_username': self.follower.username,
            'followed_username': self.followed.username,
            'follower_firstname': self.follower.first_name,
            'followed_firstname': self.followed.first_name,
            'follower_lastname': self.follower.last_name,
            'followed_lastname': self.followed.last_name
        }
