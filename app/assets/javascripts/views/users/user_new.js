PollCheetah.Views.UserNew = Backbone.View.extend({
  template: JST["users/new"],

  events: {
    "click #submitForm": "submitForm",
    "click #logInAsGuest": "logInAsGuest"
  },

  render: function() {
    var renderedContent = this.template({

    });

    this.$el.html(renderedContent);
    return this;
  },

  logInAsGuest: function(event) {
    event.preventDefault();
    PollCheetah.currentUser.logInAsGuest();
  },

  submitForm: function(event) {
    event.preventDefault();

    var payload = $(".form-signin").serializeJSON();
    var user = new PollCheetah.Models.User(payload.user);
    var that = this;

    if (!user.isValid()) {
      that.$("#errors").html("");
      user.validationError.forEach(function(err) {
        that.$("#errors").prepend(
          '<p style="color:#FF0000;">' + err + "</p>"
        );
      });

      $('#signUp')[0].reset();

      return;
    } 

    user.save(null, {
      success: function() {
        PollCheetah.currentUser = user;
        PollCheetah.router.reloadHeader();
        Backbone.history.navigate("/users/" + user.id, { trigger: true });
      },

      error: function() {
        that.$("#errors").html("");
        that.$("#errors").prepend(
          '<p style="color:#FF0000;">Sorry, there is already an account with that email address.</p>'
        );

        $('#signUp')[0].reset();
      }
    });
  }
});