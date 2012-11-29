var jade_userbar = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
if ( session_active == false)
{
buf.push('<input type="text" placeholder="Username" style="margin-right: 4px" name="username" class="span2"/><input type="password" placeholder="Password" style="margin-right: 4px" name="password" class="span2"/><button type="button" class="btn login"><i class="icon-user"></i>Log in</button>');
}
else
{
buf.push('<button type="button" class="btn logout"><i class="icon-user"> </i>Log out</button>');
}
}
return buf.join("");
}
