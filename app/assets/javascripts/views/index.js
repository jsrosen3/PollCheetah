PollCheetah.Views.Index = Backbone.View.extend({
  template: JST["index"],

  events: {
    "click #tryItOut": "tryItOut",
    "click #newColors": "newColors"
  },

  render: function() {
    var renderedContent = this.template({

    });

    this.$el.html(renderedContent);

    this.createSampleGraph();
    return this;
  },

  tryItOut: function() {
    PollCheetah.currentUser.logInAsGuest();
  },

  createSampleGraph: function() {
    var data = [];
    var that = this;
    var N = 2 + Math.floor(Math.random() * 4)
    _.times(N, function(answer) {
      var randColor = '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)
      data.push({
        value: 5 + Math.floor(Math.random() * 18),
        color: randColor
      });
    });
    var options = {animationEasing: "easeOutQuint"}
    var $pieGraph = $('<canvas id="pie" width="120" height="120" style="width:150px;height:150px;margin-bottom:-16px"></canvas>');
    var $div = that.$("#sample_pie_graph")
    $div.html($pieGraph);
    var ctx = that.$("#pie").get(0).getContext("2d");
    var graph = new Chart(ctx).Pie(data,options);
  },

  newColors: function() {
    event.preventDefault();
    this.createSampleGraph();
  }

  // randomPoll: function(event) {
  //   event.preventDefault();
  //   var randID = 
  //   Backbone.history.navigate(;, { trigger: true });
  // }
});