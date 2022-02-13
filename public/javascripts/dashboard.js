var grid;
var globalTimer;

const svgRefresh = ``;

let serializedFull;
let serializedData;

function myTimer() {
    refreshDashboard();
}

function setRefreshRate(timer)
{
    clearInterval(globalTimer);
    let $timerSpan = $('#custom-timer');
    $timerSpan.empty();
    $timerSpan.append(`Refresh rate: `+ timer / (60000) +` min.`)
    globalTimer = setInterval(myTimer, timer);
}

function generateUUID() {
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function getClose() {
    return `<svg class="transform-close" xmlns='http://www.w3.org/2000/svg'  width="20" height="20" fill="currentColor" viewBox='0 0 16 16'><path d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/></svg>`
}

function getRefresher() {
    return `<a class="pointer refresher" query="" onclick="console.log('Hahaha');"><svg class="transform" style="flex: 1;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
    <path   fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
    <path  d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
    </svg></a>`
}

function setRefresher($obj, callbackName) {
    $obj.attr("onclick", callbackName);
}

function initGridHandlers() {
    grid.on('dropped', function (event, previousWidget, newWidget) {
        grid.removeWidget(newWidget.el);
        console.log(newWidget);
        grid.addWidget(getNewWidget(), { x: newWidget.x, y: newWidget.y });
        saveFullGrid();
    });

    grid.on('dragstart', function (event, el) {
        let $grid = $('.my-grid');
        $grid.addClass("dragging");
    });

    grid.on('dragstop', function (event, el) {
        let $grid = $('.my-grid');
        $grid.removeClass("dragging");
        saveFullGrid();
    });

    grid.on('resizestart', function (event, el) {
        let $grid = $('.my-grid');
        $grid.addClass("dragging");
    });

    grid.on('resizestop', function (event, el) {
        let $grid = $('.my-grid');
        $grid.removeClass("dragging");
        saveFullGrid();
    });
    $('tr[data-href]').on("click", function () {
        document.location = $(this).data('href');
    });
}

window.onload = function () {
    var options = {
        acceptWidgets: true,
        minRow: 3,
        disableDrag: true,
        disableResize: true,
    };

    function myClone(event) {
        return event.target.cloneNode(true);
    }

    grid = GridStack.init(options);
    GridStack.setupDragIn('#mySidenav .grid-stack-item', { revert: 'invalid', scroll: false, appendTo: 'body', helper: myClone });

    getDashboard(loadFullGrid);

    initGridHandlers();
}

function refreshDashboard() {
    $('.grid-stack').children().each(function () {
        // console.log($(this));
        let $refresher = $(this).find('.refresher');
        $refresher.click();
    });

}

function saveFullGrid() {
    serializedFull = grid.save(true, true);
    serializedData = serializedFull.children;
    let json = JSON.stringify(serializedFull, null, '  ');
    postDashboard(json);
}

function loadFullGrid(json) {
    grid.destroy(true);
    grid = GridStack.addGrid(document.querySelector('.my-grid'), json.dashboard)
    initGridHandlers();
    refreshDashboard();
}

function appendLoading(id) {
    const spinner = `<div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>`;
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    container.addClass('center-box');
    title.empty();
    title.append("Loading...");
    container.empty();
    container.append(spinner);
}

function deleteWidget(id) {
    let widget = $("#" + id).parent().parent();
    console.log(widget);
    grid.removeWidget(widget[0]);
    saveFullGrid();
}

function getNewWidget() {
    let widgetID = generateUUID();
    return `<div class="grid-stack-item ui-draggable" gs-w="3" gs-h="3">
    <div class="grid-stack-item-content" draggable="true">
      <div id="W` + widgetID + `">
        <div class="card-row card-header">
          <div class="title">Widget title</div>
          `+ getRefresher() + `
          <button type="button" style="flex: 1;" class="btn-close" aria-label="Close"
            onclick="deleteWidget('W`+ widgetID +`')"></button>
        </div>
        <div class="card-body widget-content center-box">
          <h5 class="card-title">Widget description</h5>
          <div class="dropdown">
            <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              Customize your widget
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button class="dropdown-item" type="button" onclick="getWeatherContent('W`+ widgetID + `')">Weather
                widget</button>
              <button class="dropdown-item" type="button" onclick="getFormulaOneDriversContent('W`+ widgetID + `')">Formula one drivers
                widget</button>
              <button class="dropdown-item" type="button" onclick="getFormulaOneConstructorsContent('W`+ widgetID + `')">Formula one constructors
                widget</button>
              <button class="dropdown-item" type="button" onclick="getFootballContent('W`+ widgetID + `')">Football
                widget</button>
              <button class="dropdown-item" type="button" onclick="getNorrisContent('W`+ widgetID + `')">Chuck Norris
                widget</button>
              <button class="dropdown-item" type="button" onclick="getTimeZoneContent('W`+ widgetID + `')">Time zone
                widget</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function getFormulaOneDriversContent(id) {
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    title.empty();
    title.append("Formula one Drivers");
    container.empty();
    container.append(getFormulaWidgetContent(id, "driverStandings"));
    saveFullGrid();
}


function getFormulaOneConstructorsContent(id)
{
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    title.empty();
    title.append("Formula one Constructors");
    container.empty();
    container.append(getFormulaWidgetContent(id, "constructors"));
    saveFullGrid();
}

function getWeatherContent(id) {
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    title.empty();
    title.append("Weather");
    container.empty();
    container.append(getWeatherWidgetContent(id));
    saveFullGrid();
}

function getTimeZoneContent(id) {
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    title.empty();
    title.append("Time zone");
    container.empty();
    container.append(getTimeZoneWidgetContent(id));
    saveFullGrid();
}

function getFootballContent(id) {
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    title.empty();
    title.append("Football");
    container.empty();
    container.append(getFootballWidgetContent(id));
    saveFullGrid();
}

function getNorrisContent(id) {
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    title.empty();
    title.append("Chuck Norris jokes");
    container.empty();
    container.append(getNorrisWidgetContent(id));
    saveFullGrid();
}

function openNav() {
    document.getElementById("mySidenav").style.left = "0px";
    $("#mySidenav").addClass("opened");
    $(".my-grid").addClass("edit");
    $('.btn-close').removeClass("disabled");
    document.getElementById("main").style.marginLeft = "250px";
    grid.enableMove(true);
    grid.enableResize(true);
}

function closeNav() {
    document.getElementById("mySidenav").style.left = "-250px";
    $("#mySidenav").removeClass("opened");
    $('.btn-close').addClass("disabled");
    $(".my-grid").removeClass("edit");
    document.getElementById("main").style.marginLeft = "0";
    grid.enableMove(false);
    grid.enableResize(false);
    saveFullGrid();
}

function toggleNav() {
    let $sidenav = $("#mySidenav");
    if ($sidenav.hasClass("opened")) {
        closeNav();
    } else {
        openNav();
    }
}

function logout() {
    Cookies.remove('Authorization'),
        Cookies.remove('access_token'),
        window.location = '/login';
}