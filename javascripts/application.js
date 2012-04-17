$(document).ready(function(){
  setPomodoroTime();

  $("#pomodoro").click(function(){
    var pomodoro = Date.now() + (25 * 60 * 1000);
    setPomodoroTime(pomodoro);
  });

  $("#short_break").click(function(){
    var short_break = Date.now() + (5 * 60 * 1000);
    setPomodoroTime(short_break);
  });

  function setPomodoroTime(time){
    if (time === undefined){ time = 0 }
    $('#countdown').countdown('destroy');
    $("#countdown").countdown({
      until: new Date(time),
      format: 'MS',
      layout: "{mnn}{sep}{snn}"
      //onExpiry
    });
  }
});

