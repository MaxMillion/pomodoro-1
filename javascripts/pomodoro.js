var Pomodoro = function(){
  this.timeout_sound = null;
  this.timeout_red_css = null;

  /* Função de initialize do Pomodoro */
  this.init = function(){
    var that = this;


    $("button").click(function(){
      if (!$(this).hasClass("clicked")){
        var counter = parseInt($(this).attr("data-count"));
        $(this).attr("data-count", counter+=1);
        that.setTime(this);
      }
    });
    this.setTime();
  }

  /* Inicia o Countdown */
  this.setTime = function(button){
    var that = this;

    clearTimeout(this.timeout_sound);
    clearTimeout(this.timeout_red_css);
    var data_time   = $(button).attr("data-time") || 0;
    var miliseconds = (data_time * 60 * 1000);
    var time_in_miliseconds = Date.now() + miliseconds;

    this.buttonState(button, "clicked");
    if(button !== undefined){ this.history(button); }

    if ($("#countdown").hasClass("clock_red")) { this.changeColor(); }
    $('#countdown').countdown('destroy');
    $("#countdown").countdown({
      until: new Date(time_in_miliseconds),
      format: 'MS',
      layout: "{mnn}{sep}{snn}"
    });
    if ($(button).attr("name") != "Reset" && button !== undefined){
      this.timeout_sound = setTimeout(function(){that.buttonFinished()}, miliseconds);
      this.timeout_red_css = setTimeout(function(){that.changeColor()}, (miliseconds - 15000));
    }
  }

  /* Toda vez que um botão for clicado, joga as informações sobre ele no histórico */
  this.history = function(button){
    if (button != undefined) {
      var text        = $(button).attr("data-text") || "You started your " + $(button).attr("data-count") + " " ;
      var li          = $("<li/>", {"text": text + button.name + " "});
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

  /* Zera as classes de todos os outros botões e aplica a classe no botão
   * passado como parâmetro */
  this.buttonState = function(button, state){
    if (button !== undefined){
      $('button[name!="'+button.name+'"]').removeClass();
      $(button).removeClass().addClass(state);
      this.playAlarm($(button));
    }
  }

  /* Muda a classe do botão que está clicado pra finalizado */
  this.buttonFinished = function(){
    var button = $("button.clicked");
    button.toggleClass("clicked finished");
    this.playAlarm(button);
  }

  this.playAlarm = function (button){
    if (button !== undefined){
      $('#sound_element').html("<embed src=sounds/" + button.attr("class") + ".wav hidden=true autostart=true loop=false>");
    }
  }

  this.changeColor = function (){
    $('#countdown').toggleClass("clock_red");
  }

  this.init();
}
