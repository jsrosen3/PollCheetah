PollCheetah.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  logInUser: function(credentials, successCallback, errorCallback) {
    $.ajax({
      url: "/session",
      method: "POST",
      data: credentials,
      success: successCallback,
      error: errorCallback
    })
  },

  logInAsGuest: function() {
    $.ajax({
      url: "/create_guest",
      method: "POST",
      success: function (data) {
        PollCheetah.currentUser = new PollCheetah.Models.User(data)
        PollCheetah.currentUserPolls = $('#user-stuff').data('user-content');
        PollCheetah.router.reloadHeader();
        Backbone.history.navigate('#/users/' + PollCheetah.currentUser.id)
      },
      error: function (err){

      }
    })
  },

  logOutUser: function() {
    $.ajax({
      url: "/session",
      method: "DELETE",
      success: function() {
        PollCheetah.currentUser = new PollCheetah.Models.User();
        PollCheetah.router.reloadHeader();
        Backbone.history.navigate("", { trigger: true })
      },
      error: function(err) {

      }
    });
  },

  validate: function(attrs, options) {
    var validationError = []
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!attrs.email) {
      validationError.push("Please enter your email address.");
    } else if (!re.test(attrs.email)) {
      validationError.push("Please enter a valid email address.");
    }
    if (!attrs.password) {
      validationError.push("Please enter a password.");
    } else if (attrs.password.length < 6) {
      validationError.push("Your password must be at least 6 characters");
    }
    if (validationError.length === 0) {return;} else {return validationError;}
  }
});