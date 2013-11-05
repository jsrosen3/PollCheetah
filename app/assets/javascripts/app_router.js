PollCheetah.AppRouter = Backbone.Router.extend({
  routes: {
    ""                 : "index",
    "users/new"        : "userNew",
    "users/:id"        : "userPolls",
    "users/:id/edit"   : "userEdit",
    "polls/new"        : "pollNew",
    "polls/:id/results": "pollResults",
    "polls/:id/edit"   : "pollEdit"
  },

  index: function() {
    var indexView = new PollCheetah.Views.Index();
    this._swapView(indexView);
  },

  userNew: function() {
    var userNewView = new PollCheetah.Views.UserNew();
    this._swapView(userNewView);
  },

  userPolls: function() {
    var userPollsView = new PollCheetah.Views.UserPolls();
    this._swapView(userPollsView);
  },

  userEdit: function() {
    var userEditView = new PollCheetah.Views.UserEdit();
    this._swapView(userEditView);
  },

  pollNew: function() {
    var pollNewView = new PollCheetah.Views.PollNew();
    this._swapView(pollNewView);
  },

  pollResults: function() {
    var pollResultsView = new PollCheetah.Views.PollResultsView();
    this._swapView(pollResultsView);
  },

  pollEdit: function() {
    var pollEditView = new PollCheetah.Views.PollEditView();
    this._swapView(pollEditView);
  },

  _swapView: function (newView) {
    if (this._prevView) {
      this._prevView.remove();
    }

    this._prevView = newView;
    newView.render();
    $("body").html(newView.$el);
  }
});