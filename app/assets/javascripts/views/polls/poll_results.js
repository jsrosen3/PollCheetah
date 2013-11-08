PollCheetah.Views.PollResults = Backbone.View.extend({
  template: JST["polls/results"],

  events: {
    
  },

  render: function() {
    var renderedContent = this.template({
      poll: this.model
    });

    this.$el.html(renderedContent);
    return this;
  }

});