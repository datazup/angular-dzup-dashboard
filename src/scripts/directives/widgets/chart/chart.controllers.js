var app = angular.module('dzupDash');

app.controller('DzupGenericChartController', ['$scope', '$timeout', '$dzupConfigUtils', 'config', 'widget', 'chartService', 'dzupDashboardWidgetHelper', 'usSpinnerService',
    function ($scope, $timeout, $dzupConfigUtils, config, widget, chartService, dzupDashboardWidgetHelper, usSpinnerService) {
        $scope.config = config;
        $scope.widget = widget;

        $scope.setChartData = function (result) {
            if (typeof result.data.length == 'undefined') {
                result = result.data;
            }
            var wData = typeof result.items != "undefined"?result.items.list : [];

            if (typeof $scope.chart == 'undefined') {
                $scope.chart = chartService.getChart(config.definitionModel.chartType);
                $scope.chartOptions = {
                    title: config.definitionModel.chartTitle,
                    xAxisLabel: config.definitionModel.xAxisLabel,
                    yAxisLabel: config.definitionModel.yAxisLabel,
                    color: config.definitionModel.chartColor,
                    xAxis: "x",
                    yAxis:  "y",
                    sort: config.definitionModel.sort,
                    sortOrder: config.definitionModel.sortOrder,
                    sortBy: config.definitionModel.sortBy,
                    from: config.definitionModel.from,
                    to: config.definitionModel.to,
                    chartType: config.definitionModel.chartType
                };
            }

            if( config.definitionModel.chartType != "tableChart")
                $scope.populatedChart = chartService.getChartData(wData, $scope.chart, $scope.chartOptions);
             else{
                $scope.config.tableConfig = {};
                $scope.config.tableConfig = {
                  heads: config.definitionModel.tableColumns
                };
                $scope.config.tableConfig.data= wData;
             }
        };

        $scope.refreshWidget = function(refreshConf){
            if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.dataSource != 'undefined') {

                    if(null != refreshConf && typeof refreshConf != "undefined"){
                        config.definitionModel.ascDesc = refreshConf.ascDesc
                        config.definitionModel.yAxis = refreshConf.orderBy
                    }

                    $scope.showChart = false;
                    $scope.showSpinner = true;
                    if( config.definitionModel.chartType == "tableChart" && ( null == config.definitionModel.yAxis || typeof config.definitionModel.yAxis == "undefined"))
                        config.definitionModel.yAxis = config.definitionModel.tableColumns.length > 0 ? config.definitionModel.tableColumns[0]:"";

                    dzupDashboardWidgetHelper.getWidgetData(config.definitionModel).then(function (result) {
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
        }

        $scope.$on('widgetStreamChanged', function (event, data) {
            if (typeof config.definitionModel != 'undefined' && config.definitionModel.dataSource != data) return;

            $scope.refreshWidget();
        });

        if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.dataSource != 'undefined') {

            if( config.definitionModel.chartType == "tableChart" && ( null == config.definitionModel.yAxis || typeof config.definitionModel.yAxis == "undefined"))
                config.definitionModel.yAxis = config.definitionModel.tableColumns.length > 0 ? config.definitionModel.tableColumns[0]:"";

            dzupDashboardWidgetHelper.getWidgetData(config.definitionModel).then(function (result) {
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
            var wData = typeof result.items == 'undefined' ? [] : result.items.list;
            $scope.reportColumns = _.map(result.columns, function (x) { return { value: x, label: x } });

            $scope.injectAxisDdlValues(injectValue);

            if ((null == $scope.chart || typeof $scope.chart == 'undefined') && config.definitionModel.chartType != null) {
                $scope.chart = chartService.getChart(config.definitionModel.chartType);
                $scope.chartOptions = {
                    title: config.definitionModel.chartTitle,
                    xAxisLabel: config.definitionModel.xAxisLabel,
                    yAxisLabel: config.definitionModel.yAxisLabel,
                    color: config.definitionModel.chartColor,
                    xAxis: "x",
                    yAxis:  "y",
                    sort: config.definitionModel.sort,
                    sortOrder: config.definitionModel.sortOrder,
                    sortBy: config.definitionModel.sortBy,
                    from: config.definitionModel.from,
                    to: config.definitionModel.to,
                    chartType: config.definitionModel.chartType
                };
            }

            //$scope.chart.chart.type != "tableChart" or use config.definitionModel.chartType
            if(null != $scope.chart && null != $scope.chartOptions && typeof $scope.chart !='undefined' && typeof $scope.chartOptions !='undefined' &&
            config.definitionModel.chartType != "tableChart")
                $scope.populatedChart = chartService.getChartData(wData, $scope.chart, $scope.chartOptions);
        };
        $scope.injectAxisDdlValues = function (injectValue) {
            if (injectValue == true) {
                $timeout(function () {
                    //the code which needs to run after dom rendering
                    $scope.config.definitionModel.tableColumns = [];

                    //the clear of
                    $scope.config.definitionModel.primaryOrderBy = [];
                    var primaryOrderByScope = angular.element(document.getElementsByClassName("primary-order-by")).scope();
                    if(primaryOrderByScope && primaryOrderByScope.$select){
                        primaryOrderByScope.$select.selected =[]
                        primaryOrderByScope.$selectMultiple.updateModel()
                    }

                    $scope.config.definitionModel.aggregateAxis = {};
                    var resultItems = _.map($scope.reportColumns,function(item){ return { name:item.label, value: item.value}});
                    if($scope.config.definitionModel.chartType =="tableChart"){
                        $scope.config.definitionModel.aggregateAxis = [];
                        //path to tableColumns
                        $scope.form["0"].tabs[1].items["0"].items["0"].items["0"].titleMap = resultItems;
                        //path to Primary Order by
                        $scope.form["0"].tabs[1].items["0"].items["1"].items["0"].titleMap = resultItems;
                    }
                    else
                    {

                         $scope.config.definitionModel.aggregateAxis = [{xAxisAg:null}];
                         $scope.schema.properties.yAxis.items = $scope.reportColumns;
                    }
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

            return dzupDashboardWidgetHelper.getWidgetData(value, true).then(function (result) {
                if (result == null) return;

                if (result.data != null && typeof result.data != 'undefined') {
                    $scope.setChartData(injectValue, result);
                }
                else {
                    result.then(function (pResult) {
                        $scope.setChartData(injectValue, pResult.data);
                    });
                }
                return $scope.reportColumns;
            });
        }

        $scope.getReportColumnsDynamic = function (value, injectValue) {
            //console.log($scope.form["0"].tabs[1].items["0"].items[2].items["0"].options);
            if(!angular.equals(value, $scope.defCopy)){
                $scope.reportColumns = $scope.getReportColumns(value, injectValue);
                $scope.defCopy =value;
            }

           if(typeof $scope.reportColumns.then == 'function'){
                 return $scope.reportColumns.then(function(result){
                     var items = _.map(result,function(item){ return { name:item.label, value: item.value}});
                     return {data:items};
              });
           }
           else
           {
             return new Promise(function(resolve, reject) {
                 var items = _.map($scope.reportColumns,function(item){ return { name:item.label, value: item.value}});
                 resolve( {data:items});
            });
           }
        };

        $scope.getChartTypes = function (injectValue) {

            $scope.chartTypes = [{ value: 'pieChart', label: 'Pie Chart' }, { value: 'discreteBarChart', label: 'Bar Chart' }, { value: 'lineChart', label: 'Line Chart' }, { value: 'tableChart', label: 'Table Chart' }];

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
           //gets promise
           $scope.reportColumns = $scope.getReportColumns(config.definitionModel, false);
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
                tableColumns: {
                    type: 'array',
                    default:[],
                    title: 'Table Properties',
                    placeholder: 'Select Table Properties',
                    validationMessage: "Required",
                    items: {type:"string"}
                },
                primaryOrderBy: {
                    type: 'array',
                    default:[],
                    title: 'Primary Order By',
                    placeholder: ' ',
                    validationMessage: "Required",
                    items: {type:"string"}
                },
                aggregateAxis: {
                    type: "array",
                    items: {
                        title: "",
                        type: "object",
                        properties: {
                            xAxisAg: {
                                type: 'string',
                                title: 'X Axis',
                                placeholder: 'Select X Axis Property',
                                default: null,
                                validationMessage: "Required",
                                required: true
                            }
                        }
                    }
                },
                yAxis: {
                    type: 'string',
                    title: 'Y Axis',
                    format: "uiselect",
                    placeholder: 'Select Y Axis Property',
                    default: "",
                    validationMessage: "Required",
                    required: true
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
                "dataSource"
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
                                                type: 'uiselect',
                                                options: {
                                                    callback: _.map(dzupDashboardWidgetHelper.getWidgetsByType("dataSource"), function (x) { return { value: x.wid, label: x.title } }),
                                                    eventCallback: function (value) {
                                                        if (typeof value != 'undefined') {
                                                            $scope.reportColumns = $scope.getReportColumns(config.definitionModel, true);
                                                        }
                                                    }
                                                },
                                               /* "type": "strapselect",
                                                "onChange": function (modelValue, form) {
                                                debugger;
                                                    $scope.form.forEach(function (item) {
                                                        if (item.key == "xAxisAg") {
                                                        debugger;
                                                            item.options.scope.populateTitleMap(item);
                                                        }
                                                    });

                                                    if (typeof modelValue != 'undefined') {
                                                            $scope.reportColumns = $scope.getReportColumns(config.definitionModel, true);
                                                        }

                                                },
                                                "options": {
                                                },
                                                titleMap: _.map(dzupDashboardWidgetHelper.getWidgetsByType("dataSource"), function (x) { return { value: x.wid, name: x.title } }),*/
                                                feedback: false,
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
                                        condition: "model.chartType=='tableChart' && model.dataSource!=null",
                                        type: "section",
                                        htmlClass: "col-xs-12",
                                        items: [
                                            {
                                                key: 'tableColumns',
                                                type: 'strapselect',
                                                feedback: false,
                                                fieldHtmlClass:'dzup-strapselect dzup-strapselect-select',
                                                options: {
                                                  filterTriggers: ["model.dataSource"],
                                                  multiple: "true",
                                                  asyncCallback: function(){return $scope.getReportColumnsDynamic(config.definitionModel, false)},
                                                  placement: 'left'
                                              }
                                            }
                                        ]
                                    },
                                    {
                                        condition: "model.chartType=='tableChart' && model.dataSource!=null",
                                        type: "section",
                                        htmlClass: "col-xs-12 dzup-uiselect-multi",
                                        items: [
                                            {
                                                key: 'primaryOrderBy',
                                                type: 'uiselectmultiple',
                                                feedback: false,
                                                options: {
                                                  multiple: "true",
                                                  asyncCallback: function(){return $scope.getReportColumnsDynamic(config.definitionModel, false)},
                                                  placement: 'left',
                                                  uiClass:'primary-order-by'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        condition: "model.chartType!='pieChart' && model.chartType!='tableChart'",
                                        type: "section",
                                        htmlClass: "col-xs-12",
                                        items: [
                                            {
                                                key: 'xAxisLabel',
                                                placeholder: 'Enter X Axis Label Here',
                                                feedback: false,
                                            }
                                        ]
                                    },
                                    {
                                       condition: "model.dataSource!=null && model.chartType!='tableChart'",
                                       key: "aggregateAxis",
                                       style: {
                                           "add": "btn-success"
                                       },
                                       add: "Add",
                                       title: "",
                                       htmlClass:'col-xs-12',
                                       items: [
                                          {
                                              key: 'aggregateAxis[].xAxisAg',
                                              type: 'strapselect',
                                              feedback: false,
                                              fieldHtmlClass:'dzup-strapselect',
                                              options: {
                                              filterTriggers: ["model.dataSource"],
                                              filter:"true",
                                              asyncCallback: function(){return $scope.getReportColumnsDynamic(config.definitionModel, false)},
                                               placement: 'left',
                                               asyncReloadOnFilterTrigger: true
                                              }
                                          }
                                       ]

                                    },
                                    {
                                        type: "section",
                                        htmlClass: "col-xs-12",
                                        condition: "model.chartType=='pieChart'",
                                        items: [

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
                                 /*           {
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

                                            },*/
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
                                            /*{
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
                                            },*/
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