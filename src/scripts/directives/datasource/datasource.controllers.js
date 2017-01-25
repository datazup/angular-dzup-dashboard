var app = angular.module('dzupDash');

app.controller('DzupGenericDataSourceController', ['$scope', '$timeout', '$dzupConfigUtils', 'config', 'widget',
    function ($scope, $timeout, $dzupConfigUtils, config, widget) {
        $scope.config = config;
        $scope.widget = widget;
    }
]);


app.controller('DzupGenericDataSourceEditController', ['$scope', '$timeout', '$uibModal', '$dzupConfigUtils', 'config', 'widget', 'dzupDashboardWidgetHelper','$dzupDashboard',
    function ($scope, $timeout, $uibModal, $dzupConfigUtils, config, widget, dzupDashboardWidgetHelper, $dzupDashboard) {
        $scope.config = config;
        $scope.widget = widget;

        $scope.config.chartDefinitionModel = $scope.config.chartDefinitionModel || {};
        $scope.chartDefinition = {};
        $scope.chartType = null;


        $scope.loadChildModelByChartType = function (chartType) {
            $scope.chartType = chartType;
            if (chartType) {
                var chartDef = null; 
                $scope.chartDefinition = chartDef;
            } else {
                $scope.chartDefinition = {};
            }
        };

        $scope.config.definitionModel = $scope.config.definitionModel || {};

        $scope.loadChildModelByChartType($scope.config.definitionModel.chartType);

        $scope.createReport = function () {
            var modalInstance = $uibModal.open({
                templateUrl: $dzupConfigUtils.templateUrlBase['dzup-dashboard'] + '/templates/reports/report.modal.view.html',
                controller: 'ReportCreateEditController',
                resolve: {
                    report: function(){
                        return {};
                    }  
                },
                size: 'lg'
            });

            modalInstance.result.then(function (importedData) {
                if (importedData) {
                    $scope.innerModel.properties = importedData;
                }
            }, function () {
            });
        };


        $scope.AvailableSources = $dzupDashboard.getSources().success(function (result) {
              return result;}).then(function(result){
              return _.map(result.data, function(x){ return { value:x, label:x } });});

        $scope.AvailableReports = [];
        $scope.$on('getReportsEvent', function(ev, args){
            $dzupDashboard.getReportsBySource(args.value).success(function (result) { return result;})
            .then(function(result){
                $scope.AvailableReports = _.map(result.data, function(x){ return { value:x, label:x } });
                $timeout(function(){
                    //the code which needs to run after dom rendering
                    $scope.schema.properties.report.items = $scope.AvailableReports;
                })
            });
        });

        $scope.schema = {
            type: 'object',
            properties: {
                reportSource: {
                    type: 'string',
                    title: 'Report Source',
                    description: 'Report source defines stream data from which we want report to build',
                    format: "uiselect",
                    placeholder: 'Select report source'
                },
                report: {
                    type: 'string',
                    title: 'Report',
                    format: "uiselect",
                    placeholder: 'Select Report',
                    description: 'Existing report that will be data source for the charts'
                },
                totalMetric: {
                    type: 'string',
                    title: 'Total Metric',
                    description: 'Source metric used to prepare Total and Filtered values'
                },
                isDateRangeFilterEnabled: {
                    type: 'boolean',
                    title: 'Is DateRange Filter enabled',
                    description: 'Use this to enable/disable showing/filtering by date range'
                },
                dateRangeFilterType: {
                    type: 'string',
                    title: 'Date Rage Filter Type',
                    enum: ['FIELDS', 'DATEFIELD']
                },
                dateRangeFilterField: {
                    type: 'string',
                    title: 'Date Range Filter Field'
                },
                dateRangeFieldsMap: {
                    title: 'Date Range Filter Fields',
                    type: 'object',
                    properties: {
                        year: {
                            type: 'string',
                            title: 'YEAR'
                        },
                        month: {
                            type: 'string',
                            title: 'MONTH'
                        },
                        day: {
                            type: 'string',
                            title: 'DAY'
                        },
                        hour: {
                            type: 'string',
                            title: 'HOUR'
                        }
                    }
                },
                filterFields: {
                    type: 'array',
                    title: 'Filter Fields',
                    description: 'Use this to define fields that will be shown on report to filter the data',
                    items: {
                        type: 'string',
                        title: 'Field'
                    }
                }
            }
        };
        $scope.form = [
            {
                type: 'tabs',
                tabs: [
                    {
                        title: 'Report',
                        items: [
                            {
                                type: 'section',
                                htmlClass: "row",
                                items: [
                                    {
                                        type: "section",
                                        htmlClass: "col-xs-6",
                                        items: [
                                            {
                                                key: 'reportSource',
                                                type: 'uiselect',
                                                options: {
                                                        callback:$scope.AvailableSources,
                                                        eventCallback: function(value){
                                                                    $scope.$broadcast('getReportsEvent', {value:value});
                                                                  },
                                                        objectid: 4226
                                                   }
                                            },
                                        ]
                                    },
                                    {
                                        type: "section",
                                        htmlClass: "col-xs-6",
                                        items: [
                                            {
                                                key: 'report',
                                                options: {
                                                    callback: $scope.AvailableReports
                                                },
                                                feedback: false,
                                                type: 'uiselect'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'section',
                                htmlClass: 'row',
                                items: [
                                    {
                                        type: "section",
                                        htmlClass: "col-xs-12",
                                        items: [
                                            {
                                                type: 'button',
                                                title: 'Create Report',
                                                onClick: "createReport()",
                                                feedback: false
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Date Range Filters',
                        items: [
                            {
                                type: 'section',
                                htmlClass: 'row',
                                items: [
                                    {
                                        type: 'section',
                                        htmlClass: 'col-xs-12',
                                        items: [
                                            {
                                                key: 'isDateRangeFilterEnabled',
                                                type: 'checkbox'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'section',
                                htmlClass: 'row',
                                items: [
                                    {
                                        type: 'section',
                                        htmlClass: 'col-xs-6',
                                        items: [
                                            {
                                                key: 'dateRangeFilterType',
                                                condition: 'model.isDateRangeFilterEnabled'
                                            }
                                        ]
                                    },
                                    {
                                        type: 'section',
                                        htmlClass: 'col-xs-6',
                                        items: [
                                            {
                                                key: 'dateRangeFieldsMap',
                                                condition: "model.isDateRangeFilterEnabled && model.dateRangeFilterType=='FIELDS'"
                                            },
                                            {
                                                key: 'dateRangeFilterField',
                                                condition: "model.isDateRangeFilterEnabled && model.dateRangeFilterType=='DATEFIELD'"
                                            }
                                        ]
                                    }
                                ]
                            }

                        ]
                    },
                    {
                        title: 'Field Filters',
                        items: [
                            {
                                type: 'section',
                                htmlClass: 'row',
                                items: [
                                    {
                                        type: 'section',
                                        htmlClass: 'col-xs-12',
                                        items: ['filterFields']
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        if(config.changesApplied == true)
        {
            dzupDashboardWidgetHelper.addDashboardWidget(widget);
        }

    }
]);
