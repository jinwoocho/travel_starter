<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
    <script>

        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1460312270674459',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.8'
            });
            FB.getLoginStatus(function(response){
                if(response.status === 'connected'){
                    document.getElementById('status').innerHTML = 'logged in.';
                } else if(response.status === 'not authorized'){
                    document.getElementById('status').innerHTML = 'not logged in.';
                } else {
                    document.getElementById('status').innerHTML = 'not logged in to facebook.';
                }
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        function checkLogin(){
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });
        }

        function statusChangeCallback(facebookResponse){
            console.log('login status changed!',facebookResponse);
        }

        function getInfo() {
            FB.api('/me', {fields: 'first_name,last_name,email,gender,age_range,picture'}, function (response) {
                console.log(response);
                document.getElementById('user_info').innerHTML =
                    JSON.stringify(
                        'Name: ' + response.first_name + ' ' + response.last_name + ', ' +
                        'email: ' + response.email + ' ' +
                        'gender: ' + response.gender + ', ' +
                        'id: ' + response.id + ', ' +
                        'picture: <img src=' + response.picture.data.url + '>'
                    );
                $.ajax({
                    url: 'fb_user_info.php',
                    type: 'POST',
                    data: {
                        response : response

                    },
                    success: function (response) {
                        console.log('AJAX Success function called, with the following result:', response);

                    },
                    error: function (response) {
                        console.log('AJAX Fail');
                    }
                });
            });
        }
        function logOut(){
            FB.logout(function(response) {
                console.log(response,'logged out')
            });
        }
    </script>

</head>
<body>
<div id="status"></div>
<div id="user_info"></div>
<button onclick="getInfo()"> info </button>
<fb:login-button
    scope="public_profile,email"
    onlogin="checkLogin()">
</fb:login-button>
<button onclick="logOut()">logout</button>
</body>
</html>