PollCheetah.Views.Header = Backbone.View.extend({
  template: JST['header'],

  events: {
    "click .myAccount"    : "myAccount",
    "click .logOut"       : "logOut",
    "click .signUp"       : "signUp",
    "click .logIn"        : "logIn",
    "click .logInAsGuest" : "logInAsGuest"
  },

  myAccount: function(event) {
    event.preventDefault();
    Backbone.history.navigate('/users/' + PollCheetah.currentUser.id)
  },

  logOut: function(event) {
    event.preventDefault();
    PollCheetah.currentUser.logOut();
  },

  signUp: function(event) {
    event.preventDefault();
    Backbone.history.navigate('/sign_up')
  },

  logIn: function(event) {
    event.preventDefault();
    Backbone.history.navigate('/log_in')
  },

  logInAsGuest: function(event) {
    event.preventDefault();

  },

  render: function() {
    var renderedContent = this.template({
      user: PollCheetah.currentUser
    });

    this.$el.html(renderedContent);
    return this;
  }

});