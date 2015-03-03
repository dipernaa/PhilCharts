angular.module('myApp').controller('PhilChartsCtrl', function($scope, $http) {
    $scope.chartList = [
        { name: 'AAA' },
        { name: 'Adult' },
        { name: 'Alternative' },
        { name: 'Christian' },
        { name: 'Country' },
        { name: 'Pop' },
        { name: 'Rhythmic' },
        { name: 'Rock' },
        { name: 'Urban Adult' },
        { name: 'Urban' }
    ];
    $scope.selectedChart = $scope.chartList[0];

    $scope.getChart = function() {
        $http.get('../PhilCharts/' + $scope.selectedChart.name).
            success(function(data, status, headers, config) {
                $scope.songs = data.splice(1, data.length);
            }).
            error(function(data, status, headers, config) {
                alert('error');
            });
    };

    $scope.getChart();
});