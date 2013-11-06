PollCheetah.Collections.PollQuestions = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.poll = options.poll;
  },

  model: PollCheetah.Models.Question,
  
  url: function () {
    return "/polls/" + this.poll.id + "/questions";
  }
});
