"""initial tables

Revision ID: 5dedbb49aec4
Revises: 
Create Date: 2026-06-16 17:15:10.533690
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '5dedbb49aec4'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass  # users and posts tables already exist


def downgrade() -> None:
    op.drop_table('posts')
    op.drop_table('users')
