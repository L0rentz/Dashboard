function getWeatherWidgetContent(id)
{
    return `<label for="city`+ id +`">City</label>
            <input type="text" class="form-control" id="city`+ id +`" placeholder="Mexico" required>
            <button type="button" class="btn btn-outline-dark btn-sm" style="width: 100%" onClick="validateButtonWeather('`+ id + `')">Validate</button>`;
}

function validateButtonWeather(id)
{
    getWeatherData(id, $('#city' + id).val());
}

function appendWeather(id, json) {
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    title.empty();
    title.append("Weather in " + json.name);
    container.empty();
    let $temp = $(`<h1 style="padding-top: 40px;" class="temperature">` + json.main.temp_max + `°</h1>`);
    let $prolapse = $(`<h3 class="mood">`+ json.weather[0].description +`</h3>`);
    let $logo = $(`<div id="icon">
                    <img style="width: 100px;" id="wicon" src="http://openweathermap.org/img/wn/` + json.weather[0].icon + `.png" alt="Weather icon">
                </div>`);
    container.append($logo);
    container.append($prolapse);
    container.append($temp);
}