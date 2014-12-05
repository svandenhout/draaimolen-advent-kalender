window.fbAsyncInit = function() {
  FB.init({
    appId      : '663227207108814',
    xfbml      : true,
    version    : 'v2.2'
  });

  // ADD ADDITIONAL FACEBOOK CODE HERE
  function onLogin(response) {
    if (response.status == 'connected') {
      FB.api('/me', function(data) {
        var welcomeBlock = document.getElementById('fb-welcome');
        welcomeBlock.innerHTML = 'Hello, ' + data.first_name + '!';

        // onlogin
        loginLottery(data);
      });
    }
  }

  FB.getLoginStatus(function(response) {
    // Check login status on load, and if the user is
    // already logged in, go directly to the welcome message.
    if (response.status == 'connected') {
      onLogin(response);
    } else {
      // Otherwise, show Login dialog first.
      FB.login(function(response) {
        onLogin(response);
      }, {scope: 'user_friends, email'});
    }
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

var loginLottery = function(data) {
  $(".lottery").show();

  $.ajax("/user", {
    type: "POST",
    data: data
  }, function(user) {
    console.log(user);
  });

  $(".square").click(function() {
    var square = $(this);
    
    // var square0 = $.ajax("/testbtns", {
    //   data: {id: data.id}
    // });

    var square0 = $.ajax("/square" + $(this).attr("index"), {
      data: {id: data.id}
    });

    square0.done(function(data) {
      if(square.hasClass("button0")) {
        if(data.name) {
          square.css("background-image", "url('/assets/D-PRIJS.gif')");
        }else if(data === "lost") {
          square.css("background-image", "url('/assets/D-geen-prijs.gif')");
        }
      }

      if(square.hasClass("button1")) {
        if(data.name) {
          square.css("background-image", "url('/assets/R-PRIJS.gif')");
        }else if(data === "lost") {
          square.css("background-image", "url('/assets/R-geen-prijs.gif')");
        }
      }

      if(square.hasClass("button2")) {
        if(data.name) {
          square.css("background-image", "url('/assets/A-PRIJS.gif')");
        }else if(data === "lost") {
          square.css("background-image", "url('/assets/A-geen-prijs.gif')");
        }
      }

      if(square.hasClass("button3")) {
        if(data.name) {
          square.css("background-image", "url('/assets/A-PRIJS.gif')");
        }else if(data === "lost") {
          square.css("background-image", "url('/assets/A-geen-prijs.gif')");
        }
      }

      if(square.hasClass("button4")) {
        if(data.name) {
          square.css("background-image", "url('/assets/I-PRIJS.gif')");
        }else if(data === "lost") {
          square.css("background-image", "url('/assets/I-geen-prijs.gif')");
        }
      }

      if(square.hasClass("button5")) {
        if(data.name) {
          square.css("background-image", "url('/assets/M-PRIJS.gif')");
        }else if(data === "lost") {
          square.css("background-image", "url('/assets/M-geen-prijs.gif')");
        }
      }

      if(square.hasClass("button6")) {
        if(data.name) {
          square.css("background-image", "url('/assets/O-PRIJS.gif')");
        }else if(data === "lost") {
          square.css("background-image", "url('/assets/O-geen-prijs.gif')");
        }
      }

      if(square.hasClass("button7")) {
        if(data.name) {
          square.css("background-image", "url('/assets/L-PRIJS.gif')");
        }else if(data === "lost") {
          square.css("background-image", "url('/assets/L-geen-prijs.gif')");
        }
      }

      if(square.hasClass("button8")) {
        if(data.name) {
          square.css("background-image", "url('/assets/E-PRIJS.gif')");
        }else if(data === "lost") {
          square.css("background-image", "url('/assets/E-geen-prijs.gif')");
        }
      }

      if(square.hasClass("button9")) {
        if(data.name) {
          square.css("background-image", "url('/assets/N-PRIJS.gif')");
        }else if(data === "lost") {
          square.css("background-image", "url('/assets/N-geen-prijs.gif')");
        }
      }
      // square.addClass("animate");
      // setTimeout(function() {
      //   $(".popup").show();
      // }, 2000) // 1330 s
      console.log(data);
    });
  });
};