angular.module('myApp').controller('Hot100Ctrl', function($scope, $http) {
    $http.get('../Hot100').
        success(function(data, status, headers, config) {
            $scope.songs = data;
        }).
        error(function(data, status, headers, config) {
            alert('error');
        });
});