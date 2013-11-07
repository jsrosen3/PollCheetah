PollCheetah.Views.Header = Backbone.View.extend({
  template: JST['header'],

  events: {
    "click .myAccount": "myAccount",
    "click .logOut": "logOut",
    "click .signUp": "signUp",
    "click .logIn": "logIn",
  }

  render: {
    render: function() {
    var renderedContent = this.template({

    });

    this.$el.html(renderedContent);
    return this;
  }

});