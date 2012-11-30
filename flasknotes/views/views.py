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

# Session routes
@app.route("/api/session", methods=["POST"])
def create_session():
	# provjera username i password
    # ako je korisnik proden onda se kreira sesija
    # na serveru i salje se potvrda klijentu za js

    # uhvati podatke iz jsona
    userJSON = json.loads(request.data)

    # pronadi korisnika po username i password
    user = db_session.query(User).filter_by(username=userJSON["username"], password=userJSON["password"]).first()

    if user == None:
        js = json.dumps({ "error":"authentification" , "message":"failed" })
        resp = Response(js , status=406, mimetype="application/json")
    else:
        session['active'] = True
        session["idUser"] = user.idUser
        session["username"] = user.username
        js = json.dumps({ "error":"none" , "message":"ok" })
        resp = Response(js , status=200, mimetype="application/json")
    
    return resp 

@app.route('/api/session', methods=["DELETE"])
def delete_session():
    #session.pop('logged_in', None)
    #session.pop('idUser', None)
    #session.pop('username', None)
    session.clear()
    #flash('You were logged out')

    js = json.dumps({ "error":"none" , "message":"ok" })
    resp = Response(js , status=200, mimetype="application/json")
    
    return resp

@app.route('/api/session', methods=['GET'])
def sync_session():

    if session.get('active'):
        js = json.dumps({ 
            "id":session.get("idUser"),
            "username":session.get("username") 
             })
        resp = Response(js , status=200, mimetype="application/json")
    
    else:
        js = json.dumps({ "error":"session" , "message":"inactive" })
        resp = Response(js , status=406, mimetype="application/json")

    return resp 

# Model - UserModel
@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = db_session.query(User).filter_by(idUser = user_id).first()
    
    js = json.dumps(user.toJSON())
    resp = Response(js, status=200, mimetype="application/json")
    return resp

# Model - UserModel
@app.route('/api/user', methods=['POST'])
def add_user():
    
    #zapisi u bazu novog korisnika
    userJSON = json.loads(request.data)

    user = User(userJSON["username"],userJSON["password"])

    db_session.add(user)
    db_session.commit()

    js = json.dumps({ "error":"none" , "message":"ok" })
    resp = Response(js , status=200, mimetype="application/json")
    return resp

# Check if a user with received username exists
@app.route("/api/user/check/username", methods=["POST"])
def check_username():
    username = json.loads(request.data)["username"]

    print username
    # run tests on username to see if it is taken or free
    user = db_session.query(User).filter_by(username=username).first()

    #if there is no user with that username, return good
    if user == None:
        js = json.dumps({ "error":"none" , "message":"ok" })
        resp = Response(js , status=200, mimetype="application/json")
    else:
        js = json.dumps({ "error":"username taken" , "message":"failed" })
        resp = Response(js , status=406, mimetype="application/json")
    return resp