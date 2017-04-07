var app = angular.module('dzupDash');

app.controller('DzupGenericChartController', ['$scope', '$timeout', '$dzupConfigUtils', 'config', 'widget', 'chartService', 'dzupDashboardWidgetHelper', 'usSpinnerService',
    function ($scope, $timeout, $dzupConfigUtils, config, widget, chartService, dzupDashboardWidgetHelper, usSpinnerService) {
        $scope.config = config;
        $scope.widget = widget;
        
         $scope.radarDefultData = function(wData, chart, chartOptions, config){
            
             var data = [
                 
                 // {x: topic1-area1, y:40}, { x: topic1-area2, y: 45} , {x: topic1-area3, y: 40 }
                 {
                     key: 'Topic1',
                     values: [{ label: 'Area1', value: 40 }, { label: 'Area2', value: 56}, { label: 'Area3', value: 74}]
                 },
                 {
                     key: 'Topic2',
                     values: [{ label: 'Area5', value: 23 }, { label: 'Area6', value: 57}, { label: 'Area7', value: 35}]
                 },
                 {
                     key: 'Topic3',
                     values: [{ label: 'Area1', value:67 }, { label: 'Area2', value: 34}, { label: 'Area3', value: 76}]
                 },
                 {
                     key: 'Topic4',
                     values: [{ label: 'Area1', value: 41 }, { label: 'Area2', value: 55}, { label: 'Area3', value: 67}]
                 }
                 
             ];
             
             return data;
             
        };
        
        $scope.getGeoDefaultData = function(wData, chart, chartOptions, config){
            if (!wData){
                return null;
            }
            var calculateMetric = function(yOldData, yNewData, totalCount, mType){
                switch(mType){
                    case 'SUM':      
                        return yOldData+yNewData;                        
                    case 'AVG':
                        var avg = 0;
                        return avg;
                    case 'MAX':
                        return yNewData>yOldData?yNewData:yOldData;
                    case 'MIN':
                        return yNewData<yOldData?yNewData:yOldData;
                    case 'LAST':
                        return yNewData;                        
                };
                return yNewData;
            };
            var agregatedCols = config.definitionModel.aggregateAxis;
            if (agregatedCols){
             
                var metricType = chartOptions.metricType;
                
                var countriesObj = {};
                var statesObj = {};
                for (var i=0;i<wData.length;i++){
                    var dObj = wData[i];
                    var x = dObj.x;
                    var y = dObj.y;
                    
                    var splitted = x.split('-');
                    var country = splitted[0];
                    var state = splitted[1];
                    if (country){
                        var existingCountry = countriesObj[country];
                        if (!existingCountry){
                            countriesObj[country] = y;
                        }else{
                            countriesObj[country] += y;
                        }
                        
                        var existingCountryState = statesObj[country];
                        if (!existingCountryState){
                            statesObj[country] = {};
                            statesObj[country][state] = y;
                        }else{
                            var existingState = statesObj[country][state];
                            if (!existingState){
                                statesObj[country][state] = y;
                            }else{
                                statesObj[country][state] += y;
                            }
                        }
                    }
                }
                
                var data = {};
                var countries = [];
                var states = {};
                for (var prop in countriesObj) {
                    var obj = {
                        country: prop,
                        value: countriesObj[prop]
                    };
                    countries.push(obj);
                }
                
                for (var prop in statesObj) {
                    states[prop] = [];
                    var so =  statesObj[prop];
                    for (var propso in so){
                        var state = propso;
                        var value = so[propso];
                        states[prop].push({ state: state, value: value});
                    }
                }
               
                data.countries = countries;
                data.states = states;
                
                return data;
                
            }else{
                console.log('There is no aggregated cols for geoChart');
                return null;
            }
            
            /*var data = {
                countries: [
                    { country: 'US', count: 123 },
                    { country: 'KR', count: 36 }
                ],
                states: {
                    KR:[
                            {
                                state: 'KR-11', count: 10
                            },
                            {
                                state: 'KR-44', count: 15
                            },
                            {
                                state: 'KR-26', count: 23
                            },
                            {
                                state: 'KR-47', count: 25
                            }
                    ],
                    US: [
                            {
                                state: 'AL', count: 10
                            }
                    ]
                }
            }
            
            return data;*/
        };

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
                    /*color: config.definitionModel.chartColor,*/
                    xAxis: "x",
                    yAxis:  "y",
                    sort: config.definitionModel.sort,
                    sortOrder: config.definitionModel.sortOrder,
                    sortBy: config.definitionModel.sortBy,
                    from: config.definitionModel.from,
                    to: config.definitionModel.to,
                    chartType: config.definitionModel.chartType,
                    metricType: config.definitionModel.metricType,
                    splitDataBy:config.definitionModel.splitDataBy
                };
            }

            if (config.definitionModel.chartType === "geoChart"){
                $scope.populatedChart = $scope.getGeoDefaultData(wData, $scope.chart, $scope.chartOptions, config);                
            }else if (config.definitionModel.chartType === "radarChart"){
                $scope.populatedChart = $scope.radarDefultData(wData, $scope.chart, $scope.chartOptions, config);
            }else if( config.definitionModel.chartType != "tableChart")
                $scope.populatedChart = chartService.getChartData(wData, $scope.chart, $scope.chartOptions);
             else{
                $scope.config.tableConfig = {};
                $scope.config.tableConfig = {
                  heads: config.definitionModel.tableColumns
                };
                $scope.tableConfigData = wData;
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
                    /*color: config.definitionModel.chartColor,*/
                    xAxis: "x",
                    yAxis:  "y",
                    sort: config.definitionModel.sort,
                    sortOrder: config.definitionModel.sortOrder,
                    sortBy: config.definitionModel.sortBy,
                    from: config.definitionModel.from,
                    to: config.definitionModel.to,
                    chartType: config.definitionModel.chartType,
                    splitDataBy:config.definitionModel.splitDataBy

                };
            }

            if(null != $scope.chart && null != $scope.chartOptions && typeof $scope.chart !='undefined' && typeof $scope.chartOptions !='undefined' && config.definitionModel.chartType != "tableChart"){
                $scope.populatedChart = chartService.getChartData(wData, $scope.chart, $scope.chartOptions);
            }
                
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
                    $scope.schema.properties.splitDataBy.items= $scope.reportColumns;
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

                if(injectValue && config.definitionModel.areFilterFiledsEnabled)
                    $scope.config.definitionModel.filterFields = [{filterColumn:null,filterOperator:null , filterValue:"" }];

                return $scope.reportColumns;
            });
        }

        $scope.getReportColumnsDynamic = function (value, injectValue) {

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

            $scope.chartTypes = [{ value: 'pieChart', label: 'Pie Chart' }, { value: 'discreteBarChart', label: 'Bar Chart' }, { value: 'lineChart', label: 'Line Chart' }, { value: 'tableChart', label: 'Table Chart' }, { value: 'radarChart', label: 'Radar Chart' }, { value: 'geoChart', label: 'Geo Chart' }];

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
        $scope.fieldFilterOperators = $dzupDashboard.getFilterOperators();

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
                metricType: {
                    title: 'Metric Type',
                    description: '',
                    type: 'string',
                    enum: ['SUM', 'AVG', 'MIN','MAX','LAST'],
                    default: 'SUM'
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
                    default: 0,
                    type: "number"
                },
                to: {
                    title: "To",
                    default: 20,
                    type: "number"
                },
                areFilterFiledsEnabled: {
                    type: 'boolean',
                    title: 'Enable Filter Fields',
                    description: '',
                    default: false,
                },
                filterFields: {
                    type: "array",
                    description: '',
                    items: {
                        type: "object",
                        properties: {
                            filterColumn: {
                                type: 'string',
                                title: 'Report Column',
                                placeholder: 'Select Column',
                                description: '',
                                default: null,
                                validationMessage: 'Required',
                                required: true
                            },
                            filterOperator: {
                                type: 'string',
                                title: 'Operator',
                                format: "uiselect",
                                placeholder: 'Select Operator',
                                description: '',
                                default: null,
                                validationMessage: 'Required',
                                required: true,
                            },
                            filterValue: {
                                type: "string",
                                title: "Value",
                                disableErrorState : true
                            }
                        }
                    }
                },
                splitDataBy: {
                    type:  ['null','string'],
                    title: 'Split Property',
                    default: null,
                    format: "uiselect",
                    placeholder: 'Select by which property you want to split data.'
                }
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
                                        condition: "model.chartType=='discreteBarChart' || model.chartType=='geoChart' || model.chartType=='lineChart'",
                                        items: [
                                            {
                                                key: 'yAxisLabel',
                                                placeholder: 'Enter Y Axis Label Here',
                                                feedback: false,
                                            }

                                        ]
                                    },
                                    {
                                        type: "section",
                                        htmlClass: "col-xs-12",
                                        condition: "model.chartType=='pieChart' || model.chartType=='discreteBarChart' || model.chartType=='geoChart' || model.chartType=='lineChart'",
                                        items: [
                                            {
                                                key: 'yAxis',
                                                feedback: false,
                                                type: 'uiselect',
                                                options: {
                                                    callback: $scope.reportColumns
                                                },
                                            }
                                        ]
                                    },
                                    {
                                        type: "section",
                                        htmlClass: "col-xs-12",
                                        condition: "model.chartType=='geoChart'",
                                        items: [
                                            {
                                                key: 'metricType',
                                                feedback: false,
                                            }
                                        ]
                                    },
                                    {
                                        type: 'section',
                                        htmlClass: 'col-xs-12',
                                        items: [
                                            {
                                                type: "help",
                                                helpvalue: "<h5>Filter Fields</h5>"
                                            },
                                            {
                                                key: 'areFilterFiledsEnabled',
                                                type: 'checkbox'
                                            },
                                            {
                                                condition: "model.areFilterFiledsEnabled == true",
                                                key: "filterFields",
                                                title: " ",
                                                add: "Add",
                                                style: {
                                                    "add": "btn-success"
                                                },
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
                                                                        key: 'filterFields[].filterColumn',
                                                                        htmlClass: 'col-xs-4',
                                                                        options: {
                                                                           filterTriggers: ["model.dataSource"],
                                                                           filter:"true",
                                                                           asyncCallback: function(){return $scope.getReportColumnsDynamic(config.definitionModel, false)},
                                                                           placement: 'left',
                                                                           asyncReloadOnFilterTrigger: true
                                                                        },
                                                                        feedback: false,
                                                                        type: 'strapselect'
                                                                    },
                                                                    {
                                                                        key: 'filterFields[].filterOperator',
                                                                        htmlClass: 'col-xs-4',
                                                                        options: {
                                                                            callback: $scope.fieldFilterOperators
                                                                        },
                                                                        feedback: false,
                                                                        type: 'uiselect'
                                                                    },
                                                                    {
                                                                        key: 'filterFields[].filterValue',
                                                                        title: 'Alias',
                                                                        htmlClass: 'col-xs-4',
                                                                        placeholder: 'Enter Value',
                                                                        feedback: false
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ],
                                                remove: true
                                            }
                                        ]
                                    },
                                    {
                                        type: "section",
                                        htmlClass: "col-xs-12",
                                        condition: "model.chartType== 'lineChart'",
                                        items: [

                                            {
                                                key: 'splitDataBy',
                                                feedback: false,
                                                type: 'uiselect',
                                                options: {
                                                    callback: $scope.reportColumns,
                                                    eventCallback: function(value) {
                                                            if(typeof value == 'undefined')
                                                                $scope.config.definitionModel.splitDataBy = null;
                                                            }
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        type: 'section',
                                        htmlClass: "row",
                                        condition: "model.chartType=='pieChart' || model.chartType=='lineChart' || model.chartType=='discreteBarChart' ",
                                        items: [
                                            {
                                                type: "section",
                                                htmlClass: "col-xs-6",
                                                items: [
                                                    {
                                                        key: 'sort',
                                                        htmlClass: "col-xs-6",
                                                        onChange: function (modelValue, form) {
                                                            config.definitionModel.sortOrder = 'asc';
                                                            config.definitionModel.sortBy = 'x';
                                                        }
                                                    },
                                                    {
                                                        key: 'sortOrder',
                                                        htmlClass: 'col-xs-12 sort-options-radio',
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
                                                        htmlClass: 'col-xs-12 sort-options-radio',
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