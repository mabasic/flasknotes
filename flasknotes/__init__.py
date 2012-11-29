# Imports for flask
from flask import Flask

# Import for database (sqlite)
import sqlite3

# Imports for SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import  sessionmaker

# Configuration
# app.config['DEBUG']
# Depending on this variable, configure error reporting and debugging
DEBUG = False
# Location and type of database
ENGINE_URL = 'sqlite:///D:/MB/GProjects/FlaskNotes/tmp/flasknotes.db'
# Database (engine) reporting
ENGINE_REP = False
# Load sample data
LOAD_SAMPLES = False
# Create/update all tables
CREATE_TABLES = False
# Neccessary for using sessions
SECRET_KEY = "supersafesecretkey"

# Create app instance
app = Flask(__name__)

# load app config
# looks for all variables with all capital letters in name
app.config.from_object(__name__)

# Create database engine and turn on or off reporting
Engine = create_engine(app.config["ENGINE_URL"], echo=app.config["ENGINE_REP"])
# Bind session to engine
Session = sessionmaker(bind=Engine)
# Create session instance
db_session = Session()
# Set database to use declarative base
Base = declarative_base()

# Import all views
# Import views after db creation
from views import *
# Neccessary for running application

# -- OPTIONAL --

# Run tests in debug mode
if app.config["DEBUG"] == True:

	# Import all models
	# Models are imported for loading sample data
	from models import *

	#users = db_session.query(User).all()
	#print users

	#notes = db_session.query(Note).all()
	#print notes

# If there are changes to the models, set to True in config
if app.config["CREATE_TABLES"] == True:

	# Create all tables based on defined models
	# If they exist; skip
	Base.metadata.create_all(Engine)
	
# Load sample data into database
if app.config["LOAD_SAMPLES"] == True:

	# Load 3 users: admin, root, user
	admin = User("admin","admin")
	root = User("root","root")
	user = User("user","user")

	db_session.add(admin)
	db_session.add(root)
	db_session.add(user)

	# Load 3 notes: admin:2, root:1, user:0
	admin_note_1 = Note("admin title 1","admin text 1", admin.idUser)
	admin_note_2 = Note("admin title 2","admin text 2", admin.idUser)
	root_note_1 = Note("root title 1","root text 1", root.idUser)

	db_session.add(admin_note_1)
	db_session.add(admin_note_2)
	db_session.add(root_note_1)

	# Commit sample data to database
	db_session.commit()