var UserDB = {};
(function (udb) {
    var users = Storage.load('users');
    udb.load = function (phoneno) {
        return users[phoneno];
    };

    udb.has = function (phoneno) {
        return !!users[phoneno];
    };

    udb.save = function (name, phoneno) {
        users[phoneno] = {name: name, phoneno:phoneno};
        Storage.save('users', users);
    };

    udb.setSession = function (phoneno) {
        users.current = users[phoneno];
    };

    udb.saveSession = function () {
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
}(User));
