PollCheetah.Views.UserNew = Backbone.View.extend({
  template: JST["users/new"],

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