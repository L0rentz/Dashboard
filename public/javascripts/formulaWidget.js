function getFormulaWidgetContent(id, category) {
    return `
    `+ generateDropDownYears() + `
    <button type="button" class="btn btn-outline-dark btn-sm" style="width: 100%" onClick="validateButtonFormula('`+ id + `', '`+ category +`')">Validate</button>`;
}

function validateButtonFormula(id, category)
{
    let year = $("#" + id).find('#year');
    console.log("year: " + year.val());
    getFormulaData(id, year.val(), category);
}

function generateDropDownCategory() {
    return `<select id="category" name="category" class="custom-select">
    <option value="driverStandings">All Drivers</option>
    <option value="constructors">All Constructors</option>
    </select>`;
}

function appendDriversList(id, json) {
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    let standingsTable = json.MRData.StandingsTable;
    let driversList = standingsTable.StandingsLists[0].DriverStandings;
    title.empty();
    title.append("F1 Drivers championship from " + standingsTable.season + " (" + standingsTable.StandingsLists[0].round +" races)");
    container.removeClass('center-box');
    container.empty();
    let $table = $('<table class="table table-hover"></table>');
    $table.append(`<thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Points</th>
                      <th scope="col">Constructor</th>
                      <th scope="col">Nationality</th>
                      <th scope="col">Number</th>
                      <th scope="col">Date of birth</th>
                    </tr>
                </thead>`);
    let $tbody = $('<tbody></tbody>');
    for (let i = 0; i < driversList.length; i++) {
        let $row = $(`<tr class="pointer" data-href="` + driversList[i].Driver.url + `"></tr>`);
        let nb = driversList[i].Driver.permanentNumber == undefined ? "N/A" : driversList[i].Driver.permanentNumber;
        $row.append(`<th scope="row">` + (i + 1) + `</th>`);
        $row.append(`<td>` + driversList[i].Driver.givenName + `</td>`);
        $row.append(`<td>` + driversList[i].Driver.familyName + `</td>`);
        $row.append(`<td>` + driversList[i].points + `</td>`);
        $row.append(`<td>` + driversList[i].Constructors[0].name + `</td>`);
        $row.append(`<td>` + driversList[i].Driver.nationality + `</td>`);
        $row.append(`<td>` + nb + `</td>`);
        $row.append(`<td>` + driversList[i].Driver.dateOfBirth + `</td>`);
        $tbody.append($row);
    }
    $table.append($tbody);
    container.append($table);
    $('tr[data-href]').on("click", function () {
        document.location = $(this).data('href');
    });
}

function appendConstructorList(id, json) {
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    let contructorTable = json.MRData.ConstructorTable;
    let constructors = contructorTable.Constructors;
    title.empty();
    title.append("All constructors from " + contructorTable.season);
    container.removeClass('center-box');
    container.empty();
    let $table = $('<table class="table table-hover"></table>');
    $table.append(`<thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Nationality</th>
                    </tr>
                </thead>`);
    let $tbody = $('<tbody></tbody>');
    for (let i = 0; i < constructors.length; i++) {
        let $row = $(`<tr class="pointer" data-href="` + constructors[i].url + `"></tr>`);
        $row.append(`<th scope="row">` + (i + 1) + `</th>`);
        $row.append(`<td>` + constructors[i].name + `</td>`);
        $row.append(`<td>` + constructors[i].nationality + `</td>`);
        $tbody.append($row);
    }
    $table.append($tbody);
    container.append($table);
    $('tr[data-href]').on("click", function () {
        document.location = $(this).data('href');
    });
}

function generateDropDownYears() {
    let $container = $('<div></div>');
    let $select = $('<select id="year" name="year" class="custom-select"></select>');
    $container.append($select);
    for (let i = new Date().getFullYear(); i > 1949; i--) {
        $select.append(`<option value="`+ i +`">`+ i +`</option>`);
    }
    return ($container.html());
}