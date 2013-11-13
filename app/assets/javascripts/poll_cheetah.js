window.PollCheetah = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function() {
    var $header = $("#header");
    var $content = $("#content");
    var $userInfo = $('<div></div>').html($('#currentUser').text());
    var currentUserData = JSON.parse($userInfo.text());
    this.currentUser = new PollCheetah.Models.User(currentUserData);
    if (currentUserData) {
      this.currentUserPolls = $('#user-stuff').data('user-content');
    }
    PollCheetah.polls = new PollCheetah.Collections.Polls();
    PollCheetah.pusher = new Pusher('ca893aacc8006a231dc9');
    PollCheetah.router = new PollCheetah.AppRouter({
      $header: $header,
      $content: $content
    })
    Backbone.history.start();
  }
};

$(document).ready(function(){
  PollCheetah.initialize();
});