"""init

Revision ID: 39ada159faf2
Revises: 
Create Date: 2022-07-16 11:23:25.488547

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '39ada159faf2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('hashed_password', sa.String(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_table('recipes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=256), nullable=False),
    sa.Column('url', sa.String(length=256), nullable=True),
    sa.Column('image_url', sa.String(length=256), nullable=True),
    sa.Column('mealdb_id', sa.String(length=256), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_recipes_id'), 'recipes', ['id'], unique=False)
    op.create_index(op.f('ix_recipes_url'), 'recipes', ['url'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_recipes_url'), table_name='recipes')
    op.drop_index(op.f('ix_recipes_id'), table_name='recipes')
    op.drop_table('recipes')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    # ### end Alembic commands ###