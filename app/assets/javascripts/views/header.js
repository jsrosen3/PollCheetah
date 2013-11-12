PollCheetah.Views.Header = Backbone.View.extend({
  template: JST['header'],

  events: {
    "click #logOut"       : "logOut",
    "click .signUp"       : "signUp",
    "click .logIn"        : "logIn",
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

  signUp: function(event) {
    event.preventDefault();
  },

  logIn: function(event) {
    event.preventDefault();
  },

  logInAsGuest: function(event) {
    event.preventDefault();

    PollCheetah.currentUser.logInAsGuest({
      
      success: function () {
        console.log("success!")
        //PollCheetah.router.refreshLayout.bind(PollCheetah.router)()
        
      },

      error: function() {
        console.log("fail")
      }
    });
  },

  render: function() {
    var renderedContent = this.template({

    });

    this.$el.html(renderedContent);
    return this;
  }
});

   