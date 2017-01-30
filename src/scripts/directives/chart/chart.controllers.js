var app = angular.module('dzupDash');

app.controller('DzupGenericChartController', ['$scope', '$timeout', '$dzupConfigUtils', 'config', 'widget',
    function ($scope, $timeout, $dzupConfigUtils, config, widget) {
        $scope.config = config;
        $scope.widget = widget;
    }
]);

app.controller('DzupGenericChartEditController', ['$scope', '$timeout', '$uibModal', '$dzupConfigUtils', 'config', 'widget', '$dzupDashboard', 'chartService', 'dzupDashboardWidgetHelper',
    function ($scope, $timeout, $uibModal, $dzupConfigUtils, config, widget, $dzupDashboard, chartService, dzupDashboardWidgetHelper) {
        $scope.config = config;
        $scope.widget = widget;

        $scope.config.chartDefinitionModel = $scope.config.chartDefinitionModel || {};
        $scope.chartDefinition = {};
        $scope.chartType = null;
        $scope.model = {};

        $scope.injectAxisDdlValues = function(injectValue){
                if (injectValue == true) {
                    $timeout(function () {
                        //the code which needs to run after dom rendering
                        $scope.schema.properties.xAxis.items = $scope.reportColumns;
                        $scope.schema.properties.yAxis.items = $scope.reportColumns;

                    })
                }
        }
        $scope.loadChildModelByChartType = function (chartType) {
            $scope.chartType = chartType;
            if (chartType) {
                var chartDef = null;
                $scope.chartDefinition = chartDef;
            } else {
                $scope.chartDefinition = {};
            }
        };
        $scope.wData = [];
        $scope.reportColumns = [];
        $scope.getReportColumns = function (value, injectValue) {

            var wData = dzupDashboardWidgetHelper.getWidgetData(value);

             dzupDashboardWidgetHelper.getWidgetData(value).then(function(result){
                if(typeof result.data != 'undefined'){
                    $scope.wData = result.data.data[0].list;
                    $scope.reportColumns = _.map(result.data.data[1].columns, function (x) { return { value: x, label: x } });
                    $scope.injectAxisDdlValues(injectValue);
                }
                else{
                    result.then(function(pResult){
                        $scope.wData = pResult.data.data[0].list;
                        $scope.reportColumns = _.map(pResult.data.data[1].columns, function (x) { return { value: x, label: x } });
                        $scope.injectAxisDdlValues(injectValue);
                    });
                }
           });



            // var repCol = _.map(wData.data[1].columns, function (x) { return { value: x, label: x } });
            //1 .$scope.reportColumns = _.map($scope.wData.data[1].columns, function (x) { return { value: x, label: x } });

            //chartService.setAxisData($scope.reportColumns);

            return $scope.reportColumns;
        }

         if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.dataSource != 'undefined') {
            chartService.setAxisData($scope.getReportColumns(config.definitionModel.dataSource, false), $scope);
        }


        $scope.config.definitionModel = $scope.config.definitionModel || {};
        $scope.loadChildModelByChartType($scope.config.definitionModel.chartType);
        $scope.createReport = function () {
            var modalInstance = $uibModal.open({
                templateUrl: $dzupConfigUtils.templateUrlBase['dzup-dashboard'] + '/templates/reports/report.modal.view.html',
                controller: 'ReportCreateEditController',
                resolve: {
                    report: function () {
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

        if (chartService.axisData != null) {
            console.log(chartService.axisData);
        }

        $scope.chartTypes = [];
        $scope.getChartTypes = function (injectValue) {

            $scope.chartTypes = [{ value: '', label: 'Charts' }, { value: 'pieChart', label: 'Pie Chart' }, { value: 'discreteBarChart', label: 'Bar Chart' }, { value: 'lineChart', label: 'Line Chart' }];

            if (injectValue == true) {
                $timeout(function () {
                    //the code which needs to run after dom rendering
                    $scope.schema.properties.chartType.items = $scope.chartTypes;
                })
            }
            return $scope.chartTypes;
        }

        if ($scope.chartTypes.length == 0) {
            $scope.getChartTypes(false);
        }


        if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.dataSource != 'undefined' && typeof $scope.wData != 'undefined') {

            console.log(chartService.axisData);

            $scope.getChartTypes(false);

            $scope.getReportColumns(config.definitionModel.dataSource, false);
        }


        if (config.changesApplied == true && typeof config.definitionModel != 'undefined' && typeof config.definitionModel.dataSource != 'undefined'
            && typeof config.definitionModel.xAxis != 'undefined' && typeof config.definitionModel.xAxis != 'undefined') {

            config.changesApplied = false;

            chartService.setAxisData($scope.reportColumns);
            console.log(chartService.axisData);

            $scope.chart = chartService.getChart(config.definitionModel.chartType);
            var chartOptions = {
                title: config.definitionModel.chartTitle,
                xAxisLabel: config.definitionModel.xAxisLabel,
                yAxisLabel: config.definitionModel.yAxisLabel,
                color: config.definitionModel.chartColor,
            };

            $scope.populatedChart = $scope.chart.processData(config.definitionModel.xAxis, config.definitionModel.yAxis, $scope.wData, $scope.chart, chartOptions);
        }

        $scope.schema = {
            type: 'object',
            properties: {
                chartType: {
                    type: 'string',
                    title: 'Chart Type',
                    format: "uiselect",
                    placeholder: 'Select Chart Type',
                },
                dataSource: {
                    type: 'string',
                    title: 'Data Source',
                    format: "uiselect",
                    placeholder: 'Select Data Source'
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

        chartService.updateChartSchemaProperties('discreteBarChart', $scope.schema.properties);

        $scope.form = [
            {
                type: 'tabs',
                tabs: [
                    {
                        title: 'Chart Selection',
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
                                                key: 'chartType',
                                                options: {
                                                    callback: $scope.chartTypes,
                                                    objectid: 4226,
                                                },
                                                type: 'uiselect',
                                                //feedback: false,
                                            }
                                        ]
                                    },
                                    {
                                        type: "section",
                                        htmlClass: "col-xs-6",
                                        items: [
                                            {
                                                key: 'dataSource',
                                                options: {
                                                    callback: _.map(dzupDashboardWidgetHelper.getWidgetsByType("dataSource"), function (x) { return { value: x.wid, label: x.title } }),
                                                    eventCallback: function (value) {
                                                        if (typeof value != 'undefined') {
                                                            $scope.getReportColumns(value, true);
                                                        }
                                                    }
                                                },
                                                feedback: false,
                                                type: 'uiselect'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Chart Options',
                        items: [
                            {
                                type: "section",
                                htmlClass: "row",
                                items: [
                                    {
                                        type: "section",
                                        htmlClass: "col-xs-12",
                                        condition: "model.chartType=='pieChart'",
                                        items: chartService.getChartOptionsForm("pieChart")
                                    },
                                    {
                                        type: "section",
                                        htmlClass: "col-xs-12",
                                        condition: "model.chartType=='discreteBarChart'",
                                        items: chartService.getChartOptionsForm("discreteBarChart")
                                    },
                                    {
                                        type: "section",
                                        htmlClass: "col-xs-12",
                                        condition: "model.chartType=='lineChart'",
                                        items: chartService.getChartOptionsForm("lineChart")
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    }
]);
