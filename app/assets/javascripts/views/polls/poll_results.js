PollCheetah.Views.PollResults = Backbone.View.extend({
  template: JST["polls/results"],

  initialize: function() {
    var pollResults = this;
    pollResults.listenTo(pollResults.model, 'change', pollResults.render.bind(pollResults));
    pollResults.model.refreshResults();
  },

  events: {
    
  },

  render: function() {
    var renderedContent = this.template({
      poll: this.model
    });

    this.$el.html(renderedContent);

    this.createGraph();
    return this;
  },

  createGraph: function() {
    var data = [];
    var that = this;
    this.model._pollQuestions.models.forEach( function(question) {
      question._questionAnswers.models.forEach( function(answer) {
        var randColor = '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)
        data.push({
          value: answer.attributes.num_votes,
          color: randColor
        });
      });
      var options = {animationEasing: "easeOutQuint"}
      var $pieGraph = $('<canvas id="pie" width="250" height="250" style="width:250px;height:250px;"></canvas>');
      var $div = that.$("#pie_graph_" + question.id)
      $div.html($pieGraph);
      var ctx = that.$("#pie").get(0).getContext("2d");
      var graph = new Chart(ctx).Pie(data,options);
    });
  }
});



