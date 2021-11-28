jQuery(function() {
    $('#togglePassword').attr('style', 'transform: translateX(-' + $('#togglePassword').width() + 'px); margin-left: -' + $('#togglePassword').width() + 'px');

    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });

        return JSON.stringify(indexed_array);
    }

    var loginCallback = function() {
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: "/user/login",
            dataType: 'json',
            data: getFormData($('#login-form')),
            success: function(json) {
                Cookies.set('Authorization', 'Bearer ' + json.token),
                window.location = json.route
            },
            error: function(json) {
                alert(json.responseJSON.message);
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

    $('#togglePassword').on("click", togglePassword);
    $('#login-form').on("submit", loginCallback);
})