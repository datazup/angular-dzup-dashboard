var app = angular.module('dzupDash');

app.controller('DzupGenericDataSourceController', ['$scope', '$rootScope', '$timeout', '$dzupConfigUtils', 'config', 'widget', '$dzupDashboard', 'dzupDashboardWidgetHelper',
    function ($scope, $rootScope, $timeout, $dzupConfigUtils, config, widget, $dzupDashboard, dzupDashboardWidgetHelper) {
        $scope.config = config;
        $scope.widget = widget;
        $scope.StreamTypes = [];
        $scope.AvailableStreams = [];

        $scope.refresh = function () {
        
            $scope.getData(widget, config);
            dzupDashboardWidgetHelper.removeWidgetData(widget.wid);
            $rootScope.$broadcast('widgetStreamChanged', widget.wid);
        };

        $scope.getData = function (widget, config) {
            if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.reportSource != 'undefined'
                && typeof config.definitionModel.report != 'undefined' && config.definitionModel.reportSource != null && config.definitionModel.report != null) {

                dzupDashboardWidgetHelper.addDashboardWidget(widget);
            }
        };


        $scope.setStream = function (item) {
            var value = item.value;

            if (typeof value != 'undefined') {
                var streamObj = _.find($scope.AvailableStreams, {value: value});

                widget.stream = value;
                widget.config.definitionModel.streamType = config.definitionModel.streamType = streamObj.streamType;
                widget.config.definitionModel.stream = config.definitionModel.stream = value;
                $scope.getData(widget, config);
                dzupDashboardWidgetHelper.removeWidgetData(widget.wid);
                $rootScope.$broadcast('widgetStreamChanged', widget.wid);
            }
        }

        $scope.getAvailableStreams = function (item, injectValue) {
            var value = item.value.toLowerCase();
            widget.streamType = config.definitionModel.streamType = value;

            var execCall = null;
            if (value === 'scheduled') {
                execCall = $dzupDashboard.getScheduledStreams;
            }
            else {
                execCall = $dzupDashboard.getRegularStreams;
            }

            execCall().success(function (result) {
                return result;
            })
                .then(function (result) {

                    $scope.AvailableStreams = _.map(result.data.list, function (x) {
                        return {value: x.streamId, label: x.keyword, streamType: x.type}
                    });

                    $timeout(function () {
                        if (!$scope.$$phase) $scope.$apply();


                        var selectedItem = _.find($scope.AvailableStreams, {'value': config.definitionModel.stream});
                        $scope.AvailableStreams.selected = selectedItem
                        $("#availableStreams-" + $scope.widget.wid).selectpicker("refresh");
                    });

                });
        };

        if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.streamType != 'undefined'
            && config.definitionModel.streamType != null) {
            var item = {value: config.definitionModel.streamType};
            $scope.getAvailableStreams(item, false);
        }
        $scope.StreamTypes = [{value: "scheduled", label: "Scheduled"}, {value: "regular", label: "Regular"}]
        if(typeof $scope.StreamTypes.selected == 'undefined' && config.definitionModel && config.definitionModel.streamType){

            $scope.StreamTypes.selected =  _.find($scope.StreamTypes, {'value': config.definitionModel.streamType});
        }
    }
]);


app.controller('DzupGenericDataSourceEditController', ['$scope', '$timeout', '$uibModal', '$dzupConfigUtils', 'config', 'widget', 'dzupDashboardWidgetHelper', '$dzupDashboard',
    function ($scope, $timeout, $uibModal, $dzupConfigUtils, config, widget, dzupDashboardWidgetHelper, $dzupDashboard) {
        $scope.config = config;
        $scope.widget = widget;
        $scope.AvailableReports = [];
        $scope.AvailableStreams = [];
        $scope.reportColumns = [];

        $scope.getAvailableReports = function (value, injectValue) {
            $scope.AvailableReports = $dzupDashboard.getReportsBySource(value).success(function (result) {
                return result;
            })
                .then(function (result) {
                    $scope.AvailableReports = _.map(result.data, function (x, y) {
                        return {value: y, label: x}
                    });

                    if (injectValue == true) {
                        $timeout(function () { //the code which needs to run after dom rendering
                            $scope.schema.properties.report.items = $scope.AvailableReports;
                        })
                    }
                    return $scope.AvailableReports;
                });
        }

        $scope.getReportColumns = function (resetFilter) {
            if(config.definitionModel.areFilterFiledsEnabled){
                $scope.reportColumns = dzupDashboardWidgetHelper.getWidgetReportColumns(config.definitionModel.reportSource, config.definitionModel.report, true);
                console.log($scope.reportColumns);
                $scope.defCopy = config.definitionModel;

                if(resetFilter)
                    $scope.config.definitionModel.filterFields = [{filterColumn:null,filterOperator:null, filterAlias:"" , filterValue:"" }];
            }

            return $scope.reportColumns;
        }

        $scope.getReportColumnsDynamic = function (resetFilter) {
                    //console.log($scope.form["0"].tabs[1].items["0"].items[2].items["0"].options);
                    if(!angular.equals(config.definitionModel, $scope.defCopy)){
                        $scope.reportColumns = $scope.getReportColumns();
                    }

                   if(typeof $scope.reportColumns.then == 'function'){
                         return $scope.reportColumns.then(function(result){
                             var items = _.map(result,function(item){ return { name:item, value: item}});
                             return {data:items};
                      });
                   }
                   else
                   {
                     return new Promise(function(resolve, reject) {
                         var items = _.map($scope.reportColumns,function(item){ return { name:item, value: item}});
                         resolve( {data:items});
                    });
                   }
                };

        $scope.fieldFilterOperators = [
            {value: "equal", label: "Equal"},
            {value: "nonequal", label: "Non-Equal"},
            {value: "gt", label: "Greater Than"},
            {value: "lt", label: "Less Than"},
            {value: "contains", label: "Contains"},
            {value: "notcontains", label: "Does Not Contain"}];


        $scope.createReport = function () {
            var modalInstance = $uibModal.open({
                templateUrl: $dzupConfigUtils.templateUrlBase['dzup-dashboard'] + '/templates/reports/report.modal.view.html',
                controller: 'ReportCreateEditController',
                backdrop: false,
                resolve: {
                    report: function () {
                        return {};
                    }
                },
                size: 'lg'
            });

            modalInstance.result.then(function (importedData) {

                if (importedData) {
                    $scope.getAvailableReports(config.definitionModel.reportSource, true);
                }
            }, function () {
            });
        };

        if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.reportSource != 'undefined'
            && config.definitionModel.reportSource != null) {
            $scope.getAvailableReports(config.definitionModel.reportSource, false);
        }

        if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.dataSource != 'undefined' && config.definitionModel.dataSource != null) {

            $scope.reportColumns = $scope.getReportColumns();
        }

        $scope.config.definitionModel = $scope.config.definitionModel || {};

        $scope.AvailableSources = $dzupDashboard.getSourcesStatic()


        $scope.schema = {
            type: 'object',
            properties: {
                reportSource: {
                    type: 'string',
                    title: 'Report Source',
                    format: "uiselect",
                    description: 'Report source defines stream data from which we want report to build',
                    placeholder: 'Select report source',
                    default: null,
                    validationMessage: 'Required'
                    //required: true
                },
                report: {
                    type: 'string',
                    title: 'Report',
                    format: "uiselect",
                    placeholder: 'Select Report',
                    description: 'Existing report that will be data source for the charts',
                    default: null,
                    validationMessage: 'Required'
                    //required: true
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
                            filterAlias: {
                                type: "string",
                                title: "Alias"
                            },
                            filterValue: {
                                type: "string",
                                title: "Value",
                                disableErrorState : true
                            }
                        }
                    },
                },
                dateRange: {
                    type: 'string',
                    title: 'Date',
                    format: 'datepicker',
                    default: "",
                    placeholder: 'Start Date - End Date',
                    dateformat: 'DD/MM/YYYY',
                }
            },
            required: [
                "reportSource",
                "report"
            ]
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
                                        type: 'section',
                                        htmlClass: "col-xs-12",
                                        items: [
                                            {
                                                type: 'section',
                                                htmlClass: 'row',
                                                items: [
                                                    {
                                                        type: "section",
                                                        htmlClass: "col-xs-6",
                                                        items: [
                                                            {
                                                                key: 'reportSource',
                                                                options: {
                                                                    callback: $scope.AvailableSources,
                                                                    eventCallback: function (value) {
                                                                        if (typeof value != 'undefined') {
                                                                            $scope.getAvailableReports(value, true);
                                                                        }
                                                                    }
                                                                },
                                                                feedback: false,
                                                                type: 'uiselect'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        type: "section",
                                                        htmlClass: "col-xs-6",
                                                        items: [
                                                            {
                                                                key: 'report',
                                                                options: {
                                                                    callback: $scope.AvailableReports,
                                                                    eventCallback: function (value) {
                                                                        if (typeof value != 'undefined') {
                                                                            $scope.reportColumns = $scope.getReportColumns(true);
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
                                    }
                                ]
                            },
                            {
                                type: 'section',
                                htmlClass: 'row',
                                condition: "true",
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
                        title: 'Filters',
                        condition: 'false',
                        items: [
                            {
                                type: 'section',
                                htmlClass: 'row',
                                items: [

                                    /*{
                                        type: 'section',
                                        htmlClass: 'col-xs-12',
                                        items: [
                                            {
                                                type: "help",
                                                helpvalue: "<h5>Date Range Filter</h5>"
                                            },
                                            {
                                                key: 'dateRange',
                                                type: 'datepicker'
                                            }
                                        ]
                                    },*/
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
                                                                           filterTriggers: ["model.report"],
                                                                           filter:"true",
                                                                           asyncCallback: function(){return $scope.getReportColumnsDynamic(true)},
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
                                                                        key: 'filterFields[].filterAlias',
                                                                        title: 'Alias',
                                                                        htmlClass: 'col-xs-4',
                                                                        placeholder: 'Enter Alias',
                                                                        feedback: false
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ],
                                                condition: "model.areFilterFiledsEnabled == true",
                                                remove: true
                                            }
                                        ]
                                    }
                                ]
                            }

                        ]
                    }

                ]
            },

        ];
        tv4.addSchema('dataSourceSchema', $scope.schema);
        config.definitionModel.validateForm = function () {
            $scope.$broadcast('schemaFormValidate');
        }
    }
]);
