$(document).ready(function(){
  setPomodoroTime();

  $("#pomodoro").click(function(){
    var pomodoro = Date.now() + (25 * 60 * 1000);
    setPomodoroTime(pomodoro, this);
  });

  $("#short_break").click(function(){
    var short_break = Date.now() + (5 * 60 * 1000);
    setPomodoroTime(short_break, this);
  });

  function setPomodoroTime(time, button){
    buttonState(button, "clicked");

    if (time === undefined){ time = 0 }
    $('#countdown').countdown('destroy');
    setHistory(button);
    $("#countdown").countdown({
      until: new Date(time),
      format: 'MS',
      layout: "{mnn}{sep}{snn}",
      onExpiry: function(){ buttonFinished() }
    });
  }

  function setHistory(button){
    if (period != undefined){
      var date = new Date();
      var dateParsed = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
      $('#history').prepend($("<li> You started a new " + button.name + " </li>"))
      $('#history li:first').append("<abbr title=\" " + dateParsed +  "\"></abbr>")
      $('#history li:first abbr').timeago();
    }
  }

  function buttonState(button, state){
    if (button !== undefined){
      $('button[name!="'+button.name+'"]').removeClass();
      $(button).addClass(state);
    }
  }

  function buttonFinished(){
    $("button.clicked").toggleClass("clicked finished")
  }
});
