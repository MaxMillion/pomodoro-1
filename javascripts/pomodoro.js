var Pomodoro = function (container){
  this.$container  = $(container);
  this.$pomodoro   = null;
  this.$shortBreak = null;
  this.$longBreak  = null;
  this.$reset      = null;

  this.timeout_sound   = null;
  this.timeout_red_css = null;
  this.countdown       = $("#countdown");
  this.history_content = $('ul.history');
  this.sound           = $("#sound_element");

  this.createUI();
  this.setTime();
}

Pomodoro.prototype.createButton = function(name, data) {
  var that  = this;
  var props = {
    name: name,
    text: name,
    data: data,
    click: function () {
      if (!$(this).hasClass("clicked")) {
        var counter = $(this).data("count");

        $(this).data("count", counter+=1);

        that.setTime(this);
      }
    }
  };

  return $('<button/>', props);
};

Pomodoro.prototype.createActions = function() {
  this.$pomodoro   = $('<li/>').append(this.createButton('Pomodoro', {time:25, count:0}));
  this.$shortBreak = $('<li/>').append(this.createButton('Short Break', {time:5, count:0}));
  this.$longBreak  = $('<li/>').append(this.createButton('Long Break', {time:10, count:0}));
  this.$reset      = $('<li/>').append(this.createButton('Reset', {text:'You pressed '}));

  var $actions     = $('<ul/>', {class:'action_buttons'}).append(this.$pomodoro).append(this.$shortBreak).append(this.$longBreak).append(this.$reset);

  this.$container.append($actions);
};

Pomodoro.prototype.createClock = function() {
  var $clock = $('<div/>', {id:'clock'}).append($('<span/>', {id:'countdown'}));

  this.$container.append($clock);
};

Pomodoro.prototype.createHistory = function() {
  var $history = $('<div/>', {id:'history_board'}).append($('<ul/>', {class:'history'}));

  this.$container.append($history);
};

Pomodoro.prototype.createSound = function() {
  var $sound = $('<div/>', {id:'sound_element'});

  this.$container.append($sound);
};

Pomodoro.prototype.createUI = function() {
  this.createActions();
  this.createClock();
  this.createHistory();
  this.createSound();
};

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