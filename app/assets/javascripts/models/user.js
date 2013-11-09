PollCheetah.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  logInUser: function() {
    $.ajax({
      url: "devise/sessions",
      method: "POST",
      success: function(data) {
        PollCheetah.currentUser = new PollCheetah.Models.User(data);
      },
      error: function(err) {

      }
    });
  },

  logOutUser: function() {
    $.ajax({
      url: "devise/sessions",
      method: "DELETE",
      success: function() {
        PollCheetah.currentUser = new PollCheetah.Models.User();
        Backbone.history.navigate('/')
      },
      error: function(err) {

      }
    });
  }
});