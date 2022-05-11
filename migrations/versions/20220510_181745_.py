"""empty message

Revision ID: 9bd87415ab69
Revises: ffdc0a98111c
Create Date: 2022-05-10 18:17:45.832802

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9bd87415ab69'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('posts',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('post_image', sa.String(), nullable=False),
                    sa.Column('caption', sa.String(length=200), nullable=True),
                    sa.Column('created_at', sa.Date(), nullable=False),
                    sa.Column('updated_at', sa.Date(), nullable=False),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('posts')
    # ### end Alembic commands ###