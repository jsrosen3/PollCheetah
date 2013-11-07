window.PollCheetah = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function() {
    var $newDiv = $('<div></div>').html($('#currentUser').text());
    var currentUserData = JSON.parse($newDiv.text());
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
    new PollCheetah.AppRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  PollCheetah.initialize();
});