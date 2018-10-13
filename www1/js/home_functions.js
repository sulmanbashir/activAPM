checkInternet();
//onclickButtonList(1);
function onLoading() {
   // doSomeFunctions();
    //check_position();
  onclickButtonList(1);
}

function doSomeFunctions() {
    var rayon = window.localStorage.getItem('user/position/rayon');
    if (rayon == null) {
        document.getElementById('rayon').value = "5000";
    } else {
        document.getElementById('rayon').value = rayon;
    }
}
            
var lol = window.localStorage.getItem('checkInternet');
function refreshPage() {
    window.setTimeout("location=('../index.html');", 3);
}

function initRayon() {
    document.getElementById("otherUser").style.visibility = "hidden";
    document.getElementById('noUsersFound').style.display ='none';
    var rayon = document.getElementById("rayon").value;
    document.getElementById.value = "rayon";
    window.localStorage.setItem('user/position/rayon', rayon);
    onclickButtonList(2);
                    
}

function test(value, latitude, longitude) {
    window.localStorage.setItem('otheruser/id', value);
    if (longitude != null && latitude != null) {
        window.localStorage.setItem('otheruser/position/longitude', longitude);
        window.localStorage.setItem('otheruser/position/latitude', latitude);
    }
}

function onclickButtonCalendar() {
    window.location.replace('plan_event.html');
}