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
  
  console.log(data);
  $.ajax("/user", {
    type: "POST",
    data: data
  }, function(user) {
    console.log(user);
  });
};