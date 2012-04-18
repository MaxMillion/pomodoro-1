$(document).ready(function(){
  setPomodoroTime();

  $("button").click(function(){
    if (!$(this).hasClass("clicked")){
      var data_time   = $(this).attr("data-time") || 0
      var miliseconds = Date.now() + (data_time * 60 * 1000);
      setPomodoroTime(miliseconds, this);
    }
  });

  function setPomodoroTime(time, button){
    buttonState(button, "clicked");
    if (time === undefined){ time = 0; }
    if(button !== undefined) { setHistory(button); }

    $('#countdown').countdown('destroy');
    $("#countdown").countdown({
      until: new Date(time),
      format: 'MS',
      layout: "{mnn}{sep}{snn}",
      onExpiry: function(){ buttonFinished() }
    });
  }

  function setHistory(button){
    if (button != undefined){
      var li          = $("<li/>", {"text": "You started a new " + button.name + " "});
      var date        = new Date();
      var dateParsed  = new Date(date.getFullYear(),
                                date.getMonth(),
                                date.getDate(),
                                date.getHours(),
                                date.getMinutes(),
                                date.getSeconds()).toISOString();

      li.append($("<time/>", {"datetime": dateParsed}));
      li.find("time").timeago();

      $('#history_board').show("fast");
      $('ul.history').prepend(li);
    }
  }

  function buttonState(button, state){
    if (button !== undefined){
      $('button[name!="'+button.name+'"]').removeClass();
      $(button).removeClass().addClass(state);
    }
  }

  function buttonFinished(){
    $("button.clicked").toggleClass("clicked finished");
  }
});
