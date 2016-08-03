var Routing = {};
(function (rt) {
    rt.go = function (file) {
        location.href = 'static/' + file
    }
}(Routing))

var Storage = {};
(function (st) {
    st.save = function (key, obj) {
        if (obj != null) {
            localStorage.setItem(key, JSON.stringify(obj))
        }
    }

    st.load = function (key, def) {
        def = def || '{}'
        var item = localStorage.getItem(key)
        return  JSON.parse(item === 'undefined' || !item ? def : item)
    }

    st.has = function (key) {
        var item = localStorage.getItem(key)
        return item !== 'undefined' && item != null
    }
}(Storage))

var UserDB = {};
(function (udb) {
    var users = Storage.load('users')
    udb.load = function (phoneno) {
        return users[phoneno]
    }

    udb.setSession = function (phoneno) {
        users.current = users[phoneno]
    }

    udb.saveSession = function () {
        Storage.save('users', users)
    }
}(UserDB))

var User = {};
(function (us) {
    us.login = function (phoneno) {
        user = UserDB.load(phoneno)
        // TODO ensure exists
        UserDB.setSession(phoneno)
        UserDB.saveSession()
        Router.go('dashboard.html')
    }
}(User))

// Login Module
(function () {
    $('#login-btn').click(function (evt) {
        var phoneno = $('.login-form #phoneno')
        console.log(phoneno)
    })
}())
