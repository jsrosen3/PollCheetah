window.PollCheetah = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function() {
    var $header = $("#header");
    var $userInfo = $('<div></div>').html($('#currentUser').text());
    var currentUserData = JSON.parse($userInfo.text());
    if (currentUserData) {
      this.currentUser = new PollCheetah.Models.User(currentUserData);
      this.currentUserPolls = $('#user-stuff').data('user-content');
    }
    // var user = $('#current-user').data('curr-user');
    // console.log(user)
    // if (user) {
    //   var content = $('#user-stuff').data('user-content');
    //   console.log(content)
    //   this.currentUser = new PollCheetah.Models.User(content)
    //   console.log(this.currentUser)
    // }

    PollCheetah.polls = new PollCheetah.Collections.Polls();
    PollCheetah.pusher = new Pusher('ca893aacc8006a231dc9');
    PollCheetah.polls.fetch({
      success: function () {
        new PollCheetah.AppRouter({
          $header: $header
        })
        Backbone.history.start();
      }
    });
  }
};

$(document).ready(function(){
  PollCheetah.initialize();
});