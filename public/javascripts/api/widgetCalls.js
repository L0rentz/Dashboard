function getFormulaData(id, year, category)
{
    $.ajax({
        type: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        contentType: 'application/json',
        url: `http://ergast.com/api/f1/` + year + `/` + category + `.json?limit=100`,
        beforeSend: function () {
            console.log("Loading...");
            appendLoading(id);
            //SPINNER
        },
        success: function (json) {
            if (category == "drivers")
                appendDriversList(id, json)
            if (category == "constructors")
                appendConstructorList(id, json);
            console.log(json);
        },
        error: function (json) {
            alert("error !");
            getFormulaOneContent(id);
            console.log(json);
        }
    });
}

function getWeatherData(id, city)
{
    $.ajax({
        type: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        contentType: 'application/json',
        url: `http://api.openweathermap.org/data/2.5/weather?q=`+ city +`&appid=340f1a6e39289f55aa04f1a4a6724f33&units=metric`,
        beforeSend: function () {
            console.log("Loading...");
            appendLoading(id);
            //SPINNER
        },
        success: function (json) {
            appendWeather(id, json);
            console.log(json);
        },
        error: function (json) {
            alert("error !");
            getWeatherContent(id);
            console.log(json);
        }
    });
}