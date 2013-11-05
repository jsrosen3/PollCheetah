PollCheetah.Views.UserPolls = Backbone.View.extend({
  template: JST["users/polls"],

  events: {

  },

  render: function() {
    var renderedContent = this.template({

    });

    this.$el.html(renderedContent);
    return this;
  }

});