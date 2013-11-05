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

  },

  userNew: function() {

  },

  userPolls: function() {

  },

  userEdit: function() {

  },

  pollNew: function() {

  },

  pollResults: function() {

  },

  pollEdit: function() {

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