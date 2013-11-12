PollCheetah.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  logInUser: function() {
    $.ajax({
      url: "/session",
      method: "POST",
      success: function(data) {
        PollCheetah.currentUser = new PollCheetah.Models.User(data);
      },
      error: function(err) {

      }
    });
  },

  logInAsGuest: function() {
    $.ajax({
      url: "/create_guest",
      method: "POST",
      success: function (data) {
        PollCheetah.currentUser = new PollCheetah.Models.User(data)
        PollCheetah.router.reloadHeader();
        Backbone.history.navigate('#/users/' + PollCheetah.currentUser.id)
      },
      error: function (err){
        console.log("log in fail")
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