function log(msg){
    console.log(msg);
    document.body.innerHTML += '<p>'+msg+'</p>';
}

function sleep(milli) {
    var start = new Date().getTime();
    
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milli){
            break;
        }
    }
}

function goParameters() {
    cordova.plugins.diagnostic.switchToLocationSettings();
}

function goRefresh() {
    var modal = document.getElementById('myModalLocation');
    modal.style.display = "none";
    location.reload();
}

function checkNetwork() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //log("connection type = ");
    //log(states[networkState]);
    if (networkState == Connection.NONE) {
        window.localStorage.setItem('checkInternet', 'false');
    } else {
        window.localStorage.setItem('checkInternet', 'true');
    }
}

function notif() {
    log("il rentre dans les notif");
    cordova.plugins.notification.local.hasPermission(function (granted) {
        //if (granted == "true") {
            //var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
            var media = new Media("http://www.pacdv.com/sounds/interface_sound_effects/sound112.wav");
            var date = new Date();
            log("iGRANTED")
            cordova.plugins.notification.local.schedule({
                id: 1,
                title: "Il y'a quelqu'un autour de vous !",
                message: "Activ' Apm",
                at: date,
                sound: media.play(),
                icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png"
            });
        //}
    });
    
}

function whoIs() {
    if (cordova.platformId == 'android') {
        log("je suis un android");
    } else if (cordova.platformId == 'ios') {
        log("je suis un iOS");
    }
}

function checkLocationEnabled(){
    if (navigator.geolocation) {
            //searchModal("Envoi de votre position");
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
            errorGeoloc();
        }
    function successCallback(pos) {
            //do nothing 
    }
    function errorCallback(error){
            //do nothing 
    }
   // if (cordova.plateformId == 'android') {
        cordova.plugins.diagnostic.isLocationAvailable(successLocationAvailable, errorLocationAvailable);
        function successLocationAvailable(enabled) {
            if (enabled == false) {
                if (cordova.platformId == 'android') {
                    var modal = document.getElementById('myModalLocation');
                    modal.style.display = "block";
                } else if (cordova.platformId == 'ios') {
                    //log("il est bien rentrer dedans");
                    var modal = document.getElementById('myModalLocation');
                    modal.style.display = "block";
                    document.getElementById('goParameters').style.display = "none";
    //                document.getElementById('goRefresh').style.textAlign = "center";
                    //ref.setAttribute("align", "center");
                }
                //sleep(5000);
            }
            else if (enabled == true) {
                var session = window.localStorage.getItem('session');
            
                if (session == null || session == 0) {
                    window.setTimeout("location=('templates/login.html');", 3000);
                } else if (session == '1'){
                    //window.setTimeout("location=('templates/home.html');", 3000);
                    // document.addEventListener("deviceready", onReady, false);
                    window.setTimeout("location=('templates/redirection.html');", 3000);
                }
            }
        }
    function errorLocationAvailable(err) {
        log("error : " +err);
    }
}