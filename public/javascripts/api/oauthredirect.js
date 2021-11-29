/*$.ajax({
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
});*/



let searchParams = new URLSearchParams(window.location.search);
if (searchParams.has('code'))
    console.log(searchParams.get('code'));