var app = angular.module('dzupDash');

app.controller('DzupGenericDataSourceController', ['$scope', '$timeout', '$dzupConfigUtils', 'config', 'widget',
    function ($scope, $timeout, $dzupConfigUtils, config, widget) {
        $scope.config = config;
        $scope.widget = widget;
    }
]);


app.controller('DzupGenericDataSourceEditController', ['$scope', '$timeout', '$uibModal', '$dzupConfigUtils', 'config', 'widget', 'dzupDashboardWidgetHelper', '$dzupDashboard',
    function ($scope, $timeout, $uibModal, $dzupConfigUtils, config, widget, dzupDashboardWidgetHelper, $dzupDashboard) {
        $scope.config = config;
        $scope.widget = widget;
        $scope.AvailableReports = [];
        $scope.AvailableStreams = [];
        $scope.ReportPropeties = [];

        $scope.getAvailableReports = function (value, injectValue) {
            $scope.AvailableReports = $dzupDashboard.getReportsBySource(value).success(function (result) { return result; })
                .then(function (result) {
                    $scope.AvailableReports = _.map(result.data, function (x) { return { value: x, label: x } });
                    if (injectValue == true) {
                        $timeout(function () { //the code which needs to run after dom rendering
                            $scope.schema.properties.report.items = $scope.AvailableReports;
                        })
                    }
                    return $scope.AvailableReports;
                });
        }

        $scope.getAvailableStreams = function (value, injectValue) {
            var execCall = null;
            if (value === 'scheduled') {
                execCall = $dzupDashboard.getScheduledStreams;
            }
            else {
                execCall = $dzupDashboard.getRegularStreams;
            }

            $scope.AvailableStreams = execCall().success(function (result) { return result; })
                .then(function (result) {
                    $scope.AvailableStreams = _.map(result.data.list, function (x) { return { value: x.streamId, label: x.keyword } });
                    if (injectValue == true) {
                        $timeout(function () { //the code which needs to run after dom rendering
                            $scope.schema.properties.stream.items = $scope.AvailableStreams;
                        })
                    }
                    return $scope.AvailableStreams;
                });
        }

        $scope.getReportPropeties = function () {
            $scope.ReportPropeties = dzupDashboardWidgetHelper.getWidgetReportColumns(
                config.definitionModel.reportSource,
                config.definitionModel.stream,
                config.definitionModel.report)
                .then(function (result) {
                    $scope.ReportPropeties = result.columns;
                    console.log($scope.ReportPropeties);

                    $timeout(function () { //the code which needs to run after dom rendering
                        $scope.schema.properties.filterFields.items.properties.fieldProperty.items = $scope.ReportPropeties;
                    })

                    return $scope.ReportPropeties;

                });
        }

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

        if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.reportSource != 'undefined'
            && config.definitionModel.reportSource != null) {
            $scope.getAvailableReports(config.definitionModel.reportSource, false);
        }

        if (typeof config.definitionModel != 'undefined' && typeof config.definitionModel.streamType != 'undefined'
            && config.definitionModel.streamType != null) {
            $scope.getAvailableStreams(config.definitionModel.streamType, false);
        }

        $scope.config.definitionModel = $scope.config.definitionModel || {};

        $scope.StreamTypes = [{ value: "scheduled", label: "Scheduled" }, { value: "regular", label: "Regular" }];

        $scope.AvailableSources = [{ value: "twitter_stream", label: "Twitter stream" }, { value: "user_log", label: "User Log" }];

        $scope.FieldFilterOperators = [
            { value: "equal", label: "Equal" },
            { value: "nonequal", label: "Non-Equal" },
            { value: "gt", label: "Greater Than" },
            { value: "lt", label: "Less Than" },
            { value: "contains", label: "Contains" },
            { value: "notcontains", label: "Does Not Contain" }];

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
                    validationMessage:'Required'
                    //required: true
                },
                report: {
                    type: 'string',
                    title: 'Report',
                    format: "uiselect",
                    placeholder: 'Select Report',
                    description: 'Existing report that will be data source for the charts',
                    default: null,
                    validationMessage:'Required'
                    //required: true
                },
                streamType: {
                    type: 'string',
                    title: 'Stream Type',
                    format: "uiselect",
                    placeholder: 'Select Stream Type',
                    description: '',
                    default: null,
                    validationMessage:'Required'
                    //required: true
                },
                stream: {
                    type: 'string',
                    title: 'Stream',
                    format: "uiselect",
                    placeholder: 'Select Stream',
                    description: '',
                    default: null,
                    validationMessage:'Required'
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
                    description: 'Use this to define fields that will be shown on report to filter the data',
                    items: {
                        type: "object",
                        properties: {
                            fieldProperty: {
                                type: 'string',
                                title: 'Report Property',
                                format: "uiselect",
                                placeholder: 'Select Property',
                                description: '',
                                default: null,
                                validationMessage:'Required'
                                //required: true
                            },
                            fieldOperator: {
                                type: 'string',
                                title: 'Operator',
                                format: "uiselect",
                                placeholder: 'Select Operator',
                                description: '',
                                default: null,
                                validationMessage:'Required'
                                // required: true,
                            },
                            fieldVlaue: {
                                type: "string",
                                title: "Valued",
                                // required: true
                            }
                        }
                    },

                },
                dateRange: {
                    type: 'string',
                    title: 'Date',
                    format: 'datepicker',
                    placeholder: 'Start Date - End Date',
                    dateformat: 'DD/MM/YYYY',
                }
            },
            required: [
                "reportSource",
                "report",
                "stream",
                "streamType",
                "fieldVlaue"
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
                                                                    callback: $scope.AvailableReports
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
                                                                key: 'streamType',
                                                                options: {
                                                                    callback: $scope.StreamTypes,
                                                                    eventCallback: function (value) {
                                                                        if (typeof value != 'undefined') {
                                                                            $scope.getAvailableStreams(value, true);
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
                                                                key: 'stream',
                                                                options: {
                                                                    callback: $scope.AvailableStreams
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
                                ]
                            },
                            {
                                type: 'section',
                                htmlClass: 'row',
                                condition: "false",
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
                                                type: "help",
                                                helpvalue: "<h5>Date Range Filter</h5>"
                                            },
                                            {
                                                key: 'dateRange',
                                                type: 'datepicker'
                                            },
                                            {
                                                key: 'title'
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
                                                type: 'checkbox',
                                                onChange: function (value) {
                                                    if (value) {
                                                        $scope.getReportPropeties();
                                                    }
                                                }
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
                                                                        key: 'filterFields[].fieldProperty',
                                                                        htmlClass: 'col-xs-4',
                                                                        options: {
                                                                            callback: $scope.ReportPropeties,
                                                                        },
                                                                        feedback: false,
                                                                        type: 'uiselect'
                                                                    },
                                                                    {
                                                                        key: 'filterFields[].fieldOperator',
                                                                        htmlClass: 'col-xs-4',
                                                                        options: {
                                                                            callback: $scope.FieldFilterOperators,
                                                                        },
                                                                        feedback: false,
                                                                        type: 'uiselect'
                                                                    },
                                                                    {
                                                                        key: 'filterFields[].fieldValue',
                                                                        title: 'Value',
                                                                        htmlClass: 'col-xs-4',
                                                                        placeholder: 'Enter Value'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ],
                                                //startEmpty: true,
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

        config.definitionModel.validateForm = function (){
            $scope.$broadcast('schemaFormValidate');
        }

        if (config.changesApplied == true && typeof config.definitionModel != 'undefined' && typeof config.definitionModel.reportSource != 'undefined'
            && typeof config.definitionModel.report != 'undefined' && config.definitionModel.reportSource != null && config.definitionModel.report != null) {
            config.changesApplied = false;
            dzupDashboardWidgetHelper.addDashboardWidget(widget);

            $dzupDashboard.getReport(config.definitionModel.reportSource, config.definitionModel.stream, config.definitionModel.report).success(function (result) {
                dzupDashboardWidgetHelper.setWidgetData(widget.wid, result)
            });

        }

    }
]);
