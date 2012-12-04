// SESSION STORAGE

//If there is active session, sync it with server
if (sessionStorage.active){
	syncSession();
}

function syncSession(){
	//send ajax request to the server
	//at api/session
	//server returns 200 or error with error data in json format
	$.ajax({
       type: "GET",
       url: "/api/session",
       async: false,
       success: function(data) {
       		
       		sessionStorage.username = data.username;
       		sessionStorage.id = data.id;
       		sessionStorage.active = true;

           $(".navbar-text.pull-right").html("Logged in as " + sessionStorage.username + " (" + sessionStorage.id + ") ");
       },
       error: function(){

       },
   });
}

function login(username, password){
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
           "password": password // hex_md5(password)
       }),
       contentType: "application/json",
       dataType: "json",
       success: function(data) {

           syncSession();

       },
       error: function(){

           alert("User not found!");

       },
   });
}

function logout(){
	//send ajax request to server
	//at api/session GET
	//server returns 200 or error with error data in json format
	$.ajax({
       type: "DELETE", //delete existing session
       url: "/api/session",
       async: false,

       success: function(data) {

           sessionStorage.clear();
           $(".navbar-text.pull-right").html("");

       },
   });
}

// VIEWS

//this shows home page from template
var RegisterView = Backbone.View.extend({
	template: jade_register,
	//el: $("#content"),
	initialize: function(){

		this.render();

	},
	render: function(){

		//render template and pass
		this.$el.html(this.template({
			//variables
		}));

	},
	events: {
		//check username and then register
		"click button.register" : "register",
		//only check username
		"change input[name=reg_username]" : "check_username"
	},
	register: function() {

		var username = $("input[name=reg_username]").val();
		var password = $("input[name=reg_password]").val();
		alert(username + "," + password);

		//contact api for creating new user ?
		$.ajax({
	       type: "POST", //create new user
	       url: "/api/user",
	       async: false,
	       data: JSON.stringify({
	           "username": username,
	           "password": password // hex_md5(password)
	       }),
	       contentType: "application/json",
	       dataType: "json",
	       success: function(data) {

	           alert("Registration successful!");

	       },
	       error: function(){

	           alert("Something went wrong!");

	       },
	   });

	},
	check_username: function(){

		var username = $("input[name=reg_username]").val();
		
		if(username.length >= 6){
			//send username to server
			//if taken throw error
			//else show good username //success
			$.ajax({
	           type: "POST",
	           url: "/api/user/check/username",
	           async: false,
	           data: JSON.stringify({
	               "username": username
	           }),
	           contentType: "application/json",
	           dataType: "json",

	           success: function(data) {

	               	//alert("username je slobodan");

	               	$("#formUsername").removeClass("error");
	               	$("#formUsername").removeClass("info");
	               	$("#formUsername").addClass("success");
					$("#helpUsername").html("Username is free.");

	           },
	           error: function(){

	           		//alert("username je zauzet");
	               	
	               	$("#formUsername").removeClass("success");
	               	$("#formUsername").removeClass("info");
	               	$("#formUsername").addClass("error");
					$("#helpUsername").html("Username is taken.");

	           },
	       });
		}
		else {

			$("#formUsername").removeClass("error");
			$("#formUsername").removeClass("success");
			$("#formUsername").addClass("info");
			$("#helpUsername").html("Username must be minimum 6 characters long.");

		}

	},
});

//this shows home page from template
var HomeView = Backbone.View.extend({
	template: jade_home,
	//el: $("#content"),
	initialize: function(){

		this.render();

	},
	render: function(){

		//render template and pass
		this.$el.html(this.template({
			//variables
		}));

	},
});

//this shows blog posts from template
var BlogView = Backbone.View.extend({
	template: jade_blog,
	//el: $("#content"),
	initialize: function(){

		this.render();

	},
	render: function(){

		//render template and pass
		this.$el.html(this.template({
			//variables
		}));

	},
});

//this is a view attached to #userbar
//handles log in and log out, session
var UserbarView = Backbone.View.extend({
	template: jade_userbar,
	el: $("#userbar"),

	initialize: function() {

		this.render();

	},
	render: function() {

		//pass variables to jade template
		this.$el.html(this.template({
			session_active : sessionStorage.active
			//session_username : session.user.get("username")
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
		login(username,password);

		//render view (userbar)
		this.render()

	},
	logout: function(event){
		//alert(session.user.id);
		//alert(session.active);

		logout();

		this.render();

	},
});

// ROUTERS

var AppRouter = Backbone.Router.extend({
		currentView: null,
		el: $("#content"),
        routes: {
            "register" : "register", // matches #/register
            "notes" : "view_all_notes",
            "blog" : "blog",
            "about" : "about",
            "" : "home",
        },
        register: function(){
        	//remove current active element
        	$("#navbar li.active").removeClass("active");

        	//set active class on menu item register
        	$("#navbar li:eq(2)").addClass("active");

        	//create and render blogview
        	/*try {
        		//try to remove loaded view
				//registerview.undelegateEvents();
				registerview.remove();
				registerview.unbind();
				//click on register button triggers X events
				//depending on times view is started
				//memory build up //TO DO
				
			}
			catch(err) {
			  	//Handle errors here
			  	console.log(err);
			}*/

			//create new view
        	var registerview = new RegisterView;
        	this.loadNewView(registerview);
        },
        home: function(){
        	//remove current active element
        	$("#navbar li.active").removeClass("active");

        	//set active class on menu item home
        	$("#navbar li:eq(0)").addClass("active");

        	//create and render blogview
        	var homeview = new HomeView;
        	this.loadNewView(homeview);
        },
        about: function(){
        	//remove current active element
        	$("#navbar li.active").removeClass("active");

        	//set active class on menu item about
        	$("#navbar li:eq(4)").addClass("active");
        },
        blog: function(){
        	//remove current active element
        	$("#navbar li.active").removeClass("active");

        	//set active class on menu item about
        	$("#navbar li:eq(3)").addClass("active");

        	//create and render blogview
        	var blogview = new BlogView;
        	this.loadNewView(blogview);
        },

        _unsetView: function(view){
           if (view){
               view.undelegateEvents();
               view.remove();
           }
       },

       loadNewView: function(newView){
           this._unsetView(this.currentView);

           /*if (User.isLoggedIn() == false && newView.isLogginView == undefined){
               // Login redirect (ALR)
               User.checkLoggedIn(Backbone.history.fragment);
               AppRouter.navigate("#/login", {trigger: true, replace: true});
               return;
           }*/

           this.currentView = newView;
           this.el.empty().html(newView.el); // pitati
           //document.documentElement.scrollTop = 0; // pitati
       },

    });

// APP START

//wait until document is ready
$(function(){	

	//run view for userbar
	var userbarview = new UserbarView;

	// Instantiate the router
    var approuter = new AppRouter;

	// Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();

});