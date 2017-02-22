var app = angular.module('dzupDash');

app.controller('DzupGenericChartController', ['$scope', '$timeout', '$dzupConfigUtils', 'config', 'widget', 'chartService', 'dzupDashboardWidgetHelper', 'usSpinnerService',
    function ($scope, $timeout, $dzupConfigUtils, config, widget, chartService, dzupDashboardWidgetHelper, usSpinnerService) {
        $scope.config = config;
        $scope.widget = widget;

        $scope.setChartData = function (result) {
            if (typeof result.data.length == 'undefined') {
                result = result.data;
            }
            var wData = result.data[0].list;

            if (typeof $scope.chart == 'undefined') {
                $scope.chart = chartService.getChart(config.definitionModel.chartType);
                $scope.chartOptions = {
                    title: config.definitionModel.chartTitle,
                    xAxisLabel: config.definitionModel.xAxisLabel,
                    yAxisLabel: config.definitionModel.yAxisLabel,
                    color: config.definitionModel.chartColor,
                    xAxis: config.definitionModel.xAxis,
                    yAxis: config.definitionModel.yAxis,
                    sort: config.definitionModel.sort,
                    sortOrder: config.definitionModel.sortOrder,
                    sortBy: config.definitionModel.sortBy,
                    from: config.definitionModel.from,
                    to: config.definitionModel.to
                };
            }

            $scope.populatedChart = chartService.getChartData(wData, $scope.chart, $scope.chartOptions);

        };

        $scope.$on('widgetStreamChanged', function (event, data) {
            if (config.definitionModel.dataSource != data) return;

            if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.dataSource != 'undefined') {

                $scope.showChart = false;
                $scope.showSpinner = true;

                dzupDashboardWidgetHelper.getWidgetData(config.definitionModel.dataSource).then(function (result) {
                    if (result == null) return;

                    if (result.data != null && typeof result.data != 'undefined') {
                        $scope.setChartData(result);
                        $scope.showSpinner = false;
                        $scope.showChart = true;
                    }
                    else {
                        result.then(function (pResult) {
                            $scope.setChartData(pResult.data);
                            $scope.showSpinner = false;
                            $scope.showChart = true;
                        });
                    }
                });
            }
        });

        if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.dataSource != 'undefined') {

            dzupDashboardWidgetHelper.getWidgetData(config.definitionModel.dataSource).then(function (result) {
                if (result == null) return;

                if (result.data != null && typeof result.data != 'undefined') {
                    $scope.setChartData(result);
                }
                else {
                    result.then(function (pResult) {
                        $scope.setChartData(pResult.data);
                    });
                }
            });
        }
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
        $scope.reportColumns = [];

        // FUNCTIONS
        $scope.setChartData = function (injectValue, result) {
            if (typeof result.data.length == 'undefined') {
                result = result.data;
            }
            var wData = result.data[0].list;
            $scope.reportColumns = _.map(result.data[1].columns, function (x) { return { value: x, label: x } });
            $scope.injectAxisDdlValues(injectValue);

            if (typeof $scope.chart == 'undefined') {
                $scope.chart = chartService.getChart(config.definitionModel.chartType);
                $scope.chartOptions = {
                    title: config.definitionModel.chartTitle,
                    xAxisLabel: config.definitionModel.xAxisLabel,
                    yAxisLabel: config.definitionModel.yAxisLabel,
                    color: config.definitionModel.chartColor,
                    xAxis: config.definitionModel.xAxis,
                    yAxis: config.definitionModel.yAxis,
                    sort: config.definitionModel.sort,
                    sortOrder: config.definitionModel.sortOrder,
                    sortBy: config.definitionModel.sortBy,
                    from: config.definitionModel.from,
                    to: config.definitionModel.to
                };
            }

            $scope.populatedChart = chartService.getChartData(wData, $scope.chart, $scope.chartOptions);
        };
        $scope.injectAxisDdlValues = function (injectValue) {
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

        $scope.getReportColumns = function (value, injectValue) {

            dzupDashboardWidgetHelper.getWidgetData(value).then(function (result) {
                if (result == null) return;

                if (result.data != null && typeof result.data != 'undefined') {
                    $scope.setChartData(injectValue, result);
                }
                else {
                    result.then(function (pResult) {
                        $scope.setChartData(injectValue, pResult.data);
                    });
                }
            });

            return $scope.reportColumns;
        }

        $scope.getChartTypes = function (injectValue) {

            $scope.chartTypes = [{ value: 'pieChart', label: 'Pie Chart' }, { value: 'discreteBarChart', label: 'Bar Chart' }, { value: 'lineChart', label: 'Line Chart' }];

            if (injectValue == true) {
                $timeout(function () {
                    //the code which needs to run after dom rendering
                    $scope.schema.properties.chartType.items = $scope.chartTypes;
                })
            }
            return $scope.chartTypes;
        }
        // END OF FUNCTIONS


        if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.dataSource != 'undefined' && config.definitionModel.dataSource != null) {
            $scope.reportColumns = $scope.getReportColumns(config.definitionModel.dataSource, false);
        }

        $scope.config.definitionModel = $scope.config.definitionModel || {};
        $scope.loadChildModelByChartType($scope.config.definitionModel.chartType);

        $scope.chartTypes = [];

        if ($scope.chartTypes.length == 0) {
            $scope.getChartTypes(false);
        }

        if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.dataSource != 'undefined'
            && typeof config.definitionModel.xAxis != 'undefined' && typeof config.definitionModel.xAxis != 'undefined') {

            config.changesApplied = false;
        }

        $scope.schema = {
            type: 'object',
            properties: {
                chartType: {
                    type: 'string',
                    title: 'Chart Type',
                    format: "uiselect",
                    placeholder: 'Select Chart Type',
                    default: null,
                    validationMessage: "Required"
                },
                dataSource: {
                    type: 'string',
                    title: 'Data Source',
                    format: "uiselect",
                    placeholder: 'Select Data Source',
                    default: null,
                    validationMessage: "Required"
                },
                chartTitle: {
                    type: 'string',
                    title: 'Chart Title',
                },
                xAxisLabel: {
                    type: 'string',
                    title: 'X Axis Label'
                },
                yAxisLabel: {
                    type: 'string',
                    title: 'Y Axis Label'
                },
                xAxis: {
                    type: 'string',
                    title: 'X Axis',
                    format: "uiselect",
                    placeholder: 'Select X Axis Property',
                    default: null,
                    validationMessage: "Required"
                },
                yAxis: {
                    type: 'string',
                    title: 'Y Axis',
                    format: "uiselect",
                    placeholder: 'Select Y Axis Property',
                    default: null,
                    validationMessage: "Required"
                },
                chartColor: {
                    type: 'string',
                    title: 'Chart Color',
                },
                sort: {
                    title: "Sort Data",
                    description: "",
                    type: "boolean",
                    default: false
                },
                sortOrder: {
                    title: ' ',
                    type: "string"
                },
                sortBy: {
                    title: ' ',
                    type: "string"
                },
                from: {
                    title: "From",
                    default: 1,
                    type: "number"
                },
                to: {
                    title: "To",
                    default: 20,
                    type: "number"
                },
            },
            required: [
                "chartType",
                "dataSource",
                "xAxis",
                "yAxis",
            ]

        };

        // chartService.updateChartSchemaProperties('discreteBarChart', $scope.schema.properties);

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
                                                feedback: false,
                                                type: 'uiselect',
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
                                        items: [
                                            {
                                                key: 'xAxis',
                                                type: 'uiselect',
                                                feedback: false,
                                                options: {
                                                    callback: $scope.reportColumns
                                                },
                                            },
                                            {
                                                key: 'yAxis',
                                                feedback: false,
                                                type: 'uiselect',
                                                options: {
                                                    callback: $scope.reportColumns
                                                },
                                            },
                                            {
                                                type: 'section',
                                                htmlClass: "row",
                                                items: [
                                                    {
                                                        type: "section",
                                                        htmlClass: "col-xs-6",
                                                        items: [
                                                            {
                                                                key: 'sort',
                                                                onChange: function (modelValue, form) {
                                                                    config.definitionModel.sortOrder = 'asc';
                                                                    config.definitionModel.sortBy = 'x';
                                                                }
                                                            },
                                                            {
                                                                key: 'sortOrder',
                                                                htmlClass: 'sort-options-radio',
                                                                condition: "model.sort==true",
                                                                type: 'radios-inline',
                                                                titleMap: [
                                                                    {
                                                                        value: 'asc',
                                                                        name: 'Ascending'
                                                                    },
                                                                    {
                                                                        value: 'desc',
                                                                        name: 'Descending'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                key: 'sortBy',
                                                                htmlClass: 'sort-options-radio',
                                                                condition: "model.sort==true",
                                                                type: 'radios-inline',
                                                                titleMap: [
                                                                    {
                                                                        value: 'X',
                                                                        name: 'X Axis'
                                                                    },
                                                                    {
                                                                        value: 'Y',
                                                                        name: 'Y Axis'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        type: "section",
                                                        htmlClass: "col-xs-6",
                                                        items: [
                                                            {
                                                                type: "help",
                                                                helpvalue: "<h5>Take ...</h5>"
                                                            },
                                                            {
                                                                type: "section",
                                                                htmlClass: "col-xs-6",
                                                                items: [
                                                                    {
                                                                        key: 'from',
                                                                        feedback: false,
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                type: "section",
                                                                htmlClass: "col-xs-6",
                                                                items: [
                                                                    {
                                                                        key: 'to',
                                                                        feedback: false,
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        type: "section",
                                        htmlClass: "col-xs-12",
                                        condition: "model.chartType=='discreteBarChart'",
                                        items: [
                                            {
                                                key: 'xAxisLabel',
                                                placeholder: 'Enter X Axis Label Here',
                                                feedback: false,
                                            },
                                            {
                                                key: 'xAxis',
                                                type: 'uiselect',
                                                feedback: false,
                                                options: {
                                                    callback: $scope.reportColumns
                                                },

                                            },
                                            {
                                                key: 'yAxisLabel',
                                                placeholder: 'Enter Y Axis Label Here',
                                                feedback: false,
                                            },
                                            {
                                                key: 'yAxis',
                                                type: 'uiselect',
                                                feedback: false,
                                                options: {
                                                    callback: $scope.reportColumns
                                                },

                                            },
                                            {
                                                type: 'section',
                                                htmlClass: "row",
                                                items: [
                                                    {
                                                        type: "section",
                                                        htmlClass: "col-xs-6",
                                                        items: [
                                                            {
                                                                key: 'sort',
                                                                onChange: function (modelValue, form) {
                                                                    config.definitionModel.sortOrder = 'asc';
                                                                    config.definitionModel.sortBy = 'x';
                                                                }
                                                            },
                                                            {
                                                                key: 'sortOrder',
                                                                htmlClass: 'sort-options-radio',
                                                                condition: "model.sort==true",
                                                                type: 'radios-inline',
                                                                titleMap: [
                                                                    {
                                                                        value: 'asc',
                                                                        name: 'Ascending'
                                                                    },
                                                                    {
                                                                        value: 'desc',
                                                                        name: 'Descending'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                key: 'sortBy',
                                                                htmlClass: 'sort-options-radio',
                                                                condition: "model.sort==true",
                                                                type: 'radios-inline',
                                                                titleMap: [
                                                                    {
                                                                        value: 'x',
                                                                        name: 'X Axis'
                                                                    },
                                                                    {
                                                                        value: 'y',
                                                                        name: 'Y Axis'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        type: "section",
                                                        htmlClass: "col-xs-6",
                                                        items: [
                                                            {
                                                                "type": "help",
                                                                "helpvalue": "<h5>Take ...</h5>"
                                                            },
                                                            {
                                                                type: "section",
                                                                htmlClass: "col-xs-6",
                                                                items: [
                                                                    {
                                                                        key: 'from',
                                                                        feedback: false,
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                type: "section",
                                                                htmlClass: "col-xs-6",
                                                                items: [
                                                                    {
                                                                        key: 'to',
                                                                        feedback: false,
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        type: "section",
                                        htmlClass: "col-xs-12",
                                        condition: "model.chartType=='lineChart'",
                                        items: [
                                            {
                                                key: 'xAxisLabel',
                                                placeholder: 'Enter X Axis Label Here',
                                                feedback: false,
                                            },
                                            {
                                                key: 'xAxis',
                                                type: 'uiselect',
                                                feedback: false,
                                                options: {
                                                    callback: $scope.reportColumns
                                                },
                                            },
                                            {
                                                key: 'yAxisLabel',
                                                placeholder: 'Enter Y Axis Label Here',
                                                feedback: false,
                                            },
                                            {
                                                key: 'yAxis',
                                                type: 'uiselect',
                                                feedback: false,
                                                options: {
                                                    callback: $scope.reportColumns
                                                },
                                            },
                                            {
                                                key: 'chartColor',
                                                placeholder: 'Enter Chart Color Here',
                                                feedback: false,
                                            },
                                            {
                                                type: 'section',
                                                htmlClass: "row",
                                                items: [
                                                    {
                                                        type: "section",
                                                        htmlClass: "col-xs-6",
                                                        items: [
                                                            {
                                                                key: 'sort',
                                                                onChange: function (modelValue, form) {
                                                                    config.definitionModel.sortOrder = 'asc';
                                                                    config.definitionModel.sortBy = 'x';
                                                                }
                                                            },
                                                            {
                                                                key: 'sortOrder',
                                                                htmlClass: 'sort-options-radio',
                                                                condition: "model.sort==true",
                                                                type: 'radios-inline',
                                                                titleMap: [
                                                                    {
                                                                        value: 'asc',
                                                                        name: 'Ascending'
                                                                    },
                                                                    {
                                                                        value: 'desc',
                                                                        name: 'Descending'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                key: 'sortBy',
                                                                htmlClass: 'sort-options-radio',
                                                                condition: "model.sort==true",
                                                                type: 'radios-inline',
                                                                titleMap: [
                                                                    {
                                                                        value: 'x',
                                                                        name: 'X Axis'
                                                                    },
                                                                    {
                                                                        value: 'y',
                                                                        name: 'Y Axis'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        type: "section",
                                                        htmlClass: "col-xs-6",
                                                        items: [
                                                            {
                                                                "type": "help",
                                                                "helpvalue": "<h5>Take ...</h5>"
                                                            },
                                                            {
                                                                type: "section",
                                                                htmlClass: "col-xs-6",
                                                                items: [
                                                                    {
                                                                        key: 'from',
                                                                        feedback: false,
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                type: "section",
                                                                htmlClass: "col-xs-6",
                                                                items: [
                                                                    {
                                                                        key: 'to',
                                                                        feedback: false,
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        tv4.addSchema('chartSchema', $scope.schema);

        config.definitionModel.validateForm = function () {
            $scope.$broadcast('schemaFormValidate');
        }
    }
]);
