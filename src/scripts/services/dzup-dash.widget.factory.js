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
        getChart: function (chartType) {
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
        updateChartSchemaProperties: function (chartType, schemeProperties) {
            schemeProperties.chartTitle = {
                type: 'string',
                title: 'Chart Title',
            }
            schemeProperties.xAxisLabel = {
                type: 'string',
                title: 'X Axis Lebel',
            }
            schemeProperties.yAxisLabel = {
                type: 'string',
                title: 'Y Axis Lebel',
            }
            schemeProperties.xAxis = {
                type: 'string',
                title: 'X Axis',
                format: "uiselect",
                placeholder: 'Select X Axis Property',
            }
            schemeProperties.yAxis = {
                type: 'string',
                title: 'Y Axis',
                format: "uiselect",
                placeholder: 'Select Y Axis Property',
            }
            schemeProperties.chartColor = {
                type: 'string',
                title: 'Chart Color',
            }
            schemeProperties.sort = {
                title: "Sort Data",
                description: "",
                type: "boolean",
                default: false
            }
            schemeProperties.ascDesc = {
                title: ' ',
                type: "string",
                enum: [
                    "Ascending",
                    "descending"
                ]
            }
            schemeProperties.ascDescByAxis = {
                title: ' ',
                type: "string",
                enum: [
                    "X Axis",
                    "Y Axis"
                ]
            }
            schemeProperties.from = {
                title: "From",
                default: 1,
                type: "number"
            }
            schemeProperties.to = {
                title: "To",
                default: 20,
                type: "number"
            }
        },
        getPieChart: function () {
            var pieChartType = {
                chart: {
                    type: 'pieChart',
                    height: 500,
                    width: 500,
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
                        }).sortBy('key').reverse().slice(1, 20).value();
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
                        }).sortBy('x').reverse().slice(1, 20).value();

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


app.factory('dzupDashboardWidgetHelper', ['$dzupDashboard', function ($dzupDashboard) {

    var widgets = [];
    var widgetsData = [];
    return {
        setDashboardWidgets: function (index, dashboard) {
            this.clear();
            if (dashboard != null && dashboard.model != null && typeof dashboard.model != 'undefined' && typeof dashboard.model.rows != 'undefined') {

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
        },
        setWidgetData: function (wid, data) {

            var WData = { wid: wid, data: data };
            if (typeof WData != 'undefined') {
                var index = _.indexOf(this.widgetsData, _.find(this.widgetsData, { wid: WData.wid }));
                if (index != -1) { // widget array contains widget replace is
                    this.widgetsData.splice(index, 1, WData);
                }
                else {
                    this.widgetsData.push(WData);
                }
            }
        },
        getWidgetData: function (wid) {
            var deferred = new $.Deferred();
            var self = this;
            var index = _.indexOf(self.widgetsData, _.find(self.widgetsData, { wid: wid }));
            if (index != -1)
                deferred.resolve(this.widgetsData[index]);
            else {
                index = _.indexOf(self.widgets, _.find(self.widgets, { wid: wid }));

                if (index != -1) {
                    var widget = self.widgets[index];
                    $dzupDashboard.getReport(widget.config.definitionModel.reportSource, widget.config.definitionModel.stream, widget.config.definitionModel.report).then(function (result) {

                        self.setWidgetData(wid, result)
                        deferred.resolve(self.getWidgetData(wid));
                    });
                }
                else {
                    deferred.resolve(null);
                }

            }
            return deferred.promise();
        },
        addDashboardWidget: function (widget) {

            var index = _.indexOf(this.widgets, _.find(this.widgets, { wid: widget.wid }));

            if (index != -1) { // widget array contains widget replace is
                this.widgets.splice(index, 1, widget);
            }
            else {
                this.widgets.push(widget);
            }
        },
        clear: function () {
            this.widgets = [];
            this.widgetsData = [];
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