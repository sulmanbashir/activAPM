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

function onReady(){
    if (cordova.platformId == 'android') {
        //log("je suis un android");
    } else if (cordova.platformId == 'ios') {
        StatusBar.overlaysWebView(false);
       // log("je suis un ios");
    }
    TestFairy.begin("ea645ec15bac7e8630d8e5a0b22972c9225d49b4");
    cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
        switch(status){
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                //log("Permission not requested");
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                //log("Permission granted");
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED:
                //log("Permission denied");
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                //log("Permission permanently denied");
                break;
        }
    }, function(error){
        console.error(error);
    });
    cordova.plugins.diagnostic.isLocationAvailable(successLocationAvailable, errorLocationAvailable);
    function successLocationAvailable(enabled) {
        if (enabled == false) {
            var modal = document.getElementById('myModalLocation');
            modal.style.display = "block";
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