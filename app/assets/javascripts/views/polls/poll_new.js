PollCheetah.Views.PollNew = Backbone.View.extend({
  template: JST["polls/new"],

  events: {
    "click #addAnotherQuestion": "addAnotherQuestion",
    "click #addAnotherAnswer": "addAnotherAnswer",
    "click #submitForm": "submitForm",
    "click .removeQuestion": "removeQuestion",
    "click .removeAnswer": "removeAnswer"
  },

  render: function() {
    var renderedContent = this.template({
      poll: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

  addAnotherQuestion: function(event) {
    var questionNumber = $(event.target).data("question-number");
    $(event.target).data("question-number", questionNumber + 1);
    var $newQuestion = JST["polls/question"]({
      question: new PollCheetah.Models.Question(),
      i: questionNumber
    });
    $("ul#questions").append($newQuestion)
  },

  addAnotherAnswer: function(event) {
    var questionNumber = $(event.target).data("question-number");
    var $listOfAnswers = $("#answers_for_question_" + questionNumber);
    var $lastAnswer = $listOfAnswers.find("li").last();
    var answerNumber = $lastAnswer.data("answer-number");
    answerNumber != null ? answerNumber += 1 : answerNumber = 0;
    var $newAnswer = JST["polls/answer"]({
      answer: new PollCheetah.Models.Answer(),
      i: questionNumber,
      j: answerNumber
    });
    $listOfAnswers.append($newAnswer)
  },

  removeQuestion: function(event) {
    event.preventDefault();
    var i = $(event.target).data("question-number");
    var $questionView = $("#question" + i)
    $questionView.addClass("hidden");
    $questionView.append('<input type="hidden" name="poll[questions_attributes][' + i + '][_destroy]" value="true">')
    $("#question" + i + "label").addClass("hidden");
    $("#question_" + i + "_text").addClass("hidden");
    $("#removeQuestion" + i).addClass("hidden");
    $(".question" + i + "br").addClass("hidden");
  },

  removeAnswer: function(event) {
    event.preventDefault();
    var i = $(event.target).data("question-number");
    var j = $(event.target).data("answer-number");
    $("#question" + i + "answer" + j).addClass("hidden");
    var $answer = $("#question_" + i + "_answer_" + j + "_text")
    $answer.attr("name", 'poll[questions_attributes][' + i + '][answers_attributes][' + j + '][_destroy]')
    $answer.attr("value", "true")
  },

  submitForm: function(event) {
    event.preventDefault();

    this.payload = $('#newPoll').serializeJSON();
    this._filterRemovedQuestions();
    this._filterRemovedAnswers();

    var poll = new PollCheetah.Models.Poll(this.payload.poll, { parse: true });

    if (!poll.isValid()) {
      this.$("#errors").html("");
      poll.validationError.forEach(function(err) {
        this.$("#errors").prepend(
          '<p style="color:#FF0000;">' + err + "</p>"
        );
      });
      return;
    } 

    poll.save(null, {
      success: function() {
        PollCheetah.polls.add(poll);
        PollCheetah.currentUserPolls.push(poll.attributes);
        Backbone.history.navigate("/polls/" + poll.id, { trigger: true });
      },

      error: function() {
        alert("Error saving your poll :-(");
      }
    });
  },

  _filterRemovedQuestions: function() {
    this.payload.poll.questions_attributes = _.select(this.payload.poll.questions_attributes, function(question) {
      return !question._destroy;
    });
  },

  _filterRemovedAnswers: function() {
    var that = this
    that.payload.poll.questions_attributes.forEach( function(question, index) {
      that.payload.poll.questions_attributes[index].answers_attributes = _.select(that.payload.poll.questions_attributes[index].answers_attributes, function(answer) {
        return !answer._destroy;
      })
    })
  }
});







