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
               var template  = ' <adf-dashboard name="{{dashboard.key}}" structure="{{dashboard.model.structure}}" categories="true" adf-model="dashboard.model" />';

               var compiled = $compile(template)(scope);
               element.replaceWith(compiled);
         }
     }
}
]);
