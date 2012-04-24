var Pomodoro = function(){
  this.timeout_sound    = null;
  this.timeout_red_css  = null;
  this.countdown        = $("#countdown");
  this.history_content  = $('ul.history');
  this.sound            = $("#sound_element");

  var that = this;

  $("button").click(function () {
    if (!$(this).hasClass("clicked")) {
      var counter = $(this).data("count");

      $(this).data("count", counter+=1);

      that.setTime(this);
    }
  });

  this.setTime();
}

Pomodoro.prototype.clearTimeouts = function(){
  clearTimeout(this.timeout_sound);
  clearTimeout(this.timeout_red_css);
}

Pomodoro.prototype.setTimeouts = function(button, miliseconds){
  if ($(button).attr("name") != "Reset" && button !== undefined){
    this.timeout_sound = setTimeout(this.buttonFinished, miliseconds);
    this.timeout_red_css = setTimeout(this.changeColor, (miliseconds - 15000));
  }
}

/* Inicia o Countdown */
Pomodoro.prototype.setTime = function(button){
  var data_time           = $(button).data("time") || 0;
  var miliseconds         = (data_time * 60 * 1000);
  var time_in_miliseconds = Date.now() + miliseconds;

  this.buttonState(button, "clicked");
  this.clearTimeouts();

  if (typeof button !== 'undefined'){ this.history(button); }
  if (this.countdown.hasClass("clock_red")) { this.changeColor(); }

  $('#countdown').countdown('destroy');
  $("#countdown").countdown({
    until: new Date(time_in_miliseconds),
    format: 'MS',
    layout: "{mnn}{sep}{snn}"
  });

  this.setTimeouts(button, miliseconds);
}

/* Toda vez que um botão for clicado, joga as informações sobre ele no histórico */
Pomodoro.prototype.history = function(button){
  if (typeof button != 'undefined') {
    var text = $(button).data("text") || "You started your " + $(button).data("count") + " " ;
    var li   = $("<li/>", {"text": text + button.name + " "});
    var date = new Date().toISOString();

    li.append($("<time/>", {"datetime": date})).find("time").timeago();

    this.history_content.parent().show("fast");
    this.history_content.prepend(li);
  }
}

/* Zera as classes de todos os outros botões e aplica a classe no botão
 * passado como parâmetro */
Pomodoro.prototype.buttonState = function(button, state){
  if (typeof button !== 'undefined'){
    $('button[name!="'+button.name+'"]').removeClass();
    $(button).removeClass().addClass(state);
    this.playAlarm($(button));
  }
}

/* Muda a classe do botão que está clicado pra finalizado */
Pomodoro.prototype.buttonFinished = function(){
  var button = $("button.clicked");

  button.toggleClass("clicked finished");
  this.playAlarm(button);
}

Pomodoro.prototype.playAlarm = function (button){
  if (typeof button !== 'undefined'){
    this.sound.html("<embed src=sounds/" + button.attr("class") + ".wav hidden=true autostart=true loop=false>");
  }
}

Pomodoro.prototype.changeColor = function (){
  this.countdown.toggleClass("clock_red");
}