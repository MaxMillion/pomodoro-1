var Pomodoro = function (container){
  this.CONST = {
    PRESSED: 'clicked',
    NEAR_END: 'clock_red',
    FINISHED: 'finished'
  };

  this.$container       = $(container);
  this.$pomodoro        = null;
  this.$shortBreak      = null;
  this.$longBreak       = null;
  this.$reset           = null;
  this.$countdown       = null;
  this.$history_content = null;
  this.$sound           = null;

  this.timeout_sound   = null;
  this.timeout_red_css = null;

  this.createUI();
  this.startCountdown(false);
}

Pomodoro.prototype.createButton = function(name, data) {
  var that  = this;
  var props = {
    name: name,
    text: name,
    data: data,
    click: function () {
      if (!$(this).hasClass(that.CONST.PRESSED)) {
        var counter = $(this).data("count");

        $(this).data("count", counter+=1);

        that.startCountdown(this);
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

  this.$actions     = $('<ul/>', {class:'action_buttons'}).append(this.$pomodoro).append(this.$shortBreak).append(this.$longBreak).append(this.$reset);

  this.$container.append(this.$actions);
};

Pomodoro.prototype.createClock = function() {
  this.$countdown = $('<span/>', {id:'countdown'});

  var $clock = $('<div/>', {id:'clock'}).append(this.$countdown);

  this.$container.append($clock);
};

Pomodoro.prototype.createHistory = function() {
  this.$history_content = $('<ul/>', {class:'history'});

  var $history = $('<div/>', {id:'history_board'}).append(this.$history_content);

  this.$container.append($history);
};

Pomodoro.prototype.createSound = function() {
  this.$sound = $('<div/>', {id:'sound_element'});

  this.$container.append(this.$sound);
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

Pomodoro.prototype.markAsFinished = function(pomodoro){
  var button = $('.' + pomodoro.CONST.PRESSED, pomodoro.$container);
  button.toggleClass(pomodoro.CONST.PRESSED + ' ' + pomodoro.CONST.FINISHED);
  pomodoro.playAlarm(button);
}

Pomodoro.prototype.theEndIsNear = function (pomodoro){
  pomodoro.$countdown.toggleClass(pomodoro.CONST.NEAR_END);
}

Pomodoro.prototype.setTimeouts = function(button, miliseconds){
  if ($(button).not(this.$reset)){
    this.timeout_sound   = setTimeout(this.markAsFinished, miliseconds, this);
    this.timeout_red_css = setTimeout(this.theEndIsNear, (miliseconds - 15000), this);
  }
}

Pomodoro.prototype.markAsClicked = function(button){
  if (typeof button !== 'undefined'){
    this.$container.find('button').not(button).removeClass();
    $(button).removeClass().addClass(this.CONST.PRESSED);
  }
}

Pomodoro.prototype.startCountdown = function(button){
  var countdownInMin  = $(button).data("time") || 0;
  var countdownInMs   = (countdownInMin * 60 * 1000);
  var targetTimestamp = Date.now() + countdownInMs;

  this.markAsClicked(button);
  this.clearTimeouts();

  if (button) {
    this.logActionFrom(button);
  }
  if (this.$countdown.hasClass(this.CONST.NEAR_END)) {
    this.theEndIsNear();
  }

  this.$countdown.countdown('destroy');
  this.$countdown.countdown({
    until: new Date(targetTimestamp),
    format: 'MS',
    layout: "{mnn}{sep}{snn}"
  });

  if (button) {
    this.setTimeouts(button, countdownInMs);
  }
}

Pomodoro.prototype.logActionFrom = function(button){
  if (typeof button != 'undefined') {
    var text = $(button).data("text") || "You started your " + stringfyOrdinal($(button).data("count")) + " " ;
    var li   = $("<li/>", {"text": text + button.name + " "});
    var date = new Date().toISOString();

    li.append($("<time/>", {"datetime": date})).find("time").timeago();

    this.$history_content.parent().show("fast");
    this.$history_content.prepend(li);
  }
}

Pomodoro.prototype.playAlarm = function (button){
  if (typeof button !== 'undefined'){
    this.$sound.html("<embed src=sounds/" + button.attr("class") + ".wav hidden=true autostart=true loop=false>");
  }
}
function stringfyOrdinal(number) {
  if (typeof number !== 'undefined') {
    if(number < 10) {
      switch(number % 10){
        case 1:
          return number.toString()+"-st";
        case 2:
          return number.toString()+"-nd";
        case 3:
          return number.toString()+"-rd";
        default:
          return number.toString()+"-th";
      }
    } else {
      switch(number % 100){
        case 11:
          return number.toString()+"-th";
        case 21:
          return number.toString()+"-st";
        case 22:
          return number.toString()+"-nd";
        case 23:
          return number.toString()+"-rd";
        default:
          return number.toString()+"-th";
      }
    }
  }
}