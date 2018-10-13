function sendKeywords(type, value, state) {
    var host = 'https://recette.apm.fr/rencontres/';
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
        
        apiRequest('POST', '/wsm/edit/keywords', {
            mb_id: window.localStorage.getItem('user/id'),
            keywords: [{
                "value": value,
                "type": type,
                "state": state
            }]
            }, window.localStorage.getItem('login/access_token'), function(result) {
                console.log("resultat okay");
                var token = result; 
                // console.log(JSON.stringify(token, null, 2));
                //    $("#show-data").append("", JSON.stringify(token, null, 2));
                }, function (error) {
                    console.log(error);
        });
}