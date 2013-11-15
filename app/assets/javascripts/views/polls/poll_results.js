PollCheetah.Views.PollResults = Backbone.View.extend({
  template: JST["polls/results"],

  initialize: function() {
    var that = this;
    that.listenTo(that.model, 'change', that.render.bind(that));
    that.model.refreshResults();
    that.colorArrays = {};
  },

  events: {
    "click .newColors" : "newColors"
  },

  render: function() {
    var renderedContent = this.template({
      poll: this.model,
      user: PollCheetah.currentUser
    });

    this.$el.html(renderedContent);

    this.createGraphs();
    return this;
  },

  createGraphs: function() {
    var that = this;
    that.model._pollQuestions.models.forEach( function(question, index) {
      that.createGraph(question, true);
      that.addColorLabels(question);
    });
  },

  createGraph: function(question, forceNewColors) {
    var data = [];
    var that = this;
    
    // create an array of colors, no two of which are too similar
    if (!this.colorArrays[question.id] || this.colorArrays[question.id].length === 0 || forceNewColors) {
      var numAnswers = question._questionAnswers.models.length
      this.colorArrays[question.id] = []
      var startHue = Math.floor(Math.random()*360);
      var stepSize = Math.floor(Math.random()*3)

      for(var i = 0; i < numAnswers; i++) {
        var step = parseInt(360 / (numAnswers + stepSize))
        var hue = (startHue + i * step) % 360
        var saturation = Math.floor(75 + Math.random()*25)
        var lightness = Math.floor(30 + Math.random()*40)
        this.colorArrays[question.id].push("hsl(" + hue + "," + saturation + "%," + lightness + "%)")
      }
      this.colorArrays[question.id] = _.shuffle(this.colorArrays[question.id]);
    }

    // store the votes and colors according to the Chart.js requirements
    question._questionAnswers.models.forEach( function(answer, answerIndex) {
      data.push({
        value: answer.attributes.num_votes,
        color: that.colorArrays[question.id][answerIndex]
      });
      answer.color = that.colorArrays[question.id][answerIndex]; // this line may not work - need to check
    });

    // draw the graph
    var options = {animationEasing: "easeOutQuint"}
    var $pieGraph = $('<canvas id="pie' + question.id + '" width="250" height="250" style="width:250px;height:250px;"></canvas>');
    var $div = that.$("#pie_graph_" + question.id)
    $div.html($pieGraph);
    var ctx = that.$("#pie" + question.id).get(0).getContext("2d");
    var graph = new Chart(ctx).Pie(data,options);
  },

  addColorLabels: function(question) {
    var that = this;
    question._questionAnswers.models.reverse().forEach( function(answer) {
      that.$("#answerLabel" + answer.attributes.id).css("background-color", answer.color);
    })
  },

  newColors: function(event) {
    event.preventDefault();
    var questionID = $(event.target).data("id");
    question = _.filter(this.model._pollQuestions.models, function(question){ return question.id === questionID; })[0];
    this.createGraph(question, true);
    this.addColorLabels(question);
  }
});



