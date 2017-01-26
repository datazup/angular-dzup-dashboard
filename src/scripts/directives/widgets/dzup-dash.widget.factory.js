var app = angular.module('dzupDash');

app.directive('widgetMainFormConfig', ['$compile', '$interpolate', '$templateRequest', '$dzupConfigUtils', function ($compile, $interpolate, $templateRequest, $dzupConfigUtils) {

    return {
        restrict: "E",
        controller: ['$rootScope', '$scope', function ($rootScope, $scope) {
        }],
        link: function (scope, element, attrs) {
            var base = $dzupConfigUtils.templateUrlBase['dzup-dashboard'];
            $templateRequest(base + "/templates/directives/widgets/widget.main.form.config.view.html").then(function (html) {
                var template = angular.element(html);
                var compiled = $compile(template)(scope);
                element.replaceWith(compiled);
            });
        }
    }

}]);

app.factory('chartService', [function () {
    return {
        $scope: null,
        getChart: function (chartType, scope) {
            $scope = scope;
            switch (chartType) {
                case 'pieChart':
                    return this.getPieChart();
                    break;
                case 'lineChart':
                    return this.getLineChart();
                    break;
                case 'discreteBarChart':
                    return this.getDiscreteBarChart();
                    break;
                default:
                    return null;
            }
        },
        getChartSchemaProperties: function (chartType, schemeProperties) {
            schemeProperties.chartTitle = {
                type: 'string',
                title: 'Chart Titleeeeeeeee',
            }
        },
        getChartOptionsForm: function (chartType) {

            if (chartType == "pieChart") {
                return [
                    {
                        key: 'chartTitle',
                        type: 'string',
                        placeholder: 'Enter Chart Title Here'
                    }
                ]
            }

            if (chartType == "discreteBarChart") {
                return [
                    {
                        key: 'chartTitle',
                        placeholder: 'Enter Chart Title Here'
                    },
                    {
                        key: 'chartXLabel',
                        placeholder: 'Enter X Axis Label Here'
                    },
                    {
                        key: 'xAxis',
                        type: 'uiselect',
                        options: {
                            callback: function () { console.log("calllback") },
                        },

                    },
                    {
                        key: 'chartYLabel',
                        placeholder: 'Enter Y Axis Label Here'
                    }
                ]
            }

            if (chartType == "lineChart") {
                return [
                    {
                        key: 'chartTitle',
                        placeholder: 'Enter Chart Title Here'
                    },
                    {
                        key: 'chartXLabel',
                        placeholder: 'Enter X Axis Label Here'
                    },
                    {
                        key: 'chartYLabel',
                        placeholder: 'Enter Y Axis Label Here'
                    },
                    {
                        key: 'chartColor',
                        placeholder: 'Enter Chart Color Here'
                    }
                ]
            }
        },
        getPieChart: function () {
            var pieChartType = {
                chart: {
                    type: 'pieChart',
                    height: 350,
                    width: 350,
                    x: function (d) { return d.key; },
                    y: function (d) { return d.y; },
                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 0,
                            bottom: 5,
                            left: 0
                        }
                    },
                    labelType: "value", //key, value, percent
                },
                title: {
                    enable: false,
                    text: "",
                },
                processData: function (groupByProperty, sumByProperty, data, chart, options) {
                    if (options && options.title) {
                        chart.title.enable = true;
                        chart.title.text = options.title;
                    }
                    return _.chain(data)
                        .groupBy(groupByProperty)
                        .map(function (value, key) {
                            return _.reduce(value, function (result, currentObject) {
                                return {
                                    key: currentObject[groupByProperty],
                                    y: result["y"] + currentObject[sumByProperty]
                                }
                            }, {
                                    y: 0
                                });
                        }).value();
                }
            };

            return pieChartType;
        },
        getLineChart: function () {
            var lineChartType = {
                chart: {
                    type: 'lineChart',
                    height: 450,
                    width: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 55
                    },
                    x: function (d) { return d.x; },
                    y: function (d) { return d.y; },
                    useInteractiveGuideline: true,
                    dispatch: {
                        stateChange: function (e) { },
                        changeState: function (e) { },
                        tooltipShow: function (e) { },
                        tooltipHide: function (e) { }
                    },
                    xAxis: {
                        axisLabel: ''
                    },
                    yAxis: {
                        axisLabel: '',
                        axisLabelDistance: -10
                    },
                    callback: function (chart) {
                    }
                },
                title: {
                    enable: false,
                    text: ''
                },
                subtitle: {
                    enable: false,
                    text: '',
                    css: {
                        'text-align': 'center',
                        'margin': '10px 13px 0px 7px'
                    }
                },
                caption: {
                    enable: false,
                    html: '',
                    css: {
                        'text-align': 'justify',
                        'margin': '10px 13px 0px 7px'
                    }
                },
                processData: function (xAxis, yAxis, data, chart, options) {
                    if (options && options.title) {
                        chart.title.enable = true;
                        chart.title.text = options.title;
                    }
                    if (options.xAxisLabel) {
                        chart.chart.xAxis.axisLabel = options.xAxisLabel;
                    }
                    if (options.yAxisLabel) {
                        chart.chart.yAxis.axisLabel = options.yAxisLabel;
                    }

                    var mappedData = _.chain(data)
                        .groupBy(xAxis)
                        .map(function (value, key) {
                            return _.reduce(value, function (result, currentObject) {
                                return {
                                    x: currentObject[xAxis],
                                    y: result["y"] + currentObject[yAxis]
                                }
                            }, {
                                    y: 0
                                });
                        }).value();

                    //_.map(_.sortBy(data,xAxis), function(object){return {x: object[xAxis], y:object[yAxis]}});

                    return [{
                        values: mappedData,
                        key: options.key,
                        color: options.color
                    }];
                }
            };

            return lineChartType;
        },
        getDiscreteBarChart: function () {
            var discreteBarChart = {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 55
                    },
                    x: function (d) { return d.x; }, //label
                    y: function (d) { return d.y; }, //value
                    showValues: true,
                    valueFormat: function (d) {
                        return d3.format(',.2f')(d);
                    },
                    duration: 500,
                    xAxis: {
                        axisLabel: 'X Axis'
                    },
                    yAxis: {
                        axisLabel: 'Y Axis',
                        axisLabelDistance: -10
                    }
                },
                title: {
                    enable: false,
                    text: ''
                },
                processData: function (xAxis, yAxis, data, chart, options) {
                    if (options && options.title) {
                        chart.title.enable = true;
                        chart.title.text = options.title;
                    }
                    if (options.xAxisLabel) {
                        chart.chart.xAxis.axisLabel = options.xAxisLabel;
                    }
                    if (options.yAxisLabel) {
                        chart.chart.yAxis.axisLabel = options.yAxisLabel;
                    }

                    var mappedData = _.chain(data)
                        .groupBy(xAxis)
                        .map(function (value, key) {
                            return _.reduce(value, function (result, currentObject) {
                                return {
                                    x: currentObject[xAxis],
                                    y: result["y"] + currentObject[yAxis]
                                }
                            }, {
                                    y: 0
                                });
                        }).value();

                    return [{
                        values: mappedData,
                        key: options.key
                    }];
                }
            };
            return discreteBarChart;
        },
    };
}]);


app.directive('widgetChildConfigFactory', ['$compile', '$interpolate', function ($compile, $interpolate) {

    return {
        restrict: "E",
        link: function (scope, element, attrs) {

            var chartType = scope.$eval(attrs.chartType);
            scope.chartType = chartType;

            var tmpl = '<div class="edit-child-form"><form sf-schema="chartDefinition.schema" sf-form="chartDefinition.form" sf-options="{setSchemaDefaults:true, validateOnRender: true}" sf-model="config.chartDefinitionModel"></form></div>';

            var html = element.html();

            scope.recompile = function (newType) {
                element.empty();
                if (newType) {
                    element.children(0).html(tmpl);
                    var compiled1 = $compile(tmpl)(scope);
                    element.append(compiled1);
                    $compile(element.contents())(scope);
                } else {
                    var compiled1 = $compile('<div></div>')(scope);
                    element.append(compiled1);
                }
            }

            scope.recompile(scope.chartType);

            scope.$watch('config.definitionModel.chartType', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.recompile(newValue);
                }
            });
        }
    }

}]);


app.factory('dzupDashboardWidgetHelper', [function () {

    var widgets = [];
    return {
        setDashboardWidgets: function (index, dashboard) {
            this.clear();
            if (typeof dashboard.model.rows != 'undefined') {

                for (i = 0; i < dashboard.model.rows.length; i++) {
                    var columns = dashboard.model.rows[i].columns;
                    for (j = 0; j < columns.length; j++) {
                        var widgets = columns[j].widgets;
                        if (typeof widgets != 'undefined') {
                            for (s = 0; s < widgets.length; s++) {
                                this.addDashboardWidget(widgets[s]);

                            }
                        }
                    }
                }
            }

            console.log(this.widgets);
        },
        addDashboardWidget: function (widget) {

            var index = _.indexOf(this.widgets, _.find(this.widgets, { wid: widget.wid }));

            if (index != -1) { // widget array contains widget replace is
                this.widgets.splice(index, 1, widget);
            }
            else {
                this.widgets.push(widget);
            }

            console.log(this.widgets);
        },
        clear: function () {
            this.widgets = [];
        },
        getWidgets: function () {
            return this.widgets;
        },
        getWidgetsByType: function (widgetType) {
            return _.filter(this.widgets, function (item) {
                return item.type == widgetType
            });
        }

    };

}]);
