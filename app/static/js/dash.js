function info() {
    console.log(UserDB.get('phoneno'));
    $('#phonenumber').text(UserDB.get('phoneno'));
    $('#balance').text(UserDB.get('account.main'));
    $('#dbalance').text(UserDB.get('data.main'));
    $('#tplan').text(UserDB.get('tariff'));
}

function dash() {
    info();
}

$(document).ready(dash)
