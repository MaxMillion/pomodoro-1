describe("Pomodoro", function(){
  var pomodoro, button;
  var click = $.Event('click');

  beforeEach(function() {
    jasmine.getFixtures().set(
      '<button name="Pomodoro" data-time="25" data-count="0"> Pomodoro </button> <button name="Short Break" data-time="5" data-count="0"> Short Break </button> <button name="Long Break" data-time="10" data-count="0"> Long Break </button> <button name="Reset" data-text="You pressed "> Reset </button> <ul class="history"></ul> <div id="clock"></div> <span id="countdown"></span> <div id="sound_element"></div>'
      );

    pomodoro = new Pomodoro();
  });

  describe("Pomodoro button", function(){
    beforeEach(function() {
      button = $('button[name="Pomodoro"]');
      button.trigger(click);
    });

    it("should has the class 'clicked' when clicked", function() {
      expect( button ).toHaveClass("clicked");
    });

    it("should have the 'embed' tag when clicked", function() {
      var sound_element = $("#sound_element")
      expect( sound_element ).toContain("embed");
    });

    it("should have the clicked.wav sound", function() {
      var embed = $("#sound_element embed");
      expect ( embed ).toHaveAttr("src", "sounds/clicked.wav");
    })

    it("should has the class 'finished' when clicked and the time's over", function() {
      pomodoro.buttonFinished();
      expect( button ).toHaveClass("finished");
    });

    it("should have the finished.wav sound", function() {
      pomodoro.buttonFinished();
      var embed = $("#sound_element embed");
      expect( embed ).toHaveAttr("src", "sounds/finished.wav");
    })

    it("should start the countdown when clicked", function() {
      var countdown = $("#countdown")
      expect( countdown ).toHaveText("25:00");
    });

    it("should get the countdown numbers red when time is equal to 15 seconds", function() {
      pomodoro.changeColor();
      var countdown = $("#countdown");
      expect( countdown ).toHaveClass("clock_red");
    })

    it("should create a entry on the history when clicked", function() {
      var history       = $("ul.history");
      var history_entry = history.find("li");

      expect( history ).toContain("li");
      expect( history_entry ).toContain("time");
    });
  });

  describe("Short Break button", function(){
    beforeEach(function() {
      button = $('button[name="Short Break"]');
      button.trigger(click);
    });

    it("should has the class 'clicked' when clicked", function() {
      expect( button ).toHaveClass("clicked");
    });

    it("should have the 'embed' tag when clicked", function() {
      var sound_element = $("#sound_element")
      expect( sound_element ).toContain("embed");
    });

    it("should have the clicked.wav sound", function() {
      var embed = $("#sound_element embed");
      expect ( embed ).toHaveAttr("src", "sounds/clicked.wav");
    })

    it("should has the class 'finished' when clicked and the time's over", function() {
      pomodoro.buttonFinished();
      expect( button ).toHaveClass("finished");
    });

    it("should have the finished.wav sound", function() {
      pomodoro.buttonFinished();
      var embed = $("#sound_element embed");
      expect( embed ).toHaveAttr("src", "sounds/finished.wav");
    })

    it("should start the countdown when clicked", function() {
      var countdown = $("#countdown")
      expect( countdown ).toHaveText("05:00");
    });

    it("should get the countdown numbers red when time is equal to 15 seconds", function() {
      pomodoro.changeColor();
      var countdown = $("#countdown");
      expect( countdown ).toHaveClass("clock_red");
    })

    it("should create a entry on the history when clicked", function() {
      var history       = $("ul.history");
      var history_entry = history.find("li");

      expect( history ).toContain("li");
      expect( history_entry ).toContain("time");
    });
  });

  describe("Long Break button", function(){
    beforeEach(function() {
      button = $('button[name="Long Break"]');
      button.trigger(click);
    });

    it("should has the class 'clicked' when clicked", function() {
      expect( button ).toHaveClass("clicked");
    });

    it("should have the 'embed' tag when clicked", function() {
      var sound_element = $("#sound_element")
      expect( sound_element ).toContain("embed");
    });

    it("should have the clicked.wav sound", function() {
      var embed = $("#sound_element embed");
      expect ( embed ).toHaveAttr("src", "sounds/clicked.wav");
    })

    it("should has the class 'finished' when clicked and the time's over", function() {
      pomodoro.buttonFinished();
      expect( button ).toHaveClass("finished");
    });

    it("should have the finished.wav sound", function() {
      pomodoro.buttonFinished();
      var embed = $("#sound_element embed");
      expect( embed ).toHaveAttr("src", "sounds/finished.wav");
    })

    it("should start the countdown when clicked", function() {
      var countdown = $("#countdown")
      expect( countdown ).toHaveText("10:00");
    });

    it("should get the countdown numbers red when time is equal to 15 seconds", function() {
      pomodoro.changeColor();
      var countdown = $("#countdown");
      expect( countdown ).toHaveClass("clock_red");
    })

    it("should create a entry on the history when clicked", function() {
      var history       = $("ul.history")
      var history_entry = history.find("li")

      expect( history ).toContain("li");
    expect( history_entry ).toContain("time");
    });
  });

  describe("Reset button", function(){
    beforeEach(function() {
      button = $('button[name="Reset"]');
      button.trigger(click);
    });

    it("should has the class 'clicked' when clicked", function() {
      expect( button ).toHaveClass("clicked");
    });

    it("should have the 'embed' tag when clicked", function() {
      var sound_element = $("#sound_element")
      expect( sound_element ).toContain("embed");
    });

    it("should have the clicked.wav sound", function() {
      var embed = $("#sound_element embed");
      expect ( embed ).toHaveAttr("src", "sounds/clicked.wav");
    })

    it("should start the countdown when clicked", function() {
      var countdown = $("#countdown")
      expect( countdown ).toHaveText("00:00");
    });

    it("should not have the countdown numbers red when clicked", function() {
      var countdown = $("#countdown");
      expect( countdown ).not.toHaveClass("clock_red");
    });

    it("should create a entry on the history when clicked", function() {
      var history       = $("ul.history");
      var history_entry = history.find("li");

      expect( history ).toContain("li");
      expect( history_entry ).toContain("time");
    });
  });
});
