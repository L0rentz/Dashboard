function postDashboard(jsonGrid) {
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        url: "/user/dashboard/save",
        dataType: 'json',
        data: jsonGrid,
        success: function (json) {
            console.log("grid saved!")
        },
        error: function (json) {
            console.log("Error:\n" + json);
        }
    });
}

function getDashboard(callback) {
    $.ajax({
        type: "GET",
        contentType: 'application/json',
        url: "/user/dashboard/load",
        dataType: 'json',
        success: function (json) {
            if (json.dashboard != null) {
                console.log("grid loaded!")
                callback();
            } else console.log("No grid saved");
        },
        error: function (json) {
            console.log("Error:\n" + json);
        }
    });
}