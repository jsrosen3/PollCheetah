PollCheetah.Views.UserPolls = Backbone.View.extend({
  template: JST["users/polls"],

  events: {

  },

  render: function() {
    var renderedContent = this.template({
      user: this.model,
      polls: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  }

});