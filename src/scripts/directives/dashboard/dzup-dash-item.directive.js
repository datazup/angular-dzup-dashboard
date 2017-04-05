var dzupDashboard = angular.module('dzupDash');

dzupDashboard.directive('dzupDashboardItem', ['$dzupDashboard', '$dzupConfigUtils', 'dzupDashboardWidgetHelper', '$compile',
function ($dzupDashboard, $dzupConfigUtils, dzupDashboardWidgetHelper, $compile) {

    return {
        restrict: "E",
        scope: {
            dashboard:'='
        },
        template:'',
        link: function (scope, element, attrs) {
               var template  = '<adf-dashboard name="{{dashboard.key}}" structure="{{dashboard.model.structure}}" categories="true" adf-model="dashboard.model" enableConfirmDelete="true" />';

               var compiled = $compile(template)(scope);
               element.replaceWith(compiled);
        }
     }
}
]);

dzupDashboard.directive('dzupDashboardSingle', ['$dzupDashboard', '$dzupConfigUtils', 'dzupDashboardWidgetHelper', '$compile',
function ($dzupDashboard, $dzupConfigUtils, dzupDashboardWidgetHelper, $compile) {

    return {
        restrict: "E",
        scope: {
            dashboardId:'='
        },
        template: '',
        link: function (scope, element, attrs) {

            $dzupDashboard.getPublicDashboard(scope.dashboardId).success(function (result) {

                if(result.length > 0){
                     scope.dashboard = { model:result[0].dashboard, fromPublic:true };
                      dzupDashboardWidgetHelper.setDashboardWidgets(0, scope.dashboard);
                      dzupDashboardWidgetHelper.setPublicConf(scope.dashboardId, result[0].availableStreams);
                      var template  = '<adf-dashboard name="{{dashboard.key}}" editable="false" structure="{{dashboard.model.structure}}" categories="true" adf-model="dashboard.model" enableConfirmDelete="true" />';

                     var compiled = $compile(template)(scope);
                     element.replaceWith(compiled);
                }
           });

        }
     }
}
]);
