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
    <option value="drivers">All Drivers</option>
    <option value="constructors">All Constructors</option>
    </select>`;
}

function appendDriversList(id, json) {
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    let driverTable = json.MRData.DriverTable;
    let drivers = driverTable.Drivers;
    title.empty();
    title.append("All the F1 Drivers from " + driverTable.season);
    container.removeClass('center-box');
    container.empty();
    let $table = $('<table class="table table-hover"></table>');
    $table.append(`<thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Nationality</th>
                      <th scope="col">Number</th>
                      <th scope="col">Date of birth</th>
                    </tr>
                </thead>`);
    let $tbody = $('<tbody></tbody>');
    for (let i = 0; i < drivers.length; i++) {
        let $row = $(`<tr class="pointer" data-href="` + drivers[i].url + `"></tr>`);
        let nb = drivers[i].permanentNumber == undefined ? "N/A" : drivers[i].permanentNumber;
        $row.append(`<th scope="row">` + (i + 1) + `</th>`);
        $row.append(`<td>` + drivers[i].givenName + `</td>`);
        $row.append(`<td>` + drivers[i].familyName + `</td>`);
        $row.append(`<td>` + drivers[i].nationality + `</td>`);
        $row.append(`<td>` + nb + `</td>`);
        $row.append(`<td>` + drivers[i].dateOfBirth + `</td>`);
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