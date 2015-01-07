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
        when('/top40', {
            templateUrl: '../views/top40.html',
            controller: 'Top40Ctrl'
        }).
        otherwise({
            redirectTo: '/'
        });
})