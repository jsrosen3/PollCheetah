PollCheetah.Views.PollResults = Backbone.View.extend({
  template: JST["polls/results"],

  events: {
    
  },

  render: function() {
    var renderedContent = this.template({

    });

    this.$el.html(renderedContent);
    return this;
  }

});