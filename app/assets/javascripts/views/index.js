PollCheetah.Views.Index = Backbone.View.extend({
  template: JST["index"],

  events: {

  },

  render: function() {
    var renderedContent = this.template({

    });

    this.$el.html(renderedContent);
    return this;
  }
});