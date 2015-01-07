var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '../views/home.html',
            controller: 'MainCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
})