PollCheetah.Views.UserPolls = Backbone.View.extend({
  template: JST["users/polls"],

  events: {

  },

  render: function() {
    var that = this;

    var renderCallback = function() {
      var renderedContent = that.template({
        user: that.model,
        polls: PollCheetah.currentUserPolls
      });

      that.$el.html(renderedContent);
      return that;
    }

    this.refreshCurrentUserPolls(renderCallback);
  },

  refreshCurrentUserPolls: function(callback) {
    $.ajax({
      url: "/polls",
      method: "GET",
      success: function (data) {
        PollCheetah.currentUserPolls = data
        callback();
      },
      error: function (err) {

      }
    })
  }
});