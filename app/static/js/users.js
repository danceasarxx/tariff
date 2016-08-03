var UserDB = {};
(function (udb) {
    var users = Storage.load('users');
    udb.load = function (phoneno) {
        return users[phoneno];
    };

    udb.has = function (phoneno) {
        return !!users[phoneno];
    };

    udb.sessionExists = function () {
        return !!users.current;
    };

    function splitKeys(key) {
        return key.split('.');
    }

    function walkPath(path, obj) {
        if (path.length == 1) {
            return obj[path[0]];
        }
        return walkPath(path.slice(1), obj[path[0]]);
    }

    udb.get = function (key) {
        var path = splitKeys(key);
        return walkPath(path, users.current);
    };

    udb.__get = function () {
        return users.current;
    };

    udb.save = function (name, phoneno) {
        var user = {name: name, phoneno:phoneno};
        user.account = {main: 0,bonus: 0};
        user.data = {main: 0, bonus: 0};
        user.tariff = 'StartPack';
        users[phoneno] = user;
        Storage.save('users', users);
    };

    udb.setSession = function (phoneno) {
        users.current = users[phoneno];
    };

    udb.saveSession = function () {
        users[users.current.phoneno] = users.current;
        Storage.save('users', users);
    };
}(UserDB));


var User = {};
(function (us) {
    us.login = function (phoneno) {
        if (UserDB.has(phoneno)) {
            goHome(phoneno);
        } else {
            alert('Please create an account first');
        }
    };

    function goHome(phoneno) {
        UserDB.setSession(phoneno);
        UserDB.saveSession();
        Router.go('dashboard.html');
    }

    us.register = function (name, phoneno) {
        UserDB.save(name, phoneno);
        goHome(phoneno);
    };

    function update() {
        UserDB.saveSession();
        Router.go('dashboard.html');
    }

    us.recharge = function (price) {
        var user = UserDB.__get();
        Migration.recharge(user, price);
        update();
    };

    us.changePlan = function (tariff) {
        var user =  UserDB.__get();
        user.tariff = tariff;
        update();
    };
}(User));
