var Pomodoro = function(){

  /* Função de initialize do Pomodoro */
  this.init = function(){
    var that = this

    $("button").click(function(){
      if (!$(this).hasClass("clicked")){
        var data_time   = $(this).attr("data-time") || 0
        var miliseconds = Date.now() + (data_time * 60 * 1000);
        var counter     = parseInt($(this).attr("data-count"));

        $(this).attr("data-count", counter+=1);
        that.setTime(miliseconds, this);
      }
    });

    this.setTime();
  }

  /* Inicia o Countdown */
  this.setTime = function(time, button){
    var that = this

    this.buttonState(button, "clicked");
    if (time === undefined){ time = 0; }
    if(button !== undefined) { this.history(button); }

    $('#countdown').countdown('destroy');
    $("#countdown").countdown({
      until: new Date(time),
      format: 'MS',
      layout: "{mnn}{sep}{snn}",
      onExpiry: function(){ that.buttonFinished(); }
    });
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
    }
  }

  /* Muda a classe do botão que está clicado pra finalizado */
  this.buttonFinished = function(){
    $("button.clicked").toggleClass("clicked finished");
  }

  this.init();
}
