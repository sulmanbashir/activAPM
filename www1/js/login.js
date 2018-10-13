var host = 'http://apm.epixelic.com';
var client_id = 'application_011h9yF2d9It9714273d';
var client_secret = 'VPJpdPl75JS563Zbk3tL';

        $(function() {
          var apiRequest = function(method, endpoint, data, authToken, successCallback, failCallback) {
            data = $.extend({
              client_id: client_id,
              client_secret: client_secret
            }, data);
            var headers = {
              "content-type": "application/json"
            };
            if (authToken != null) {
              headers['Authorization'] = 'Bearer ' + authToken;
            }
            $.ajax({
              url: host + endpoint,
              method: method,
              headers: headers,
              processData: false,
              data: JSON.stringify(data)
            }).done(successCallback).fail(typeof failCallback == 'function' ? failCallback : console.error);
          };
            
          $('form').submit(function(e) {
            e.preventDefault();
            window.localStorage.setItem('user/username', $('#username').val());
            window.localStorage.setItem('user/password', $('#password').val());
            apiRequest('POST', '/auth/token', {
              grant_type: 'password', // type d'authentification
              username: $('#username').val(), // on récup. les uname et pwd entrés
              password: $('#password').val()
            }, null, function(result) { // callback si OK
              var token = result; // le token reçu
              $("result").append("Jeton reçu : \n", JSON.stringify(token, null, 2), "\nAppel de /me...\n");
        
              var jeton = JSON.stringify(token);
              var newJeton = JSON.parse(jeton);
                
              var now = new Date();
              var h = now.getHours();
              var min = now.getMinutes();
              h = h + 1;
              if (h >= 24) {
                  h = '0';
              }
              if (h < 10) {
                  h = '0' + h;
              }
              if (min < 10) {
                  min = '0' + min;
              }
              var time = h + ':' + min;
              
              window.localStorage.setItem('session', '1');
              window.localStorage.setItem('endsToken/time', time);
              window.localStorage.setItem('endsToken/refreshUsed', '0');
              window.localStorage.setItem('login/access_token', newJeton.access_token);
              window.localStorage.setItem('login/expires_in', newJeton.expires_in);
              window.localStorage.setItem('login/token_type', newJeton.token_type);
              window.localStorage.setItem('login/scope', newJeton.scope);
              window.localStorage.setItem('login/refresh_token', newJeton.refresh_token);

              // maintenant qu'on a le jeton, on essaye un /me
              apiRequest('GET', '/me', {}, token.access_token, function(result) {
               // window.location.replace('../templates/redirection.html');
                window.setTimeout("location=('../templates/redirection.html');", 3000);
                window.localStorage.setItem('firstUse', '0');
                var me = JSON.stringify(result);
                var newMe = JSON.parse(me);
                
                window.localStorage.setItem('user/id', newMe.id);
              });
            }, function (error) { // callback erreur
                document.getElementById("error_connexion").style.visibility = 'visible';
            });
          });
        });