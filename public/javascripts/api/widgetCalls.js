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
            console.log(json);
        }
    });
}