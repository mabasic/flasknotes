var FlaskNotes = new Backbone.Marionette.Application();

FlaskNotes.addRegions({
  navbar : '#navbar',
  content   : '#content',
  sidebar : '#sidebar',
  userbar : "#userbar"
});

FlaskNotes.on('initialize:after', function(){
  Backbone.history.start();
});