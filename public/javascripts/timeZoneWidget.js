var intervals = new Array();

function getTimeZoneWidgetContent(id) {
    return `<select id="time-zone" name="time-zone" class="custom-select">
    <option value="Europe/Paris">Paris (Europe)</option>
    <option value="Europe/London">London (Europe)</option>
    <option value="Europe/Moscow">Moscow (Europe)</option>
    <option value="Asia/Dubai">Dubai (Asia)</option>
    <option value="Asia/Singapore">Singapore (Asia)</option>
    <option value="Asia/Tokyo">Tokyo (Asia)</option>
    <option value="Australia/Sydney">Sydney (Australia)</option>
    <option value="America/New_York">New York (America)</option>
    <option value="America/Los_Angeles">Los Angeles (America)</option>
    </select>
    <button type="button" class="btn btn-outline-dark btn-sm" style="width: 100%" onClick="validateButtonTimeZone('`+ id + `')">Validate</button>`;
}

function splitMulti(str, tokens){
    var tempChar = tokens[0];
    for(var i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
}

function validateButtonTimeZone(id) {
    let zone = $("#" + id).find('#time-zone');
    console.log("zone: " + zone.val());
    getTimeZoneData(id, zone.val());
}

function update(id, date) {
    let $hOut = $("#" + id + "hours");
    let $mOut = $("#" + id + "minutes");
    let $sOut = $("#" + id + "seconds");
    let $ampmOut = $("#" + id + "ampm");
    var ampm = date.getHours() < 12
               ? 'AM'
               : 'PM';

    var hours = date.getHours() == 0
                ? 12
                : date.getHours() > 12
                  ? date.getHours() - 12
                  : date.getHours();

    var minutes = date.getMinutes() < 10
                  ? '0' + date.getMinutes()
                  : date.getMinutes();

    var seconds = date.getSeconds() < 10
                  ? '0' + date.getSeconds()
                  : date.getSeconds();

    date.setSeconds(date.getSeconds() + 1);

    $hOut.text(hours);
    $mOut.text(minutes);
    $sOut.text(seconds);
    $ampmOut.text(ampm);
}

function appendTimeZone(id, json) {
    const myDate = splitMulti(json.datetime, "T.");
    var date = new Date(myDate[0] + " " + myDate[1]);
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    title.empty();
    title.append("Time in " + json.timezone + " (" + json.utc_offset + ")");
    container.empty();
    container.removeClass('center-box');
    container.append(`<div id="`+ id +`clock" class="clock-custom">
    <p class="unit" id="`+ id +`hours"></p>
    <p class="unit" id="`+ id +`minutes"></p>
    <p class="unit" id="`+ id +`seconds"></p>
    <p class="unit" id="`+ id +`ampm"></p>
    </div>`);
    intervals.push({"id": id,
                    "interval": window.setInterval(update.bind(null, id, date), 1000)});
}