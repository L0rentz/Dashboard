jQuery(function () {
    $('#togglePassword').attr('style', 'margin-left: -' + $('#togglePassword').width() * 2 + 'px; margin-top: ' + $('#password').height() + 'px');

    function getFormData($form) {
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        return JSON.stringify(indexed_array);
    }

    var loginCallback = function () {
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: "/user/login",
            dataType: 'json',
            data: getFormData($('#login-form')),
            success: function (json) {
                $('#error').text('');
                Cookies.set('Authorization', 'Bearer ' + json.token)
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

    var oauth2Callback = function() {
        window.location = '/googleoauth2';
    }

    $('.customGPlusSignIn').on("click", oauth2Callback);
    $('#togglePassword').on("click", togglePassword);
    $('#login-form').on("submit", loginCallback);
    $('#signup').on("click", function () {
        window.location = "/signup"
    });

    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('error'))
        $('#error').text(searchParams.get('error'));
})