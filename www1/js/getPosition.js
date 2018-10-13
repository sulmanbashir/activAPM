function postPosition() {
    var host = 'https://www.sidonie-dev.com/rencontres';
    var client_id = 'application_011h9yF2d9It9714273d';
    var client_secret = 'VPJpdPl75JS563Zbk3tL';
    var apiRequest = function(method, endpoint, data, authToken, successCallback, failCallback) {
            data = $.extend({
              client_id: client_id,
              client_secret: client_secret
            }, data);
            var headers = {
              "content-type": "application/json"
            };
            if (authToken != null) {
              headers['Authorization'] = 'Basic YXBtdXNlcjpzMWQwbmlFKg==';
            }
            $.ajax({
              url: host + endpoint,
              method: method,
              headers: headers,
              processData: false,
              data: JSON.stringify(data)
            }).done(successCallback).fail(typeof failCallback == 'function' ? failCallback : console.error);
    };
    var pos = window.localStorage.getItem('user/position/rayon');
    apiRequest('POST', '/wsm/geolocalisation/near', {
              mb_id: window.localStorage.getItem('user/id'),
              latitude: window.localStorage.getItem('user/position/latitude'),
              longitude: window.localStorage.getItem('user/position/longitude'),
              rayon: window.localStorage.getItem('user/position/rayon')
            }, window.localStorage.getItem('login/access_token'), function(result) {
            var parseUsers = JSON.parse(JSON.stringify(result));
            var Users = JSON.parse(JSON.stringify(parseUsers.donnees));
            var test = JSON.parse(JSON.stringify(Users.membre_proche));
            if (test[0] == null) {
                console.log("erreur rien trouver !");
                document.getElementById('noUsersFound').style.display ='block';
                $('#noUsersFound').append("<center><img src='../img/crying.png'></center>");
                $('#noUsersFound').append("<center><h3>Retentez votre chance en augmentant le rayon</h3></center><br/>");
            }
            var k = 0;
            while (test[k] != null) {
                k++;
            }
            console.log('k1 =', k);
            window.localStorage.setItem('nbrOfAdhr', k);
            var i = 0;
            var j = 1;
            var dec = 0;
            $('#userFound').append("<br /><h3>En temps réel</h3><br />");
            while (i != k) { 
                var name = JSON.parse(JSON.stringify(test[i]));
                var id = "otherUser" + j;
                var str = name.mb_nom;
                var strChange = str.toUpperCase();
                var num = name.mb_distance;
                var activity = name.clubs.club_nom;
                var longitude = name.mb_longitude;
                var latitude = name.mb_latitude;
                
                var society;
                if (name.societe.soc_nom == null) {
                    society = "Non définie<br /><br />";
                } else {
                    society = name.societe.soc_nom + "<br /><div class='activity'>" + activity + "</div>";
                }
                $('#userFound').append('<div id="otherUser" class="listUsers shadow_listUsers"><img id="otherUserPic" src="../img/photo_test.jpg"</img><h4 id="otherUserFullname"><a href="../templates/redirection_other_user.html" onClick="test('+name.mb_id+', '+latitude+', '+longitude+')" style="color: rgb(40,40,49)">'+ name.mb_prenom + " " + strChange + '</a></h4><entreprise id="otherUserEntreprise">'+ society +'</entreprise><br /><div class="dep">&nbsp;</div><distance id="otherUserDistance">'+ num.toFixed(0) +' m</distance></div>');
                i++;
                j++;
              }
            }, function (error) { 
                console.log("error get request1\n");
                $('#noUsersFound').append("<center><img src='../img/crying.png'></center>");
                $('#noUsersFound').append("<center><h3>Communication avec le serveur impossible</h3></center>");
    });
    apiRequest('POST', '/wsm/localisation', {
            ville: 'PARIS',
            date_debut: '18/02/2017 00:00:00',
            date_fin: '22/02/2017 23:59:59'
            }, window.localStorage.getItem('login/access_token'), function(result) {
            var parseUsers = JSON.parse(JSON.stringify(result));
            var Users = JSON.parse(JSON.stringify(parseUsers.membres));
            //console.log(name.nom);
            
            var k = 0;
            while (Users[k] != null) {
                k++;
            }
            console.log('k2 = ', k);
            var initNbrofAdhr = window.localStorage.getItem('nbrOfAdhr');
            console.log("adhr = ", initNbrofAdhr);
            initNbrofAdhr = Number(initNbrofAdhr) + Number(k);
            console.log('init = ', initNbrofAdhr);
            var initHeight = initNbrofAdhr + 1;
            initHeight = initHeight * 20;
            console.log("hei = ", initHeight);
            document.getElementById("content-wrap").style.height = initHeight + '%';
            var i = 0;
            $('#userFound').append("<br /><h3>Event planifié</h3><br />");
            while (i != k) {
                var name = JSON.parse(JSON.stringify(Users[i]));
                var str = name.nom;
                var strChange = str.toUpperCase();
                var date = name.debut +'-'+ name.fin;
                var acitity = name.societe;
                var society;
                if (name.societe == null) {
                    society = "Non définie<br /><br />";
                } else {
                    society = name.societe + "<br />";
                }
            $('#userFound').append('<div id="otherUser" class="listUsers shadow_listUsers"><img id="otherUserPic" src="../img/photo_test.jpg"</img><h4 id="otherUserFullname"><a href="../templates/redirection_other_user.html" onClick="test('+name.id_membre+', 0, 0)" style="color: rgb(40,40,49)">'+ name.prenom + " " + strChange + '</a></h4><entreprise id="otherUserEntreprise">'+name.societe+'</entreprise><br /><div class="activity">Club : '+name.ville+'</div><br /><div class="depEvent">&nbsp;</div><date id="otherUserDistance">'+ date +'</date></div>');
            i++;
             }
            }, function (error) { 
                console.log(error);
            });
}

function putMyPosition() {
    var host = 'https://www.sidonie-dev.com/rencontres';
    var client_id = 'application_011h9yF2d9It9714273d';
    var client_secret = 'VPJpdPl75JS563Zbk3tL';
    
    var apiRequest = function(method, endpoint, data, authToken, successCallback, failCallback) {
            data = $.extend({
              client_id: client_id,
              client_secret: client_secret
            }, data);
            var headers = {
              "content-type": "application/json"
            };
            if (authToken != null) {
              headers['Authorization'] = 'Basic YXBtdXNlcjpzMWQwbmlFKg==';
            }
            $.ajax({
              url: host + endpoint,
              method: method,
              headers: headers,
              processData: false,
              data: JSON.stringify(data)
            }).done(successCallback).fail(typeof failCallback == 'function' ? failCallback : console.error);
    };
    apiRequest('POST', '/wsm/geolocalisation', {
              mb_id: window.localStorage.getItem('user/id'),
              latitude: window.localStorage.getItem('user/position/latitude'),
              longitude: window.localStorage.getItem('user/position/longitude')
            }, window.localStorage.getItem('login/access_token'), function(result) {
            console.log("putmyposition = ",result);
        
            }, function (error) {
                console.log(error);
                console.log("error get request2\n");
    });  
}

function onclickButtonGeoloc() {
    if (navigator.geolocation) {
            searchModal("Envoi de votre position");
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
            errorGeoloc();
        }
        function successCallback(pos) {
            sleep(1000);
            var crd = pos.coords;
            window.localStorage.setItem('user/position/latitude', crd.latitude);
            window.localStorage.setItem('user/position/longitude', crd.longitude);
            window.localStorage.setItem('user/position/accuracy', crd.accuracy);
            console.log('longitude = ', crd.longitude);
            console.log('latitude = ', crd.latitude);
            putMyPosition();
            searchModalClear();
            console.log("choose number = 1");
        }
        function errorCallback(error){
            console.log(error);
            searchModalClear();
            var modal = document.getElementById('modalNoGeoloc');
            modal.style.display = "block";
            function refreshPage() {
                document.location.href="index.html"; 
            }  
        }
}

function onclickButtonList(choose) {
        document.getElementById("userFound").innerHTML = "";
        if (navigator.geolocation) {
            if (choose == 2) {
                searchModal("Recherche en cours...");
            } else if (choose == 1) {
               searchModal("Chargement en cours...");
            }
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
            searchModalClear();
            errorGeoloc();
        }
        function successCallback(pos) {
            sleep(1000);
            var crd = pos.coords;
            window.localStorage.setItem('user/position/latitude', crd.latitude);
            window.localStorage.setItem('user/position/longitude', crd.longitude);
            window.localStorage.setItem('user/position/accuracy', crd.accuracy);
            putMyPosition();
            postPosition();
            searchModalClear();
        }
        function errorCallback(error){
            searchModalClear(); // a remettre sans faute !
            /*var modal = document.getElementById('modalNoGeoloc');
            modal.style.visibility = "visible";
            function refreshPage() {
                document.location.href="index.html"; 
            }*/
        }
}

function errorGeoloc() {
    var modal = document.getElementById('modalNoGeoloc');
    modal.style.display = "block";
}

function searchModal(msg) {
    var modal = document.getElementById('modalResult');
    document.getElementById('modalResultMsg').innerHTML = "<p><center>"+ msg +"</center></p>";
    modal.style.display = "block";
}

function searchModalClear() {
    var modal = document.getElementById('modalResult');
    modal.style.display = "none";
}

function sleep(milli) {
  var start = new Date().getTime();
 
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milli){
      break;
    }
  }
}