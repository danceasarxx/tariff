var Router = {};
(function (rt) {
    rt.go = function (file) {
        location.href = file;
    };
}(Router));


var Storage = {};
(function (st) {
    st.save = function (key, obj) {
        if (obj != null) {
            localStorage.setItem(key, JSON.stringify(obj));
        }
    };

    st.load = function (key, def) {
        def = def || '{}';
        var item = localStorage.getItem(key);
        return  JSON.parse(item === 'undefined' || !item ? def : item);
    };

    st.has = function (key) {
        var item = localStorage.getItem(key);
        return item !== 'undefined' && item != null;
    };
}(Storage));
