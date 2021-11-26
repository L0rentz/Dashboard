var grid;
var widgetID = 0;

window.onload = function () {
    var options = {
        acceptWidgets: true,
        minRow: 3,
        disableDrag: true,
        disableResize: true,
    };

    grid = GridStack.init(options);
    GridStack.setupDragIn('#mySidenav .grid-stack-item', { revert: 'invalid', scroll: false, appendTo: 'body', helper: myClone });

    grid.on('dropped', function (event, previousWidget, newWidget) {
        grid.removeWidget(newWidget.el);
        console.log(newWidget);
        grid.addWidget(getNewWidget(), {x: newWidget.x, y: newWidget.y});
    });

    grid.on('dragstart', function (event, el) {
        let $grid = $('.my-grid');
        $grid.addClass("dragging");
    });

    grid.on('dragstop', function (event, el) {
        let $grid = $('.my-grid');
        $grid.removeClass("dragging");
    });

    grid.on('resizestart', function (event, el) {
        let $grid = $('.my-grid');
        $grid.addClass("dragging");
    });

    grid.on('resizestop', function (event, el) {
        let $grid = $('.my-grid');
        $grid.removeClass("dragging");
    });

    function myClone(event) {
        return event.target.cloneNode(true);
    }

}

function getNewWidget() {
    widgetID++;
    return `<div id="W`+ widgetID +`" class="grid-stack-item ui-draggable" gs-w="3" gs-h="3">
                <div class="grid-stack-item-content" draggable="true">
                  <div class="card-row card-header">
                    <div class="title">Widget title</div>
                    <button type="button" class="btn-close" aria-label="Close" onclick="grid.removeWidget(this.parentNode.parentNode.parentNode)"></button>
                  </div>
                  <div class="card-body widget-content">
                    <h5 class="card-title">Widget description</h5>
                    <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Customize your widget
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button class="dropdown-item" type="button">Weather widget</button>
                        <button class="dropdown-item" type="button" onclick="getFormulaOneContent('W`+ widgetID +`')">Formula one widget</button>
                        <button class="dropdown-item" type="button">Something else here</button>
                    </div>
                  </div>
                  </div>
                </div>
            </div>`;
}

function getFormulaOneContent(id) {
    let container = $("#" + id).find('.widget-content');
    let title = $("#" + id).find('.title');
    title.empty();
    title.append("Formula one");
    container.empty();
    container.append(getFormulaWidgetContent(id));
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
}

function toggleNav() {
    let $sidenav = $("#mySidenav");
    if ($sidenav.hasClass("opened")) {
        closeNav();
    } else {
        openNav();
    }
}