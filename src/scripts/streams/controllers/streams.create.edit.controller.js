var app = angular.module('dzupDash');

app.controller('StreamsConfigController', ['$scope', '$timeout', '$uibModalInstance','$dzupDashboard',
    function ($scope, $timeout, $uibModalInstance, $dzupDashboard) {
        $scope.scheduledStreams = [];
        $scope.AvailableSources = [];
        $scope.previousReports = [];

        $scope.getReports =  function(item){

            return $dzupDashboard.getReportsBySource(item.value).success(function (result) {return result; })
                .then(function (result) {

                  $scope.previousReports = _.map(result.data, function (x, y) {
                      return {id: y, reportName: x}
                  });

                  $timeout(function(){
                     if (!$scope.$$phase) $scope.$apply();

                     $("#selectedReport").selectpicker("refresh");
                 });
                 return $scope.previousReports;
            });
        }

        $scope.getScheduledStreamsDynamic = function (value, injectValue) {

            if(typeof $scope.scheduledStreams == 'undefined' || $scope.scheduledStreams.length == 0){
                   $scope.scheduledStreams = $dzupDashboard.getScheduledStreams().then(function(result){
                        result = result.data.list;
                        $scope.scheduledStreams = _.map(result, function (x) { return { value: x.streamId, name: x.keyword } });

                        return {data:$scope.scheduledStreams };
                   });
            }

            if(typeof $scope.scheduledStreams.then == 'function'){
                 return $scope.scheduledStreams;
            }
            else{
              return new Promise(function(resolve, reject) {resolve( {data:$scope.scheduledStreams});});
            }
        };

        $scope.AvailableSources = $dzupDashboard.getSourcesStatic();

        $scope.schema = {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    default: "",
                    required: true
                },
                reportId: {
                    type: 'string',
                    default: "",
                    required: true
                },
                reportSource: {
                    type: 'string',
                    title: 'Report Name',
                    default: null,
                    required: true
                },
                reportName: {
                    type: 'string',
                    title: 'Report Name',
                    default: null,
                    required: true
                },
                scheduledStream: {
                    type: 'array',
                    default:[],
                    title: 'Scheduled streams',
                    placeholder: 'Select Scheduled Streams that you wish to follow.',
                    validationMessage: "Required",
                    items: {type:"string"}
                },
                followAllRegularStreams:{
                    type: 'boolean',
                    title: 'Follow All Regular Streams',
                    description: '',
                    default: false,
                },
                followOnlyCompanyRegularStreams: {
                    type: 'boolean',
                    title: 'Follow Only Company Regular Streams',
                    description: '',
                    default: false,
                }
            }
        };

        $scope.form = [
            {
                type: 'tabs',
                htmlClass: "",
                tabs: [
                    {
                        title: 'Configuration for Regular and Scheduled Streams',
                        items:
                        [
                            {
                                type: 'section',
                                htmlClass: "row",
                                items: [
                                    {
                                        type: 'section',
                                        htmlClass: "col-xs-12",
                                        items: [
                                            {
                                                key: 'followAllRegularStreams',
                                                type: 'checkbox'
                                            },
                                            {
                                                key: 'followOnlyCompanyRegularStreams',
                                                type: 'checkbox',
                                                condition: "model.followAllRegularStreams != true",
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'section',
                                htmlClass: "row",
                                items: [
                                    {
                                        type: 'section',
                                        htmlClass: "col-xs-12",
                                        items: [
                                            {
                                                key: 'scheduledStream',
                                                type: 'strapselect',
                                                feedback: false,
                                                fieldHtmlClass:'dzup-strapselect dzup-strapselect-select',
                                                options: {

                                                      multiple: "true",
                                                      asyncCallback: function(){return $scope.getScheduledStreamsDynamic();
                                                      },
                                                      placement: 'left'
                                                }
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

        $scope.model = {};
        tv4.addSchema('dynamicReportStreamConfSchema', $scope.schema);

        $scope.getReportsStreamConf = function( value){
              var parameters = {
                    reportSource: $scope.AvailableSources.selected.value,
                    reportId: value.id
              }
              return $dzupDashboard.getReportStreamsConf(parameters).success(function (result) {

                   $scope.model = {};
                   $scope.model.followAllRegularStreams = false;
                   if(result.list.length > 0){
                        $scope.model = result.list[0].config;
                        $scope.model.id = result.list[0].id;
                   }
                   $scope.model.reportId = value.id;
                   $scope.model.reportName = value.reportName;
                   $scope.model.reportSource = $scope.AvailableSources.selected.value
                   $scope.$broadcast('schemaFormRedraw');
              });
        }

        $scope.save = function () {
            //validation
            var valMod = JSON.parse(JSON.stringify($scope.model));
            var schema =tv4.getSchema('dynamicReportStreamConfSchema');
            var result = tv4.validateMultiple(valMod, schema, true);

            $scope.$broadcast('schemaFormValidate');

            if(!result.valid)
                return result.valid;
            //end validation

            var model = angular.copy($scope.model);

            var confItem = {
                id: $scope.model.id,
                reportSource: model.reportSource,
                reportId: model.reportId,
                config: {
                    followAllRegularStreams: model.followAllRegularStreams ? model.followAllRegularStreams: false,
                    followOnlyCompanyRegularStreams: model.followOnlyCompanyRegularStreams ? model.followOnlyCompanyRegularStreams : false,
                    scheduledStream : model.scheduledStream ? model.scheduledStream : [],
                },
            };
            $dzupDashboard.insertReportStreamsConf(confItem).then(function(result){
                $scope.model.id = result.data.id;
            });
        };

        $scope.title = "Report Stream Configuration";

        $scope.close = function () {
            $uibModalInstance.close({
                value: true
            });
        };
    }
]);
