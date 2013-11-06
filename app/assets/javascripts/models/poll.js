PollCheetah.Models.Poll = Backbone.Model.extend({
  urlRoot: "/polls",

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

  validate: function() {
    // maybe do this later? (server-side validation)
  }
});