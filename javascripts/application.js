$(document).ready(function(){
  setPomodoroTime();

  $("#pomodoro").click(function(){
    var pomodoro = Date.now() + (25 * 60 * 1000);
    setPomodoroTime(pomodoro, this.name);
  });

  $("#short_break").click(function(){
    var short_break = Date.now() + (5 * 60 * 1000);
    setPomodoroTime(short_break, this.name);
  });

  function setPomodoroTime(time, period){
    if (time === undefined){ time = 0 }
    $('#countdown').countdown('destroy');
    setHistory(period);
    $("#countdown").countdown({
      until: new Date(time),
      format: 'MS',
      layout: "{mnn}{sep}{snn}"
      //onExpiry
    });
  }

  function setHistory(period){
    if (period != undefined){
      var date = new Date();
      var dateParsed = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
      $('#history').prepend($("<li> You started a new " + period + " </li>"))
      $('#history li:first').append("<abbr title=\" " + dateParsed +  "\"></abbr>")
      $('#history li:first abbr').timeago();
    }
  }
});
