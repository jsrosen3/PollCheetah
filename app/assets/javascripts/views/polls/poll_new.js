PollCheetah.Views.PollNew = Backbone.View.extend({
  template: JST["polls/new"],

  events: {
    "click #addAnotherQuestion": "addAnotherQuestion",
    "click #addAnotherAnswer": "addAnotherAnswer",
    "click #submitForm": "submitForm"
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

  submitForm: function(event) {
    event.preventDefault();

    var payload = $('#newPoll').serializeJSON();
    var poll = new PollCheetah.Models.Poll(payload.poll, { parse: true });

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
  }
});