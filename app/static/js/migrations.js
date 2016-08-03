var Migration = {};
(function (mg) {
    var migrations = {};

    function getTariff(name) {
        return migrations[name.toLowerCase()];
    }

    function defaultRechage(user, price) {
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
        recharge: defaultRechage, 
        call: defaultCall
    };
}(Migration));
