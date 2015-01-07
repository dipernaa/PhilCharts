var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '../views/home.html',
            controller: 'MainCtrl'
        }).
        when('/hot100', {
            templateUrl: '../views/hot100.html',
            controller: 'Hot100Ctrl'
        }).
        otherwise({
            redirectTo: '/'
        });
})