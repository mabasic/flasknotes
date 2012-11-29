// MODELS

var UserModel = Backbone.Model.extend({
	urlRoot: "api/user",
	defaults: {
		username: "",
		password: "",
	},
});

// SESSION

//singleton function for manipulating session data
var session = new function() {

	//session state; logged in / logged out; true / false
	this.active = false;

	// info about the user of this session
	this.user = new UserModel();

	//override for losing this inside callbacks
	var that = this;

	//function for logging in the user
	//receive username and password
	this.login = function(username, password) {
		//send ajax request to server
		// at api/session POST
		//encrypt password using md5
		//send username and password in JSON format
		//server returns 200 or error with error data in json
		//server return user id if 200
		$.ajax({
           type: "POST", //create new session
           url: "/api/session",
           async: false,
           data: JSON.stringify({
               "username": username,
               //"password": hex_md5(password)
               "password": password
           }),
           contentType: "application/json",
           dataType: "json",

           success: function(data) {

               //store id in that.user
               that.user.id = data.id;
               //fetch user data to that.user
               that.user.fetch({
               		success: function(data){
               			//test
               		},
               });
               //activate the session on client side
               that.active = true;

           },
           error: function(){

               alert("User not found!");

           },
       });
	};

	//function for logging out the user
	this.logout = function() {
		//send ajax request to server
		//at api/session GET
		//server returns 200 or error with error data in json format
		$.ajax({
           type: "DELETE", //delete existing session
           url: "/api/session",
           async: false,

           success: function(data) {

               //alert("dada-logout");
               that.active = false;

           },
           error: function(){

               //alert("nene-logout");

           },
       });
	};

	//function for checking if the session is active
	this.isActive = function() {
		//send ajax request to the server
		//at api/session
		//server returns 200 or error with error data in json format
		$.ajax({
           type: "GET",
           url: "/api/session",
           async: false,

           success: function(data) {

               //alert("dada-is active");
               that.active = true;

           },
           error: function(){

               //alert("nene-is active");
               that.active = false

           },
       });
	};

}

// VIEWS

//this is a view attached to #userbar
//handles log in and log out, session
var UserbarView = Backbone.View.extend({
	template: jade_userbar,
	el: $("#userbar"),

	initialize: function() {

		session.isActive();

		this.render();

	},
	render: function() {

		//pass variables to jade template
		this.$el.html(this.template({
			session_active : session.active,
			session_username : session.username
		}));

	},
	events: {
		//detect when the log in button is clicked
		"click button.login" : "login",
		//detect when the log out button is clicked
		"click button.logout" : "logout"
	},
	login: function(event){

		var username = $("#userbar input[name=username]").val();
		var password = $("#userbar input[name=password]").val();

		//try to log in / create session
		session.login(username,password);

		//render view (userbar)
		this.render()

	},
	logout: function(event){
		//alert(session.user.id);
		//alert(session.active);

		session.logout();

		this.render();

	},
});

// APP START

//wait until document is ready
$(function(){	

	//run view for userbar
	var userbarview = new UserbarView;

});