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
            //headers['Authorization'] = 'Bearer ' + authToken; a voir pour la prod !!
        }
        $.ajax({
            url: host + endpoint,
            method: method,
            headers: headers,
            processData: false,
            data: JSON.stringify(data)
        }).done(successCallback).fail(typeof failCallback == 'function' ? failCallback : console.error);
};