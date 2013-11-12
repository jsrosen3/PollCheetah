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

  // validation: {
  //   title: {
  //     required: true
  //   },
  //   'questions': {
  //     length: 1
  //   }
  //   // 'question.answers': {
  //   //   length: 1
  //   // },
  // }
});