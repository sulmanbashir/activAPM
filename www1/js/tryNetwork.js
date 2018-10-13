function checkInternet() {
    $.ajax({
        url : 'https://www.google.com',
        type : 'GET',
        dataType : 'html',
        success : function(code_html, statut){
            console.log(statut);
            window.localStorage.setItem('checkInternet', 'true');
        },
        error : function(resultat, statut, erreur){
            console.log(erreur);
            window.localStorage.setItem('checkInternet', 'false');
       }
    });
}

/*function checkHost() {
     $.ajax({
        type: 'GET',
        async: true,
        crossDomain: true,
        url: "https://www.sidonie-dev.com/rencontres/wsm/",
        processData: true,
        headers: {
            "authorization": "Basic YXBtdXNlcjpzMWQwbmlFKg==",
            "cache-control": "no-cache",
        },
        success : function(code_html, statut){
            console.log(statut);
            window.localStorage.setItem('checkHostResponse', 'vrai');
        },
        error : function(resultat, statut, erreur){
            console.log(erreur);
            window.localStorage.setItem('checkHostResponse', 'faux')
       }
    });
}*/