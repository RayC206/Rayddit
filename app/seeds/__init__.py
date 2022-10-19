from flask.cli import AppGroup
from .users import seed_users, undo_users
from .post_types import seed_post_types, undo_post_types
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .subreddits import seed_subreddits, undo_subreddits
from .subscriptions import seed_subscriptions, undo_subscriptions
from .votes import seed_votes, undo_votes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_post_types()
    seed_subreddits()
    seed_posts()
    seed_comments()
    seed_subscriptions()
    seed_votes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_votes()
    undo_subscriptions()
    undo_posts()
    undo_comments()
    undo_subreddits()
    undo_post_types()
    undo_users()
    # Add other undo functions here
