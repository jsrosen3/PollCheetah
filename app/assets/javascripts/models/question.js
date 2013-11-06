PollCheetah.Models.Question = Backbone.Model.extend({
  urlRoot: "/questions",

  answers: function() {
    if (!this._questionAnswers) {
      this._questionAnswers = new PollCheetah.Collections.QuestionAnswers([], { question: this });
    }

    return this._questionAnswers;
  }

  parse: function (serverAttributes, options) {
    this.answers().reset(serverAttributes.answers);
    delete serverAttributes.answers;

    return serverAttributes;
  },

  toJSON: function () {
    var json = _.extend({}, this.attributes);
    json.answers = this.answers().toJSON();
    
    return json;
  },

  validate: function() {
    // maybe do this later? (server-side validation)
  }
});