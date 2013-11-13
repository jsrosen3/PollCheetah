PollCheetah.Views.UserNew = Backbone.View.extend({
  template: JST["users/new"],

  events: {
    "click #submitForm": "submitForm"
  },

  render: function() {
    var renderedContent = this.template({

    });

    this.$el.html(renderedContent);
    return this;
  },

  submitForm: function(event) {
    event.preventDefault();

    var payload = $(".form-signin").serializeJSON();
    var user = new PollCheetah.Models.User(payload.user);

    // if (!poll.isValid()) {
    //   poll.validationError.forEach(function(err) {
    //     this.$("form").prepend(
    //       "<div>" + err + "</div>"
    //     );
    //   });
    //   return;
    // } 

    user.save(null, {
      success: function() {
        PollCheetah.currentUser = user;
        PollCheetah.router.reloadHeader();
        Backbone.history.navigate("/users/" + user.id, { trigger: true });
      },

      error: function() {
        alert("Error signing you up :-(");
      }
    });


  }

});