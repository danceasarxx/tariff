var Migration = {};
(function (mg) {
    var migrations = {};

    function getTariff(name) {
        return migrations[name.toLowerCase()];
    }

    function defaultRechage(user, price) {
        user.account.main = price;
    }

    function cost(persec, sec) {
        return (persec * sec) / 100;
    }

    mg.recharge = function (user, price) {
        var tariff = getTariff(user.tariff);
        if (tariff) {
            tariff.recharge(user, price);
        }
    };

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
        recharge: function (user, val) {
            user.account.bonus = val * 5;
            user.account.main = val;
        },
        call: function (user, sec) {
            user.account.main -= cost(40, sec);
            return cost(40, sec);
        }
    };

    migrations.xtraspecial = {
        name: 'Xtraspecial',
        code: '*408*1#',
        call: function (user, sec) {
            user.account.main -= cost(16, sec);
            return cost(16, sec);
        }
    };
}(Migration));
