from flask.cli import AppGroup
from .users import seed_users, undo_users
from .recipes import seed_recipes, undo_recipes
from .notes import seed_notes, undo_notes
from .ratings import seed_ratings, undo_ratings

# from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # undo_users()
        # undo_recipes()
        # undo_notes()
        
    seed_users()
    seed_recipes()
    seed_notes()
    seed_ratings()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_notes()
    undo_recipes()
    undo_users()
    undo_ratings() 
    # Add other undo functions here