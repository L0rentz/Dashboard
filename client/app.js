var App = {};

window.onload = function() {
    console.log("anal sex");

    var Router = function(name, routes) {
        return ({
            name: name,
            routes: routes
        })
    }

    var myRouter = new Router("myRoute", [
        {
            path: '/',
            name: 'Home'
        },
        {
            path: '/dashboard',
            name: 'Dashboard'
        }
    ]);

    var currentPath = window.location.pathname;

    if (currentPath === '/') {
        
    }

}