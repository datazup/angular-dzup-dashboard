var dzupDashboard = angular.module('dzupDash');

dzupDashboard.provider('$dzupDashboard', function () {
    var shouldUseOnlyCustomWidgets = false;
   
    return {
        
        $get: function () {
            return {
                shouldUseOnlyCustomWidgets: shouldUseOnlyCustomWidgets
            };
        }
    }
});