var jade_userbar = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
if ( session_active == null )
{
buf.push('<input type="text" placeholder="Username" style="margin-right: 4px" name="username" class="span2"/><input type="password" placeholder="Password" style="margin-right: 4px" name="password" class="span2"/><button type="button" class="btn login"><i class="icon-user"></i> Log in</button>');
}
else
{
buf.push('<button type="button" class="btn logout"><i class="icon-user"> </i> Log out</button>');
}
}
return buf.join("");
}
var jade_home = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="hero-unit"><h1>Welcome to FlaskNotes</h1><p>Log in to view your notes or create new ones.<b>Register</b> to use this application.</p><p><a href="#/register" class="btn btn-primary btn-large">Register</a></p></div>');
}
return buf.join("");
}
var jade_note = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row-fluid">');
// iterate notes
;(function(){
  if ('number' == typeof notes.length) {

  if (notes.length) {
    for (var $index = 0, $$l = notes.length; $index < $$l; $index++) {
      var note = notes[$index];

buf.push('<div class="well span3"><h4>' + escape((interp = note.title) == null ? '' : interp) + '</h4><blockquote><p>' + escape((interp = note.text) == null ? '' : interp) + '</p><small>ID: <cite>' + escape((interp = note.id) == null ? '' : interp) + '</cite></small></blockquote><button');
buf.push(attrs({ 'style':("margin-right:10px;"), 'note-id':("" + (note.id) + ""), "class": ('edit_note') + ' ' + ('btn') }, {"style":true,"note-id":true}));
buf.push('> <i class="icon-pencil"></i> Edit</button><button');
buf.push(attrs({ 'note-id':("" + (note.id) + ""), "class": ('delete_note') + ' ' + ('btn') + ' ' + ('btn-danger') }, {"note-id":true}));
buf.push('><i class="icon-remove icon-white"></i> Delete</button></div>');
    }

  } else {
buf.push('<h4>You have not created any notes. Click on New Note to create one now.</h4>');
  }
  } else {
    var $$l = 0;
    for (var $index in notes) {
      $$l++;      var note = notes[$index];

buf.push('<div class="well span3"><h4>' + escape((interp = note.title) == null ? '' : interp) + '</h4><blockquote><p>' + escape((interp = note.text) == null ? '' : interp) + '</p><small>ID: <cite>' + escape((interp = note.id) == null ? '' : interp) + '</cite></small></blockquote><button');
buf.push(attrs({ 'style':("margin-right:10px;"), 'note-id':("" + (note.id) + ""), "class": ('edit_note') + ' ' + ('btn') }, {"style":true,"note-id":true}));
buf.push('> <i class="icon-pencil"></i> Edit</button><button');
buf.push(attrs({ 'note-id':("" + (note.id) + ""), "class": ('delete_note') + ' ' + ('btn') + ' ' + ('btn-danger') }, {"note-id":true}));
buf.push('><i class="icon-remove icon-white"></i> Delete</button></div>');
    }

    if ($$l === 0) {
buf.push('<h4>You have not created any notes. Click on New Note to create one now.</h4>');
    }
  }
}).call(this);

buf.push('</div>');
}
return buf.join("");
}
var jade_register = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<form class="form-horizontal"><div id="formUsername" class="control-group info"><label for="reg_username" class="control-label">Username</label><div class="controls"><input type="text" name="reg_username" placeholder="Username"/><span id="helpUsername" class="help-inline">Username must be minimum 6 characters long.</span></div></div><div class="control-group"><label for="reg_password" class="control-label">Password</label><div class="controls"><input type="password" name="reg_password" placeholder="Password"/></div></div><div class="control-group"><div class="controls"><button type="button" class="btn btn-primary register"><i class="icon-user icon-white"></i> Register</button></div></div></form>');
}
return buf.join("");
}
var jade_sidebar = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<ul class="nav nav-list"><li class="nav-header">Actions</li><li><a href="#/note/new"><i class="icon-file"></i> New note</a></li></ul>');
}
return buf.join("");
}
var jade_note_edit = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<form class="form-horizontal"><div id="editNote" class="control-group info"><label for="note_title" class="control-label">Title</label><div class="controls"><input');
buf.push(attrs({ 'id':("note_title"), 'type':("text"), 'name':("note_title"), 'value':("" + (note.title) + "") }, {"id":true,"type":true,"name":true,"value":true}));
buf.push('/></div></div><div class="control-group"><label for="note_text" class="control-label">Text</label><div class="controls"><textarea id="note_text" name="note_text">');
var __val__ = note.text
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</textarea></div></div><div class="control-group"><div class="controls"><button');
buf.push(attrs({ 'note-id':("" + (note.id) + ""), 'type':("button"), "class": ('btn') + ' ' + ('btn-primary') + ' ' + ('update') }, {"note-id":true,"type":true}));
buf.push('><i class="icon-file icon-white"></i> Update</button></div></div></form>');
}
return buf.join("");
}
var jade_blog = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row-fluid"><div class="well span3"><h4>Day 1</h4><blockquote><p> <ul><li>Created application structure</li></ul></p><small>Author: <cite title="Mario Bašić">Mario Bašić</cite>, 27.11.2012</small></blockquote></div><div class="well span3"><h4>Day 2</h4><blockquote><p><ul><li>Used Bootstrap to define the application design. </li><li>Reordered python files to improve import organization.</li><li>Defined application functionality</li></ul></p><small>Author: <cite title="Mario Bašić">Mario Bašić</cite>, 28.11.2012</small></blockquote></div><div class="well span3"><h4>Day 3</h4><blockquote><p><ul><li>Using backbone.js created log in / log out bar</li><li>Created server api for handling session </li><li>Dropped marionette.js because it lacks documentation</li></ul></p><small>Author: <cite title="Mario Bašić">Mario Bašić</cite>, 29.11.2012</small></blockquote></div><div class="well span3"><h4>Day 4</h4><blockquote><p><ul><li>Created a backbone router to handle navigation</li><li>Created a view for showing blog posts :)</li><li>Created a view for showing registration form</li><li>Updated site with icons</li><li>Using sessionStorage for handling sessions</li><li>Users can now register; need to implement md5</li></ul></p><small>Author: <cite title="Mario Bašić">Mario Bašić</cite>, 30.11.2012</small></blockquote></div></div><div class="row-fluid"><div class="well span3"><h4>Day 5</h4><blockquote><p><ul><li>Implemented proper use of views and router in backbone.js</li><li>Minor modifications to the project structure and git</li></ul></p><small>Author: <cite title="Mario Bašić">Mario Bašić</cite>, 04.12.2012</small></blockquote></div><div class="well span3"><h4>Day 6</h4><blockquote><p><ul><li>Implemented doT.js templating engine</li><li>Very happy :)</li></ul></p><small>Author: <cite title="Mario Bašić">Mario Bašić</cite>, 10.12.2012</small></blockquote></div><div class="well span3"><h4>Day 7</h4><blockquote><p><ul><li>Removed doT.js templating engine</li><li>Jade is the best!</li><li>Created a new model in database for history tracking</li><li>backbone: model and collection for notes</li><li>backbone: view for notes, read and write</li></ul></p><small>Author: <cite title="Mario Bašić">Mario Bašić</cite>, 14.12.2012</small></blockquote></div></div>');
}
return buf.join("");
}
