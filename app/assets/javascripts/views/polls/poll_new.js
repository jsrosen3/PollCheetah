PollCheetah.Views.PollNew = Backbone.View.extend({
  template: JST["polls/new"],

  events: {
    "submit form": "submitForm"
  },

  render: function() {
    var renderedContent = this.template({

    });

    this.$el.html(renderedContent);
    return this;
  },

  submitForm: function(event) {
    event.preventDefault();

  }

});