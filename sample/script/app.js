var app = angular.module('sample', [ 'ngSanitize', 'adf', 'adf.structures.base',  'LocalStorageModule', 'dzupDash', 'dzupJsonTree', 'dzupUtils']);

app.config(['$dzupConfigUtilsProvider', function($dzupConfigUtilsProvider){
    $dzupConfigUtilsProvider.setTemplateUrlBase('dzup-dashboard', '/src');
    $dzupConfigUtilsProvider.setTemplateUrlBase('dzup-json-tree', '/sample/components/dzup-json-tree');
    
}]);

app.config(['dashboardProvider', '$dzupConfigUtilsProvider', '$dzupDashboardWidgetProvider', function (dashboardProvider, $dzupConfigUtilsProvider, $dzupDashboardWidgetProvider) {

    $dzupDashboardWidgetProvider.setConfigProvider($dzupConfigUtilsProvider);
var dataSources = $dzupDashboardWidgetProvider.getDataSources();
    
    angular.forEach(dataSources, function (value, key) {
        dashboardProvider.widget(key, dataSources[key]);
    });    
}]);



app.controller('navigationCtrl', function($scope, $location){

  /*$scope.navCollapsed = true;

  $scope.toggleNav = function(){
    $scope.navCollapsed = !$scope.navCollapsed;
  };

  $scope.$on('$routeChangeStart', function() {
    $scope.navCollapsed = true;
  });

  $scope.navClass = function(page) {
    var currentRoute = $location.path().substring(1) || 'Sample 01';
    return page === currentRoute || new RegExp(page).test(currentRoute) ? 'active' : '';
  };*/

});