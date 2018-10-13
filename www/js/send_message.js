function send_message() {
    //var mailWindow = window.location.href = "mailto:abc@example.com?subject=lolilol";
    //mailWindow.close();
    var otheruserFirstName = window.localStorage.getItem('otheruser/first_name');
    var otheruserLastName = window.localStorage.getItem('otheruser/last_name');
    var userFirstName = window.localStorage.getItem('user/first_name');
    var userLastName = window.localStorage.getItem('user/last_name');
    
    var body = 'Bonjour ' + otheruserFirstName + ' ' + otheruserLastName + ',%0A%0A' + userFirstName + ' ' + userLastName + ' désire vous rencontrez.%0A';
    //var body = 'lolilol';
    
    var email = window.localStorage.getItem('otheruser/email');
    if (email == null) {
         var email = 'sulman.pro@gmail.com';   
    }
    var subject = 'Activ' + ' APM - Boostez vos rencontres';
    //var mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
    
    var mailWindow = window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
    mailWindow.close();
}