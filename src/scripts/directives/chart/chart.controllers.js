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
            $scope.wData = wData;
            // var repCol = _.map(wData.data[1].columns, function (x) { return { value: x, label: x } });
            $scope.reportColumns = _.map(wData.data[1].columns, function (x) { return { value: x, label: x } });

            //chartService.setAxisData($scope.reportColumns);

            if (injectValue == true) {
                $timeout(function () {
                    //the code which needs to run after dom rendering
                    $scope.schema.properties.xAxis.items = $scope.reportColumns;
                    $scope.schema.properties.yAxis.items = $scope.reportColumns;

                })
            }

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

            //$scope.wData = dzupDashboardWidgetHelper.getWidgetData(config.definitionModel.dataSource);

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

            

            $scope.populatedChart = $scope.chart.processData(config.definitionModel.xAxis, config.definitionModel.yAxis, $scope.wData.data[0].list, $scope.chart, chartOptions);



            /*$dzupDashboard.getReport("twitter_stream", "41a864f1-3e57-4912-8f93-69dd40067a9a","hourlyCount").success(function (result) {
                 console.log(result)
                 $scope.pieChartTypeHour = chartService.getChart('pieChart');
                 var hourChartOptions= {title: "Tweets count by hour"};
                 $scope.hourlyCountReportDataByHour =  $scope.pieChartTypeHour.processData("HOURcreated_at", "COUNTcreated_at", result.list, $scope.pieChartTypeHour, hourChartOptions);
 
                 $scope.chart = chartService.getChart(config.definitionModel.chartType, $scope);
                 //var hourChartOptions = { title: "Tweets count by hour" };
                 var chartOptions = { title: config.definitionModel.chartTitle };
                 $scope.populatedChart = $scope.chart.processData(config.definitionModel.xAxis, "COUNTcreated_at", result[0].list, $scope.chart, chartOptions);
 
 
                 $scope.columns = _.map(result[1].columns, function (x) { return { value: x, label: x } });
                 console.log("$scope.schema")
                 console.log($scope.schema)
                 $scope.schema.properties.xAxis.items = $scope.columns;
                 // $scope.pieChartTypeDay = chartService.getChart('pieChart');
                 // var dayChartOptions = { title: "Tweets count by day (in a month)" };
                 // $scope.hourlyCountReportDataByDay = $scope.pieChartTypeDay.processData("DAYcreated_at", "COUNTcreated_at", result.list, $scope.pieChartTypeDay, dayChartOptions);
 
                 // $scope.pieChartTypeMonth = chartService.getChart('pieChart');
                 // var monthChartOptions = { title: "Tweets count by month" };
                 // $scope.hourlyCountReportDataByMonth = $scope.pieChartTypeMonth.processData("MONTHcreated_at", "COUNTcreated_at", result.list, $scope.pieChartTypeMonth, monthChartOptions);
 
                 // $scope.pieChartTypeYear = chartService.getChart('pieChart');
                 // var yearChartOptions = { title: "Tweets count by year" };
                 // $scope.hourlyCountReportDataByYear = $scope.pieChartTypeYear.processData("YEARcreated_at", "COUNTcreated_at", result.list, $scope.pieChartTypeYear, yearChartOptions);
 
                 // $scope.lineChartTypeHour = chartService.getChart('lineChart');
                 // var hourLineChartOptions = { title: "Tweets by hour", color: "#ff7f0e", key: "Tweets by hour", xAxisLabel: "Hour", yAxisLabel: "Count" };
                 // $scope.hourlyCountReportDataByHourLineChart = $scope.lineChartTypeHour.processData("HOURcreated_at", "COUNTcreated_at", result.list, $scope.lineChartTypeHour, hourLineChartOptions);
 
                 // $scope.discreteBarChartHour = chartService.getChart('discreteBarChart');
                 // var hourDiscreteBarChartOptions = { title: "Tweets by hour", key: "Tweets by hour", xAxisLabel: "Hour", yAxisLabel: "Count" };
                 // $scope.hourlyCountReportDataByHourDiscreteBarChart = $scope.discreteBarChartHour.processData("HOURcreated_at", "COUNTcreated_at", result.list, $scope.discreteBarChartHour, hourDiscreteBarChartOptions);
 
             });*/
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
        // chartService.updateChartSchemaProperties('discreteBarChart');

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

        console.log($scope.form)

    }
]);
