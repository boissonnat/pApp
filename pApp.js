var pApp = angular.module('pApp', ['ngRoute']);

pApp.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'views/home.html'
            }).
            otherwise({
                redirectTo: '/home'
            });

    }]);
