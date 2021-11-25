var grid;
window.onload = function () {
    var options = {
        acceptWidgets: true,
        minRow: 1
    };

    var items = [
        { content: 'my first widget' }, // will default to location (0,0) and 1x1
        { w: 2, content: 'another longer widget!' } // will be placed next at (1,0) and 2x1
    ];

    var grid = GridStack.init(options);
    grid.load(items);
    GridStack.setupDragIn('#mySidenav .grid-stack-item', { revert: 'invalid', scroll: false, appendTo: 'body', helper: myClone });

    grid.on('dropped', function(event, previousWidget, newWidget) {
        console.log('Removed widget that was dragged out of grid:', previousWidget);
        console.log('Added widget in dropped grid:', newWidget);
    });

    grid.on('dragstart', function(event, el) {
        let $grid = $('.my-grid');
        $grid.addClass("dragging");
    });

    grid.on('dragstop', function(event, el) {
        let $grid = $('.my-grid');
        $grid.removeClass("dragging");
    });

    grid.on('resizestart', function(event, el) {
        let $grid = $('.my-grid');
        $grid.addClass("dragging");
    });

    grid.on('resizestop', function(event, el) {
        let $grid = $('.my-grid');
        $grid.removeClass("dragging");
    });

    function myClone(event) {
        return event.target.cloneNode(true);
      }

}

function openNav()
{
    // document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mySidenav").style.left = "0px";
    $("#mySidenav").addClass("opened");
    $(".my-grid").addClass("edit");
    document.getElementById("main").style.marginLeft = "250px";
    grid.enableMove(true);
    grid.enableResize(true);
}

function closeNav()
{
    document.getElementById("mySidenav").style.left = "-250px";
    $("#mySidenav").removeClass("opened");
    $(".my-grid").removeClass("edit");
    document.getElementById("main").style.marginLeft = "0";
    grid.enableMove(false);
    grid.enableResize(false);
}

function toggleNav()
{
    let $sidenav = $("#mySidenav");
    if ($sidenav.hasClass("opened")) {
        closeNav();
    } else {
        openNav();
    }
}