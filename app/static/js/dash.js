function info() {
    $('#phonenumber').text(UserDB.get('phoneno'));
    $('#balance').text(UserDB.get('account.main'));
    $('#bbalance').text(UserDB.get('account.bonus'));
    $('#dbalance').text(UserDB.get('data.main'));
    $('#bdbalance').text(UserDB.get('data.bonus'));
    $('#tplan').text(UserDB.get('tariff'));
}

function option(val, text) {
    text = text || val;
    return '<option value="' + val + '">' + text + '</option>';
}

function fillCards() {
    var rechargeCards = [100, 200, 300, 400, 500].reduce(function(prev, price) {
        return prev + '\n' + option(price);
    }, '');
    $('#prices').html(rechargeCards);
}

function fillPlans() {
    var plans = Migration.plans();
    $('#plans').html(plans.reduce(function(prev, plan) {
        return prev + '\n' + option(plan[0]);
    }, ''));
    var mplan = Migration.tariff(plans[0][0]);
    $('#txtMigrate').val(mplan.code);
}

function autoUpdateCode() {
    $('#plans').change(function (evt) {
        var plan = $(this).val();
        var mplan = Migration.tariff(plan);
        $('#txtMigrate').val(mplan.code);
    });
}

function recharge() {
    fillCards();
    $('#recharge form').submit(function(evt) {
        evt.preventDefault();
        var price = $('#prices').val();
        User.recharge(price);
        alert('Successfully recharged account');
    });
}

function migrate() {
    fillPlans();
    autoUpdateCode();
}

function dash() {
    if (!UserDB.sessionExists()) {
        Router.go('index.html');
        return;
    }
    info();
    recharge();
    migrate();
}

$(document).ready(dash);
