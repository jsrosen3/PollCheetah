window.PollCheetah = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function() {
    PollCheetah.polls = new PollCheetah.Collections.Polls();
    new PollCheetah.AppRouter();
    //Backbone.history.start();  -- not ready to use Backbone yet

    // PollCheetah.polls.fetch({
    //   success: function() {
        
    //   }
    // });
  }
};

$(document).ready(function(){
  PollCheetah.initialize();
});
