# Imports for flask
from flask import request, session, g, redirect, url_for, abort, render_template, flash, json, Response

# App based imports; order important
from flasknotes import app, db_session
# Import all models
from flasknotes.models import *

# Default route
@app.route("/")
def starting_point():
	# Returns full html file
	return render_template("layout.html")