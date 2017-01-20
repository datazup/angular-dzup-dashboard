var dzupDashboard = angular.module('dzupDash');
dzupDashboard.directive('dzupExpressionReport', ['$dzupConfigUtils',  function ($dzupConfigUtils) {

    var directive = {
        restrict: 'E',
        templateUrl: $dzupConfigUtils.templateUrlBase['dzup-dashboard'] +'/templates/reports/report.expression.builder.view.html',
        controller: ['$scope', '$uibModal', function ($scope, $uibModal) {
        }]
    };
             
    return directive;
}]);