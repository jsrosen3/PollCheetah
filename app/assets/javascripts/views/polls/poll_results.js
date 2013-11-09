PollCheetah.Views.PollResults = Backbone.View.extend({
  template: JST["polls/results"],

  initialize: function() {
    var pollResults = this;
    pollResults.listenTo(pollResults.model, 'change', pollResults.render.bind(pollResults));
    pollResults.model.refreshResults();
  },

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