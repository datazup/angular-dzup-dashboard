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
                case 'radarChart':
                    return this.getRadarChart();
                    break;
                case 'geoChart':
                    return this.getGeoChart();
                    break;
                default:
                    return null;
            }
        },
        getMappedChartData: function (data, chartOptions) {

            var from = parseInt(chartOptions.from);
            var to = parseInt(chartOptions.to);

            var mappedData = _.chain(data)
                .groupBy(chartOptions.xAxis)
                .map(function (value, key) {
                    return _.reduce(value, function (result, currentObject) {
                        return {
                            x: currentObject[chartOptions.xAxis],
                            y: result["y"] + currentObject[chartOptions.yAxis]
                        }
                    }, {
                        y: 0
                    });
                });


            if (chartOptions.sort == true && chartOptions.sortOrder == 'asc') {
                return mappedData.sortBy(chartOptions.sortBy).slice(from, to).value();
            } else if (chartOptions.sort == true && chartOptions.sortOrder == 'desc') {
                return mappedData.sortBy(chartOptions.sortBy).reverse().slice(from, to).value();
            } else {
                return mappedData.slice(from, to).value();
            }
        },
        getMappedLineChartData: function (data, chartOptions) {
           data = _.sortBy(data, function(item) {
               return [item.x, item.y];
            });

            return data;
        },
        getMappedRadarChartData: function (data, chartOptions) {
            return data;
        },
        getMappedRadarChartDataMultiXaxis: function (data, chartOptions) {

               var mappedData =  _.chain(data).map(function (value, key) {
                   var arrVal = [];
                   for (var prop in value) {
                   if(prop != "Language")
                     arrVal.push({ label: prop, value:value[prop]})

                   }
                   return {subList:arrVal};
               }).value();

              var subData = []
              for(var i=0; i< mappedData.length;i++ ){
                      for(var y=0; y< mappedData[i].subList.length;y++ ){
                        subData.push(mappedData[i].subList[y]);
                      }
              }

              mappedData = _.chain(subData)
                              .groupBy("label")
                              .map(function (value, key) {
                                  return _.reduce(value, function (result, currentObject) {
                                  console.log("val:")
                                  console.log(currentObject["value"]);
                                      return {
                                          label: currentObject["label"],
                                          value: result["y"] + currentObject["value"]
                                      }
                                  }, {
                                      y: 0
                                  });
                              }).value();

             return mappedData;
        },
        getChartData: function (data, chart, options) {

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

            if (chart.chart.type == 'pieChart') {
                return this.getMappedChartData(data, options);
            }

            if (chart.chart.type == 'radarChart') {
                if(options.splitDataBy && options.splitDataBy !="" ){
                   var splitteditems = [];
                   for(var i=0;i<data.length; i++){
                          var setKey = data[i][options.splitDataBy];

                          var setResult  = this.getMappedRadarChartData(data[i]["data"],options);
                          splitteditems.push({values:setResult, key:setKey})
                   }
                   return splitteditems;
                }else{ //TO DO
                    return [{
                        values: [],
                        key: options.key,
                        color: options.color
                    }];
                }

            }

            if (chart.chart.type == 'lineChart' ) {
                if(options.splitDataBy && options.splitDataBy !="" ){
                   var splitteditems = [];
                   for(var i=0;i<data.length; i++){
                          var setKey = data[i][options.splitDataBy];
                          var setResult  = this.getMappedLineChartData(data[i]["data"],options);
                          splitteditems.push({values:setResult, key:setKey})
                   }
                   return splitteditems;
                }else{
                    return [{
                        values: this.getMappedLineChartData(data, options),
                        key: options.key,
                        color: options.color
                    }];
                }

            }

            if(chart.chart.type == 'discreteBarChart'){
                return [{
                    values: this.getMappedChartData(data, options),
                    key: options.key,
                    color: options.color
                }];
            }

            if (chart.chart.type==='radarChart'){
                var obj = {};
                
                return obj;
            }
            if (chart.chart.type==='geoChart'){
                var obj = {};
                
                return obj;
            }
        },
        getPieChart: function () {
            var pieChartType = {
                chart: {
                    type: 'pieChart',
                    height: 500,
                    // width: 500,
                    // margin: {
                    //     right: 'auto',
                    //     left: 'auto'
                    // },
                    x: function (d) {
                        return d.x;
                    },
                    y: function (d) {
                        return d.y;
                    },
                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 5,
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
            };

            return pieChartType;
        },
        getLineChart: function () {
            var lineChartType = {
                chart: {
                    type: 'lineChart',
                    height: 450,
                    // width: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 55
                    },
                    x: function (d) { if(d && d.x){return d.x;} else {return null;}},
                    y: function (d) { if(d && d.y){return d.y;} else {return null;}},
                    useInteractiveGuideline: true,
                    dispatch: {
                        stateChange: function (e) {
                        },
                        changeState: function (e) {
                        },
                        tooltipShow: function (e) {
                        },
                        tooltipHide: function (e) {
                        }
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
                    x: function (d) {
                        return d.x;
                    }, //label
                    y: function (d) {
                        return d.y;
                    }, //value
                    showValues: true,
                    valueFormat: function (d) {
                        return d3.format(',.2f')(d);
                    },
                    duration: 500,
                    xAxis: {
                        axisLabel: 'X Axis',
                        rotateLabels: 45
                    },
                    yAxis: {
                        axisLabel: 'Y Axis',
                        axisLabelDistance: -10
                    }
                },
                title: {
                    enable: false,
                    text: ''
                }
            };
            return discreteBarChart;
        },
        getRadarChart: function(){
            var radarChart = {
                chart: {
                    type: 'radarChart',
                    height: 350,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 70
                    },
                    radiusFix: 100,
                    max: 100,
                    ticks: 10,
                    showLegend: true, 
                    tooltips: true
                },
                title: {
                    enable: false,
                    text: ''
                }
            };
            
            return radarChart;
        },
        getGeoChart: function(){
            var geoChart = {
                chart: {
                    type: 'geoChart',
                    keepAspectRatio: true
                },
                title: {
                    enable: false,
                    text: ''
                }
            };
            
            return geoChart;
        }
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
    var callList = [];
    var publicIdentifier = null;
    var publicStreams = [];
    var areAllRegularStreamsAllowed = [];
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
        setCall: function (identifier, data) {

            var promise = {identifier: identifier, data: data};
            if (typeof promise != 'undefined') {
                var index = _.indexOf(this.callList, _.find(this.callList, {identifier: promise.identifier}));
                if (index != -1) {
                    this.callList.splice(index, 1, promise);
                }
                else {
                    this.callList.push(promise);
                }
            }
        },
        removeCall: function (identifier) {
            var index = _.indexOf(this.callList, _.find(this.callList, {identifier: identifier}));
            if (index != -1) {
                this.callList.splice(index, 1);
            }
        },
        getPromise: function (identifier) {
            var index = _.indexOf(this.callList, _.find(this.callList, {identifier: identifier}));
            if (index != -1) {
                return this.callList[index].data
            }
            return null;
        },
        setWidgetData: function (wid, data) {

            var WData = {wid: wid, data: data};
            if (typeof WData != 'undefined') {
                var index = _.indexOf(this.widgetsData, _.find(this.widgetsData, {wid: WData.wid}));
                if (index != -1) { // widget array contains widget replace is
                    this.widgetsData.splice(index, 1, WData);
                }
                else {
                    this.widgetsData.push(WData);
                }
            }
        },
        removeWidgetData: function (wid) {
            var index = _.indexOf(this.widgetsData, _.find(this.widgetsData, {wid: wid}));
            if (index != -1) { // widget array contains widget replace is
                this.widgetsData.splice(index, 1);
            }
        },
        getWidgetData: function (definitionModel, reportColumnsReq) {
           var deferred = new $.Deferred();
            var self = this;
            var dataSourceWidgetIndex = _.indexOf(self.widgets, _.find(self.widgets, {wid: definitionModel.dataSource}));

            if (dataSourceWidgetIndex != -1) {
                var dataSourceWidget = self.widgets[dataSourceWidgetIndex];

                var aggregateGroupBy =  [];
                if(definitionModel.chartType == 'tableChart'){
                     aggregateGroupBy =  definitionModel.tableColumns;
                }else{
                     aggregateGroupBy =  _.map(definitionModel.aggregateAxis,function(x){ return x.xAxisAg});
                }

                var parameters = {
                    reportSource: dataSourceWidget.config.definitionModel.reportSource,
                    stream: dataSourceWidget.config.definitionModel.stream,
                    reportName: dataSourceWidget.config.definitionModel.report,
                    aggregateGroupBy: aggregateGroupBy,
                    orderBy: definitionModel.yAxis,
                    from: definitionModel.from,
                    to: definitionModel.to,
                    splitDataBy: definitionModel.splitDataBy,
                    streamType: (typeof dataSourceWidget.streamType != 'undefined') ? dataSourceWidget.streamType.toUpperCase(): null,
                    dynamicFilters: [],
                    chartType:definitionModel.chartType,
                    ascDesc: definitionModel.ascDesc,
                    primaryOrderBy: definitionModel.primaryOrderBy,
                    reportColumnsOnly: reportColumnsReq,
                    dateRange:[],
                    publicIdentifier: this.getPublicIdentifier()
                };

                //data source filters
                if (dataSourceWidget.config.definitionModel.filterFields) {
                    for (var i = 0; i < dataSourceWidget.config.definitionModel.filterFields.length; i++) {
                        if(dataSourceWidget.config.definitionModel.filterFields[i].filterValue && dataSourceWidget.config.definitionModel.filterFields[i].filterValue !="")
                        {
                            var item = angular.copy(dataSourceWidget.config.definitionModel.filterFields[i]);
                            var numValue = Number(item.filterValue);
                            if(!isNaN(numValue)){
                               item.filterValue = numValue;
                            }
                            parameters.dynamicFilters.push(item);
                        }
                    }
                }

                //chart filters
                if(definitionModel.filterFields && definitionModel.filterFields.length > 0){
                    for(var i = 0; i < definitionModel.filterFields.length; i++){
                        if(definitionModel.filterFields[i].filterValue && definitionModel.filterFields[i].filterValue !="")
                        {
                            var item = angular.copy(definitionModel.filterFields[i]);
                            var numValue = Number(item.filterValue);
                            if(!isNaN(numValue)){
                               item.filterValue = numValue;
                            }
                            parameters.dynamicFilters.push(item);
                        }
                    }
                }

                if(dataSourceWidget.config.definitionModel.dateRange && dataSourceWidget.config.definitionModel.dateRange !=""){
                    var dataRange = dataSourceWidget.config.definitionModel.dateRange.split(" - ");
                    if(dataRange.length == 2){
                        var dateFrom = new Date(dataRange[0]);
                        var dateTo =  new Date(dataRange[1]);
                        if(dateFrom != "Invalid Date" && dateTo != "Invalid Date"){
                            parameters.dateRange.push(dateFrom);
                            parameters.dateRange.push(dateTo);
                        }
                    }

                }

                return $dzupDashboard.getReport(parameters).then(function (result) {
                    return deferred.resolve(result);
                });
            }
            else {
                return deferred.resolve(null);
            }
            return deferred.promise();
        },

        getWidgetReportColumns: function (reportSource, report, reportColumnsOnly) {
            var parameters = {
                reportSource: reportSource,
                reportName: report,
                reportColumnsOnly: reportColumnsOnly
            };

            var deferred = new $.Deferred();

            return $dzupDashboard.getReport(parameters).then(function (result) {
                return deferred.resolve(result.data.columns);
            });

            return deferred.promise();

        },
        addDashboardWidget: function (widget) {

            var index = _.indexOf(this.widgets, _.find(this.widgets, {wid: widget.wid}));

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
            this.callList = [];
        },
        getWidgets: function () {
            return this.widgets;
        },
        getWidgetsByType: function (widgetType) {
            return _.filter(this.widgets, function (item) {
                return item.type == widgetType
            });
        },
        setPublicConf: function(publicIdentifier, publicStreams, areAllRegularStreamsAllowed){
            this.publicIdentifier = publicIdentifier;
            this.publicStreams = publicStreams;
            this.areAllRegularStreamsAllowed = areAllRegularStreamsAllowed;
        },
        getPublicIdentifier: function(){
            return this.publicIdentifier;
        },
        getPublicStreams: function(value){
            return this.publicStreams;
        },
        getAreAllRegularStreamsAllowed: function(value){
            return this.areAllRegularStreamsAllowed;
        }
    };

}]);
