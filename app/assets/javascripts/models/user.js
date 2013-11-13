PollCheetah.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  logInUser: function(credentials, successCallback, errorCallback) {
    $.ajax({
      url: "/session",
      method: "POST",
      data: credentials,
      success: successCallback,
      error: errorCallback
    });
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
  }

  // validation: {
  //   email: {
  //     required: true,
  //     pattern: 'email',
  //     msg: 'Please enter a valid email address.'
  //   }
  // }
});