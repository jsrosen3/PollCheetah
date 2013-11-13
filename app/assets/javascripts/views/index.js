PollCheetah.Views.Index = Backbone.View.extend({
  template: JST["index"],

  events: {
    "click #tryItOut": "tryItOut"
  },

  render: function() {
    var renderedContent = this.template({

    });

    this.$el.html(renderedContent);
    return this;
  },

  tryItOut: function() {
    PollCheetah.currentUser.logInAsGuest();
  }
});