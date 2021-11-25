jQuery(function() {
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
                window.location = json.route;
            },
            error: function(json) {
                alert(json.responseJSON.message);
            }
        });
    }

    $('#login-form').on("submit", loginCallback)
})