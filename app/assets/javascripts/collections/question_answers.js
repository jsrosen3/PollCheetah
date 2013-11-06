PollCheetah.Collections.QuestionAnswers = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.question = options.question;
  },

  model: PollCheetah.Models.Answer,
  
  url: function () {
    return "/polls/" + this.question.poll.id + "/questions/" + this.question.id + "/answers";
  }
});
