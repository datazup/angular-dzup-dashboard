var app = angular.module('dzupDash');

app.controller('ReportCreateEditController', ['$scope', '$timeout', '$uibModalInstance', '$dzupConfigUtils', 'report',
    function ($scope, $timeout, $uibModalInstance, $dzupConfigUtils, report) {

        $scope.report = report;
        
  /*      $scope.schema = {
            type: 'object',
            properties: {
                reportSource: {
                    type: 'string',
                    title: 'Report Source',
                    description: 'Source of the report'
                },
                name: {
                    type: 'string',
                    title: 'Name',
                    description: 'Name of the report'
                },
                description:{
                    type: 'string',
                    title: 'Description',
                    description: 'Description of the report'
                }
            }
        };
        */
        $scope.form = [];

        $scope.infoConfig = {
            showSchemaInfo: true,
            isReadOnly: false,
            inputSchemaInfo: {
                properties: {},
                type: 'object'
            }
        };

        $scope.ok = function () {
            $uibModalInstance.close({
                value: 'evo ga'
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
]);
