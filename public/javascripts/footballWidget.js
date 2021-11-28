function appendFootballLeagues(id, json)
{
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    title.empty();
    title.append("Select your league");
    container.empty();
    let $league = $('<select id="league" name="league" class="custom-select"></select>');
    let $year = $('<select id="year" name="year" class="custom-select"></select>');
    for (let i = 0; i < json.data.length; i++) {
        $league.append(`<option value="`+ json.data[i].id +`">`+ json.data[i].name +`</option>`);
    }
    for (let i = new Date().getFullYear(); i > 2001; i--) {
        $year.append(`<option value="`+ i +`">`+ i +`</option>`);
    }
    container.append($year);
    container.append($league);
    container.append(`<button type="button" class="btn btn-outline-dark btn-sm" style="width: 100%" onClick="validateButtonFootball('`+ id + `')">Validate</button>`);
}

function validateButtonFootball(id)
{
    let league = $("#" + id).find('#league');
    let year = $("#" + id).find('#year');
    console.log("league: " + league.val() + "\nyear: " + year.val());
    getFootballDataByLeague(id, league.val(), year.val());
}

function getFootballWidgetContent(id)
{
    getFootballLeagues(id, appendFootballLeagues);
}

function appendLeagueStandings(id, json)
{
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    let data = json.data;
    let standings = data.standings;
    title.empty();
    title.append(data.name);
    container.removeClass('center-box');
    container.empty();
    let $table = $('<table class="table"></table>');
    $table.append(`<thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Logo</th>
                      <th scope="col">Club</th>
                      <th scope="col">Points</th>
                      <th scope="col">Games played</th>
                      <th scope="col">W-T-L</th>
                    </tr>
                </thead>`);
    let $tbody = $('<tbody></tbody>');
    for (let i = 0; i < standings.length; i++) {
        let $row = $(`<tr></tr>`);
        let wins = standings[i].stats[0].displayValue;
        let loses = standings[i].stats[1].displayValue;
        let ties = standings[i].stats[2].displayValue;
        let games = standings[i].stats[3].displayValue;
        $row.append(`<th scope="row">` + (i + 1) + `</th>`);
        if (standings[i].team.logos)
            $row.append(`<td><img src="` + standings[i].team.logos[0].href + `"></img></td>`);
        else
        $row.append(`<td>N/A</td>`);
        $row.append(`<td>`+ standings[i].team.displayName +`</td>`);
        $row.append(`<td>`+ standings[i].stats[6].displayValue +`</td>`);
        $row.append(`<td>`+ games +`</td>`);
        $row.append(`<td>`+ wins + `-` + ties + `-` + loses +`</td>`);
        $tbody.append($row);
    }
    $table.append($tbody);
    container.append($table);
    $('tr[data-href]').on("click", function () {
        document.location = $(this).data('href');
    });
}