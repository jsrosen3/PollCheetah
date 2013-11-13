PollCheetah.Views.Header = Backbone.View.extend({
  template: JST['header'],

  events: {
    "click #logOut"       : "logOut",
    "click #logIn"        : "logIn",
    "click #logInAsGuest" : "logInAsGuest"
  },

  // myAccount: function(event) {
  //   event.preventDefault();
  //   Backbone.history.navigate('/users/' + PollCheetah.currentUser.id)
  // },

  logOut: function(event) {
    event.preventDefault();
    PollCheetah.currentUser.logOutUser();
  },

  logIn: function(event) {
    event.preventDefault();
    var credentials = $("#logMeIn").serializeJSON().user;
    var successCallback = function(data) {
      PollCheetah.currentUser = new PollCheetah.Models.User(data)
      PollCheetah.currentUserPolls = $('#user-stuff').data('user-content');
      PollCheetah.router.reloadHeader();
      Backbone.history.navigate('#/users/' + PollCheetah.currentUser.id)
    };
    var errorCallback = function(err) {

    };

    PollCheetah.currentUser.logInUser(credentials, successCallback, errorCallback)
  },

  logInAsGuest: function(event) {
    event.preventDefault();
    PollCheetah.currentUser.logInAsGuest();
  },

  render: function() {
    var renderedContent = this.template({

    });

    this.$el.html(renderedContent);
    return this;
  }
});

   