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

        $scope.ChartTypes = function () {
            return [{ "label": "Pie Chart", "value": "pieChart" }, { "label": "Bar Chart", "value": "discreteBarChart" }, { "label": "Line Chart", "value": "lineChart" }];
        };


        if (config.changesApplied == true) {
            config.changesApplied = false;
            $dzupDashboard.getReport("twitter_stream", "41a864f1-3e57-4912-8f93-69dd40067a9a", "hourlyCount").success(function (result) {

                $scope.chart = chartService.getChart(config.definitionModel.chartType);
                //var hourChartOptions = { title: "Tweets count by hour" };
                var chartOptions = { title: config.definitionModel.chartTitle };
                $scope.populatedChart = $scope.chart.processData(config.definitionModel.xAxis, "COUNTcreated_at", result.list, $scope.chart, chartOptions);


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

            });
        }

        $scope.schema = {
            type: 'object',
            properties: {
                chartTitle: {
                    type: 'string',
                    title: 'Chart Title'
                },
                chartXLabel: {
                    type: 'string',
                    title: 'X Axis',
                },
                chartYLabel: {
                    type: 'string',
                    title: 'Y Axis',
                },
                chartColor: {
                    type: 'string',
                    title: 'Color',
                },
                xAxixLabel: {
                    type: 'string',
                    title: 'X Axis Lebel',
                },
                yAxixLabel: {
                    type: 'string',
                    title: 'Y Axis Label',
                },
                xAxis: {
                    type: 'select',
                    //title: 'X Axis Propertie',
                    title: 'X Axis Property',
                    placeholder: 'Select X Axis Property',
                },




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
                                                type: 'uiselect',
                                                options: {
                                                    callback: $scope.ChartTypes,
                                                    objectid: 4226,
                                                },
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
                                                    callback: _.map(dzupDashboardWidgetHelper.getWidgetsByType("dataSource"), function (x) { return { value: x.wid, label: x.title } })
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

        console.log(config.definitionModel.chartType);
        console.log(config.definitionModel.xAxis);

    }
]);
