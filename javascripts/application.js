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
    if (button != undefined){
      var date = new Date();
      var dateParsed = new Date(date.getFullYear(),
                                date.getMonth(),
                                date.getDate(),
                                date.getHours(),
                                date.getMinutes(),
                                date.getSeconds()).toISOString();
      $('#history_board').show("fast");

      var li = $("<li/>", {"text": "You started a new " + button.name + " "});
      li.append($("<time/>", {"datetime": dateParsed}));
      li.find("time").timeago();
      $('#history').prepend(li);
    }
  }

  function buttonState(button, state){
    if (button !== undefined){
      $('button[name!="'+button.name+'"]').removeClass();
      $(button).addClass(state);
    }
  }

  function buttonFinished(){
    $("button.clicked").toggleClass("clicked finished");
  }
});
