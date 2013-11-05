window.PollCheetah = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function() {
    PollCheetah.polls = new PollCheetah.Collections.Polls();
    PollCheetah.polls.fetch({
      success: function() {
        new PollCheetah.AppRouter();
        Backbone.history.start();
      }
    });
  }
};

$(document).ready(function(){
  PollCheetah.initialize();
});
