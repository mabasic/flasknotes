var jade_blog = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row-fluid"><div class="well span3"><h4>Day 1</h4><blockquote><p> <ul><li>Created application structure</li></ul></p><small>Author: <cite title="Mario Bašić">Mario Bašić</cite>, 27.11.2012</small></blockquote></div><div class="well span3"><h4>Day 2</h4><blockquote><p><ul><li>Used Bootstrap to define the application design. </li><li>Reordered python files to improve import organization.</li><li>Defined application functionality</li></ul></p><small>Author: <cite title="Mario Bašić">Mario Bašić</cite>, 28.11.2012</small></blockquote></div><div class="well span3"><h4>Day 3</h4><blockquote><p><ul><li>Using backbone.js created log in / log out bar</li><li>Created server api for handling session </li><li>Dropped marionette.js because it lacks documentation</li></ul></p><small>Author: <cite title="Mario Bašić">Mario Bašić</cite>, 29.11.2012</small></blockquote></div><div class="well span3"><h4>Day 4</h4><blockquote><p><ul><li>Created a backbone router to handle navigation</li><li>Created a view for showing blog posts :)</li><li>Created a view for showing registration form</li><li>Updated site with icons</li><li>Using sessionStorage for handling sessions</li><li>Users can now register; need to implement md5</li></ul></p><small>Author: <cite title="Mario Bašić">Mario Bašić</cite>, 30.11.2012</small></blockquote></div></div><!-- div.row-fluid<div class="well span3"><h4>Day 4</h4><blockquote><p><ul><li>Created a backbone router to handle navigation</li><li>Created a view for showing blog posts :)</li></ul></p><small>Author: <cite title="Mario Bašić">Mario Bašić</cite>, 30.11.2012</small></blockquote></div><div class="well span3"><h4>Day 4</h4><blockquote><p><ul><li>Created a backbone router to handle navigation</li><li>Created a view for showing blog posts :)</li></ul></p><small>Author: <cite title="Mario Bašić">Mario Bašić</cite>, 30.11.2012</small></blockquote></div>-->');
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
var jade_register = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<form class="form-horizontal"><div id="formUsername" class="control-group info"><label for="reg_username" class="control-label">Username</label><div class="controls"><input type="text" name="reg_username" placeholder="Username"/><span id="helpUsername" class="help-inline">Username must be minimum 6 characters long.</span></div></div><div class="control-group"><label for="reg_password" class="control-label">Password</label><div class="controls"><input type="password" name="reg_password" placeholder="Password"/></div></div><div class="control-group"><div class="controls"><button type="button" class="btn btn-primary register"><i class="icon-user icon-white"></i> Register</button></div></div></form>');
}
return buf.join("");
}
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
