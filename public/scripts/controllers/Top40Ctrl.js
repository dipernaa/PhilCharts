angular.module('myApp').controller('Top40Ctrl', function($scope, $http) {
    $http.get('../getTop40').
        success(function(data, status, headers, config) {
            $scope.songs = data;
        }).
        error(function(data, status, headers, config) {
            alert('error');
        });
})