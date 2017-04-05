var app = angular.module('dzupDash');

app.controller('PublicDashboardConfigurationController', ['$scope', '$timeout', '$uibModalInstance', '$dzupConfigUtils','$dzupDashboard','dashboard',
    function ($scope, $timeout, $uibModalInstance, $dzupConfigUtils, $dzupDashboard, dashboard) {
        $scope.title = "Public Dashboard Configuration";
        $scope.dashboard = dashboard;
        $scope.getAvailableStreams = function (item, injectValue) {
            var value = item.value.toLowerCase();

            var execCall = null;
            if (value === 'scheduled') {
                execCall = $dzupDashboard.getScheduledStreams;
            }
            else {
                execCall = $dzupDashboard.getRegularStreams;
            }

            execCall().success(function (result) {
                return result;
            })
                .then(function (result) {

                    $scope.AvailableStreams = _.map(result.data.list, function (x) {
                        return {value: x.streamId, label: x.keyword, streamType: x.type}
                    });

                    $timeout(function () {
                        if (!$scope.$$phase) $scope.$apply();

                        $("#publicAvailableStreams").selectpicker("refresh");
                    });

                });
        };

        $scope.StreamTypes = $dzupDashboard.getStreamTypes();

        $scope.close = function () {
            $uibModalInstance.close({
                value: $scope.dashboard.availableStreams
            });
        };
    }
]);
