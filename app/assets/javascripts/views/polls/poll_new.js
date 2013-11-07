PollCheetah.Views.PollNew = Backbone.View.extend({
  template: JST["polls/new"],

  events: {

    "click addAnotherQuestion"
    "click addAnotherAnswer"

    "submit form": "submitForm"
  },

  render: function() {
    var renderedContent = this.template({
      poll: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

  addAnotherQuestion: function(event) {


  },

  addAnotherAnswer: function(event) {


  },

  submitForm: function(event) {
    event.preventDefault();

  }
});