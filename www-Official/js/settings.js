function searchModalSettings() {
    var modal = document.getElementById('modalSettings');
    modal.style.display = "block";
}

function settings() {
    searchModalSettings();
}

function closeSettings() {
    var modal = document.getElementById('modalSettings');
    modal.style.display = "none";
    
    var aboutme1 = window.localStorage.getItem('user/aboutme1');
    var aboutme2 = window.localStorage.getItem('user/aboutme2');
    var aboutme3 = window.localStorage.getItem('user/aboutme3');
    if (aboutme1 != null && aboutme2 != null && aboutme3 != null) {
        console.log("okay morrauuuuuuuy");
    }
}

function searchModalSettingsBox() {
    var modal = document.getElementById('modalSettingsBox');
     modal.style.display = "block";
}

function settingsBox() {
    console.log("okay");
    searchModalSettingsBox();
}

function closeSettingsBox() {
    var modal = document.getElementById('modalSettingsBox');
    modal.style.display = "none";
}

function aboutme1() {
    var old = window.localStorage.getItem('user/aboutme1');
    sendKeywords("aboutme-1", old, "delete");
    var lol = document.getElementById("about-1").value;
    window.localStorage.setItem('user/aboutme1', lol);
    sendKeywords("aboutme-1", lol, "insert");
    var about1 = window.localStorage.getItem('user/aboutme1');
    $('#about1').replaceWith('<p class="quality" id="about1">'+ about1 +'</p>');
}
function aboutme2() {
    var old = window.localStorage.getItem('user/aboutme2');
    sendKeywords("aboutme-2", old, "delete");
    var lol = document.getElementById("about-2").value;
    window.localStorage.setItem('user/aboutme2', lol);
    sendKeywords("aboutme-2", lol, "insert");
    var about2 = window.localStorage.getItem('user/aboutme2');
    $('#about2').replaceWith('<p class="quality" id="about2">'+ about2 +'</p>');
}
function aboutme3() {
    var old = window.localStorage.getItem('user/aboutme3');
    sendKeywords("aboutme-3", old, "delete");
    var lol = document.getElementById("about-3").value;
    window.localStorage.setItem('user/aboutme3', lol);
    sendKeywords("aboutme-3", lol, "insert");
    var about3 = window.localStorage.getItem('user/aboutme3');
    $('#about3').replaceWith('<p class="quality" id="about3">'+ about3 +'</p>');
}

function searchme1() {
    var old = window.localStorage.getItem('keyword/search/1');
    sendKeywords("searchme-1", old, "delete");
    var lol = document.getElementById("searchme-1").value;
    sendKeywords("searchme-1", lol, "insert");
    window.localStorage.setItem('keyword/search/1', lol);
    document.getElementById("search-text").innerHTML = '<h3>'+lol+'</h3>';
}

function searchme1value() {
    var old = window.localStorage.getItem('searchme1-value');
    sendKeywords("searchme1-value", old, "delete");
    var val = document.getElementById("searchme1-value").value;
    sendKeywords("searchme1-value", val, "insert");
    window.localStorage.setItem('searchme1-value', val);
    document.getElementById("search-textFull").innerHTML = '<h4>'+val+'</h4>';
}
/*
function offerme1() {
    var lol = document.getElementById("offerme-1").value;
    window.localStorage.setItem('keyword/offer/1', lol);
    var offerme1 = window.localStorage.getItem('keyword/offer/1');
    $('#offer-1').replaceWith('<li id="offer-1">'+ offerme1 +'</li>');
}
function offerme2() {
    var lol = document.getElementById("offerme-2").value;
    window.localStorage.setItem('keyword/offer/2', lol);
    var offerme2 = window.localStorage.getItem('keyword/offer/2');
    $('#offer-2').replaceWith('<li id="offer-2">'+ offerme2 +'</li>');
}
function offerme3() {
    var lol = document.getElementById("offerme-3").value;
    window.localStorage.setItem('keyword/offer/3', lol);
    var offerme3 = window.localStorage.getItem('keyword/offer/3');
    $('#offer-3').replaceWith('<li id="offer-3">'+ offerme3 +'</li>');
}*/