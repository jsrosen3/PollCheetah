PollCheetah.AppRouter = Backbone.Router.extend({
  routes: {
    ""                 : "index",
    "users/new"        : "userNew",
    "users/:id"        : "userPolls",
    //"users/:id/edit"   : "userEdit",
    "polls/new"        : "pollNew",
    "polls/:id"        : "pollResults",
    //"polls/:id/edit"   : "pollEdit"
  },

  initialize: function($header, $content) {
    PollCheetah.router = this;
    this.$content = $content;
    this.$header = $header;
    this.header = new PollCheetah.Views.Header();
    this.$header.$header.html(this.header.render().$el);
  },

  reloadHeader: function() {
    this.header = new PollCheetah.Views.Header();
    this.$header.$header.html(this.header.render().$el);
  },

  index: function() {
    var indexView = new PollCheetah.Views.Index();
    this._swapView(indexView);
  },

  userNew: function() {
    var userNewView = new PollCheetah.Views.UserNew();
    this._swapView(userNewView);
  },

  userPolls: function(id) {
    if (!PollCheetah.currentUser || id != PollCheetah.currentUser.attributes.id) {
      Backbone.history.navigate("/", { trigger: true });
    } else {
      var router = this; 
      router._getPolls(function (polls) {
        var userPollsView = new PollCheetah.Views.UserPolls({
          model: PollCheetah.currentUser,
          collection: polls
        });
        router._swapView(userPollsView);
      });
    }
  },

  // userEdit: function() {
  //   var userEditView = new PollCheetah.Views.UserEdit();
  //   this._swapView(userEditView);
  // },

  pollNew: function() {
    if (!PollCheetah.currentUser) {
      Backbone.history.navigate("/", { trigger: true });
    } else {
      var pollNewView = new PollCheetah.Views.PollNew({
        model: new PollCheetah.Models.Poll()
      });
      this._swapView(pollNewView);
    }
  },

  pollResults: function(id) {
    var that = this;
    this._getPoll(id, function(poll) {
      var pollResultsView = new PollCheetah.Views.PollResults({
        model: poll
      });
      that._swapView(pollResultsView);
    });
  },

  // pollEdit: function() {
  //   var pollEditView = new PollCheetah.Views.PollEditView();
  //   this._swapView(pollEditView);
  // },

  _swapView: function (newView) {
    if (this._prevView) {
      this._prevView.remove();
    }

    this._prevView = newView;
    newView.render();
    $("#content").html(newView.$el);
  },

  _getPoll: function(id, callback) {
    poll = new PollCheetah.Models.Poll({
      id: id
    });
    poll.fetch({
      success: callback
    });
  },

  _getPolls: function (callback) {
    if (!PollCheetah.currentUserPolls) {  
      PollCheetah.currentUserPolls = new PollCheetah.Collections.Polls();
      PollCheetah.currentUserPolls.fetch({
        success: callback
      });
    } else {
      callback(PollCheetah.currentUserPolls);
    }
  }
});