var Migration = {};
(function (mg) {
    var migrations = {};

    var startpack = {
        name: 'Start Pack',
        code: '*401#',
        recharge: function (account, val) {
            account.bonus = val * 5;
            account.normal = val;
        }
    };
}(Migration));
