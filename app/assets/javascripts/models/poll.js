PollCheetah.Models.Poll = Backbone.Model.extend({
  urlRoot: "/polls",

  // initialize: function() {
  //   this.refreshResults();
  // },

  questions: function() {
    if (!this._pollQuestions) {
      this._pollQuestions = new PollCheetah.Collections.PollQuestions([], { poll: this });
    }

    return this._pollQuestions;
  },

  parse: function (serverAttributes, options) {
    this.questions().reset(serverAttributes.questions, {parse: true});
    delete serverAttributes.questions;

    return serverAttributes;
  },

  toJSON: function () {
    var json = _.extend({}, this.attributes);
    json.questions = this.questions().toJSON();
    
    return json;
  },

  refreshResults: function () {
    var poll = this;
    poll.channel = PollCheetah.pusher.subscribe(poll.id.toString());
    var callback = function(data) {
      new_results = poll.parse(JSON.parse(data.new_results));
      poll.set(new_results);
      poll.trigger('change');
    }

    poll.channel.bind('new_vote', callback)
  },

  validate: function(attrs, options) {
    var validationError = [];
    if (!attrs.title) {
      validationError.push("Please enter a title.")
    }
    if (!attrs.questions_attributes || attrs.questions_attributes.length < 1) {
      validationError.push("You must have at least one question.")
    } else {
      attrs.questions_attributes.forEach( function(question, index) {
        if (!question.text) {
          if (validationError.indexOf("Each question must have text.") === -1) {
            validationError.push("Each question must have text.");
          }
        }
        if (!question.answers_attributes || question.answers_attributes.length < 2) {
          if (validationError.indexOf("Each question must have at least two answers.") === -1) {
            validationError.push("Each question must have at least two answers.");
          }
        } else {
          question.answers_attributes.forEach( function(answer, answerIndex) {
            if (!answer.text) {
              if (validationError.indexOf("Each answer must have text.") === -1) {
                validationError.push("Each answer must have text.");
              }
            }
          });
        }
      });
    }
    if (validationError.length === 0) {return;} else {return validationError;}
  }
});




