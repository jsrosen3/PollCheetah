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
    event.preventDefault();
    if (PollCheetah.currentUser.id) {
      Backbone.history.navigate('#polls/new', { trigger: true });
    } else {
      PollCheetah.currentUser.logInAsGuest();
    }
  },

  createSampleGraph: function() {
    var data = [];
    var that = this;
    var numAnswers = 2 + Math.floor(Math.random() * 4)
    var startHue = Math.floor(Math.random()*360);
    var stepSize = Math.floor(Math.random()*3)
    colorArray = []
    for(var i = 0; i < numAnswers; i++) {
        var step = parseInt(360 / (numAnswers + stepSize))
        var hue = (startHue + i * step) % 360
        var saturation = Math.floor(75 + Math.random()*25)
        var lightness = Math.floor(30 + Math.random()*40)
        colorArray.push("hsl(" + hue + "," + saturation + "%," + lightness + "%)")
      }
    colorArray = _.shuffle(colorArray)
    var answerIndex = 0;
    _.times(numAnswers, function() {
      data.push({
        value: 5 + Math.floor(Math.random() * 18),
        color: colorArray[answerIndex]
      });
      answerIndex += 1;
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