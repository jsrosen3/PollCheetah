PollCheetah.Views.UserEdit = Backbone.View.extend({
  template: JST["users/edit"],

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