jQuery(function () {
    $('#togglePassword').attr('style', 'margin-left: -' + $('#togglePassword').width() * 2 + 'px; margin-top: ' + $('#password').height() + 'px');
    $('#toggleRepeatPassword').attr('style', 'margin-left: -' + $('#togglePassword').width() * 2 + 'px; margin-top: ' + $('#password').height() + 'px');

    function getFormData($form) {
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        return JSON.stringify(indexed_array);
    }

    var signUpCallback = function () {
        var password = $('#password').val();
        var repeatpassword = $('#repeatpassword').val();
        if (password != repeatpassword) {
            $('#error').text("Passwords must match.");
            return;
        }

        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: "/user/signup",
            dataType: 'json',
            data: getFormData($('#signup-form')),
            success: function (json) {
                $('#error').text('');
                window.location = json.route
            },
            error: function (json) {
                $('#error').text(json.responseJSON.message);
            }
        });
    }

    var togglePassword = function () {
        var x = $('#password')[0];
        if (x.type === "password") {
            x.type = "text";
            $('#togglePassword').removeClass("fa-eye-slash");
            $('#togglePassword').addClass("fa-eye");
        } else {
            x.type = "password";
            $('#togglePassword').removeClass("fa-eye");
            $('#togglePassword').addClass("fa-eye-slash");
        }
    }

    var toggleRepeatPassword = function () {
        var x = $('#repeatpassword')[0];
        if (x.type === "password") {
            x.type = "text";
            $('#toggleRepeatPassword').removeClass("fa-eye-slash");
            $('#toggleRepeatPassword').addClass("fa-eye");
        } else {
            x.type = "password";
            $('#toggleRepeatPassword').removeClass("fa-eye");
            $('#toggleRepeatPassword').addClass("fa-eye-slash");
        }
    }

    $('#togglePassword').on("click", togglePassword);
    $('#toggleRepeatPassword').on("click", toggleRepeatPassword);
    $('#signup-form').on("submit", signUpCallback);
    $('#back').on("click", function () {
        window.location = "/login"
    });
})