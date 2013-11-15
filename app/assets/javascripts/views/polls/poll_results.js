PollCheetah.Views.PollResults = Backbone.View.extend({
  template: JST["polls/results"],

  initialize: function() {
    var that = this;
    that.listenTo(that.model, 'change', that.render.bind(that));
    that.model.refreshResults();
    that.colorArray = [];
  },

  events: {
    "click #newColors" : "newColors"
  },

  render: function() {
    var renderedContent = this.template({
      poll: this.model,
      user: PollCheetah.currentUser
    });

    this.$el.html(renderedContent);

    this.createGraph();
    this.addColorLabels();
    return this;
  },

  createGraph: function(forceNewColors) {
    var that = this;
    var data = [];
    this.model._pollQuestions.models.forEach( function(question, index) {
      data[index] = []
      
      if (!this.colorArray || this.colorArray.length === 0 || forceNewColors === true) {
        var numAnswers = question._questionAnswers.models.length
        this.colorArray = []
        var startHue = Math.floor(Math.random()*360);
        var stepSize = Math.floor(Math.random()*3)

        for(var i = 0; i < numAnswers; i++) {
          var step = parseInt(360 / (numAnswers + stepSize))
          var hue = (startHue + i * step) % 360
          var saturation = Math.floor(75 + Math.random()*25)
          var lightness = Math.floor(30 + Math.random()*40)
          this.colorArray.push("hsl(" + hue + "," + saturation + "%," + lightness + "%)")
        }
        this.colorArray = _.shuffle(this.colorArray)        
      }

      question._questionAnswers.models.forEach( function(answer, answerIndex) {
        data[index].push({
          value: answer.attributes.num_votes,
          color: this.colorArray[answerIndex]
        });
        answer.color = this.colorArray[answerIndex];
      });
      var options = {animationEasing: "easeOutQuint"}
      var $pieGraph = $('<canvas id="pie' + question.id + '" width="250" height="250" style="width:250px;height:250px;"></canvas>');
      var $div = that.$("#pie_graph_" + question.id)
      $div.html($pieGraph);
      var ctx = that.$("#pie" + question.id).get(0).getContext("2d");
      var graph = new Chart(ctx).Pie(data[index],options);
    });
  },

  addColorLabels: function() {
    var that = this;
    that.model._pollQuestions.models.reverse().forEach( function(question) {
      question._questionAnswers.models.reverse().forEach( function(answer) {
        that.$("#answerLabel" + answer.attributes.id).css("background-color", answer.color);
      })
    })
  },

  newColors: function(event) {
    event.preventDefault();
    this.createGraph(true);
    this.addColorLabels();
  },

  // randomPoll: function(event) {
  //   event.preventDefault();
  //   var randID = Math.ceil(Math.random() * 20);
  //   Backbone.history.navigate("/polls/" + randID, { trigger: true });
  // }
});



