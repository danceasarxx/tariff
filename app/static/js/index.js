function main() {
    $('#login_form').submit(function (evt) {
        evt.preventDefault();
        var phoneno = $('#login_phoneno');
        User.login(phoneno.val());
    });

    $('#registeration_form').submit(function (evt) {
        evt.preventDefault();
        var phoneno = $('#register_phoneno');
        var name = $('#register_name');
        User.register(name.val(), phoneno.val());
    });
}

$(document).ready(main);
