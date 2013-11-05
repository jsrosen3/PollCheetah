PollCheetah.Views.PollEdit = Backbone.View.extend({
  template: JST["polls/edit"],

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