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

// MODELS

var NoteModel = Backbone.Model.extend({
	urlRoot: "api/note",
	defaults: {
		title: "",
		text: "",
	},
});

var NotesCollection = Backbone.Collection.extend({
	url: "api/notes",
	model: NoteModel
});

// VIEWS

//this shows home page from template
var RegisterView = Backbone.View.extend({
	template: jade_register,
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
	initialize: function(){

		this.render();

	},
	render: function(){

		//render template and pass
		this.$el.html(this.template({
			//variables
			name : "David"
		}));

	},
});

//this shows blog posts from template
var BlogView = Backbone.View.extend({
	template: jade_blog,
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
		approuter.navigate("", {trigger: true, replace: true});

		this.render();

	},
});

//this is a view attached to #userbar
//handles log in and log out, session
var SidebarView = Backbone.View.extend({
	template: jade_sidebar,
	el: $("#sidebar"),
	initialize: function() {

		this.render();

	},
	render: function() {

		//pass variables to jade template
		this.$el.html(this.template({
			//session_active : sessionStorage.active
			//session_username : session.user.get("username")
		}));

	},
});

//this is a view attached to #userbar
//handles log in and log out, session
var EditNoteView = Backbone.View.extend({
	template: jade_note_edit,
	initialize: function(options) {
		_.bindAll(this, 'render'); //must-have in order for .this to work
		//this.note_id = options.id;

		this.note = notes_collection.get(options.note_id);
		//alert(options.note_id);
		//alert(this.note.get("text"));
		//prilikom promjene podataka
		//this.note.on("change", this.render);
		approuter.navigate("#/notes/edit", {trigger: true, replace: true});
		this.render();

	},
	events: {
		//detect when the log in button is clicked
		"click button.update" : "update_note"
	},
	update_note: function() {
		
		var upd_title = $("#note_title").val();
		var upd_text = $("#note_text").val();
		//$("#userbar input[name=username]").val();

		this.note.set({
			"title" : upd_title,
			"text" : upd_text
		});

		this.note.save({
			success: function() {
				approuter.navigate("#/notes", {trigger: true, replace: true});
			},
			error: function() {

			},
		});

		approuter.navigate("#/notes", {trigger: true, replace: true});
		
	},
	render: function() {

		//pass variables to jade template
		this.$el.html(this.template({
			//session_active : sessionStorage.active
			//session_username : session.user.get("username")
			note : this.note.toJSON()
		}));

	},
});

//this shows blog posts from template
var NoteView = Backbone.View.extend({
	template: jade_note,
	initialize: function(){
		_.bindAll(this, 'render'); //must-have in order for .this to work

		//this.notes = new NotesCollection();
		notes_collection.fetch();

		/*this.notes.fetch({
			success: function() {

			},
			error: function() {

			},
		});*/

		this.sidebarview = new SidebarView;

		//prilikom ucitavanja pocetnog stanja
		
		//this.notes.on("reset", this.render);
		notes_collection.on("reset", this.render);

		//prilikom promjene podataka
		//this.notes.on("change", this.render);
		//prilikom brisanja podataka
		//this.notes.on("remove", this.render);
		//prilikom dodavanja podataka
		//this.notes.on("add", this.render);

		//this.render();
	},
	events: {
		//detect when the log in button is clicked
		"click button.edit_note" : "edit",
		//detect when the log out button is clicked
		"click button.delete_note" : "delete"
	},
	delete: function(e){
		//var id = $("#content button.edit_delete").attr("note-id");
		var clickedEl = $(e.currentTarget);
  		var id = clickedEl.attr("note-id");
		alert(id); //id of the clicked note
	},
	edit: function(e){
		var clickedEl = $(e.currentTarget);
  		var id = clickedEl.attr("note-id");
		//alert(id); //id of the clicked note

		var editnewnote = new EditNoteView({ note_id: id});
    	approuter.loadNewView(editnewnote);

	},
	render: function(){

		//render template and pass
		$(this.el).html(this.template({
			//variables
			//notes: this.notes.toJSON()
			notes: notes_collection.toJSON()
		}));

	},
	close: function() {
      	//alert("haha");
      	//this.sidebarview.undelegateEvents();
      	this.sidebarview.$el.html("");
        //this.sidebarview.remove();
    }
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
            "note/new" : "new_note",
            "note/edit" : "edit_note",
        },
        new_note: function(){
        	//alert("haha");
        	//EditNoteView

			//create new view
        	var editnewnote = new EditNoteView;
        	this.loadNewView(editnewnote);
        },
        register: function(){
        	//remove current active element
        	$("#navbar li.active").removeClass("active");

        	//set active class on menu item register
        	$("#navbar li:eq(2)").addClass("active");

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
        view_all_notes: function(){

        	if (sessionStorage.active){
				//remove current active element
	        	$("#navbar li.active").removeClass("active");

	        	//set active class on menu item about
	        	$("#navbar li:eq(1)").addClass("active");

	        	//create and render blogview
	        	var noteview = new NoteView;
	        	this.loadNewView(noteview);
			}
			else {
				alert("You must sign in to see notes.");
				approuter.navigate("", {trigger: true, replace: true});
			}
        	
        },

        _unsetView: function(view){
           if (view){
           		try{
           			//try to close depending views attached
           			view.close();
           		}
           		catch(err){
           			//alert("error");
           		}
               	view.undelegateEvents();
               	view.remove();
           }
       },

       loadNewView: function(newView){
           this._unsetView(this.currentView);
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
    approuter = new AppRouter;

    //Views

    //Models & Collections
    // contains all user notes
    notes_collection = new NotesCollection();

	// Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();

});