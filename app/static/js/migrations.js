var Migration = {};
(function (mg) {
    var migrations = {};

    function getTariff(name) {
        return migrations[name.toLowerCase()];
    }

    function defaultRecharge(user, price) {
        user.account.main = parseFloat(user.account.main) + parseFloat(price);
    }

    function cost(persec, sec) {
        return (persec * sec) / 100;
    }

    function defaultCall(user, sec) {
        user.account.bonus -= cost(this.parsec, sec);
        if (user.account.bonus < 0) {
            user.account.main = parseFloat(user.account.main) + parseFloat(user.account.bonus);
            user.account.bonus = 0;
        }
        return cost(this.parsec, sec);
    }

    mg.recharge = function (user, price) {
        var tariff = getTariff(user.tariff);
        if (tariff) {
            tariff.recharge(user, price);
        }
    };

    mg.costTooHigh = function (user, sec) {
        var tariff = getTariff(user.tariff);
        return (parseFloat(user.account.main) + parseFloat(user.account.bonus)) >= cost(tariff.parsec, sec);
    }

    mg.canMessage = function (user) {
        return (parseFloat(user.account.main) + parseFloat(user.account.bonus)) >= 2;
    }

    mg.message = function (user) {
        user.account.bonus -= 2;
        if (user.account.bonus < 0) {
            user.account.main = parseFloat(user.account.main) + parseFloat(user.account.bonus);
            user.account.bonus = 0;
        }
        return 2;
    }

    mg.call = function (sec) {
        var tariff = getTariff(user.tariff);
        if (tariff) {
            tariff.call(user, sec);
        }
    }

    mg.plans = function () {
        return Object.keys(migrations).map(function (k) {
            var m = migrations[k];
            return [m.name, m.code];
        });
    };

    mg.tariff = function (name) {
        return getTariff(name);
    };

    migrations.startpack = {
        name: 'StartPack',
        code: '*401#',
        parsec: 40,
        recharge: function (user, val) {
            user.account.bonus = parseFloat(user.account.bonus) + parseFloat(val * 5);
            user.account.main = parseFloat(user.account.main) + parseFloat(val);
            user.data.bonus = parseFloat(user.data.bonus) + 10;
        },
        call: defaultCall
    };

    migrations.xtraspecial = {
        name: 'Xtraspecial',
        code: '*408*1#',
        parsec: 16,
        recharge: defaultRecharge,
        call: defaultCall
    };

    migrations.xtrapro = {
        name: 'XtraPro',
        code: '*401#',
        parsec: 11,
        recharge: defaultRecharge,
        call: defaultCall
    };

    migrations.truetalk = {
        name: 'TrueTalk',
        code: '*400#',
        parsec: 20,
        recharge: defaultRecharge,
        call: defaultCall
    };

    migrations.pulse = {
        name: 'Pulse',
        code: '*406*1#',
        parsec: 20,
        recharge: defaultRecharge,
        call: defaultCall
    };

    migrations.betatalk = {
        name: 'betaTalk',
        code: '*123*2*6#',
        parsec: 40,
        recharge: function (user, val) {
            user.account.bonus = parseFloat(user.account.bonus) + parseFloat(val * 2);
            user.account.main = parseFloat(user.account.main) + parseFloat(val);
        },
        call: defaultCall
    };

    migrations.zone = {
        name: 'Zone',
        code: '*135*1#',
        parsec: 40,
        recharge: defaultRecharge,
        call: defaultCall
    };

    migrations.bizplus = {
        name: 'bizPlus',
        code: '*406*1#',
        parsec: 40,
        recharge: defaultRecharge,
        call: defaultCall
    };

    migrations.bclass = {
        name: 'Class',
        code: '*406*3#',
        parsec: 40,
        recharge: defaultRecharge,
        call: defaultCall
    };

    migrations.yellowlife = {
        name: 'yellowLife',
        code: '*406*6#',
        parsec: 40,
        recharge: defaultRecharge,
        call: defaultCall
    };

}(Migration));
