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




  validate: function () {
    // var errors = [];
    
    // if (!this.get("title") || this.get("title").length === 0) {
    //   errors.push("Poll title can't be blank");
    // }

    // if (!this.get("questions")) {
    //   errors.push("You must have at least one question")
    // }
    // // possibly add other errors
    
    // return errors.length == 0 ? undefined : errors;
  }
});