var app = angular.module('dzupDash');

app.controller('ReportCreateEditController', ['$scope', '$timeout', '$uibModalInstance', '$dzupConfigUtils', 'report','$dzupDashboard',
    function ($scope, $timeout, $uibModalInstance, $dzupConfigUtils, report, $dzupDashboard) {

        $scope.report = report;
        $scope.tabSelected = "Report";

        var data =  {
          "created_at": { type: 'time'},
          "id": 830021537210196000,
          "id_str": "830021537210195970",
          "text": "#JU112 Departure to Sarajevo | Scheduled 10-FEB 13:50 Gate C7 | REMARK: New time 14:05 (15 min late)",
          "source": "<a href=\"http://www.cpu.rs\" rel=\"nofollow\">BEGFlightsTG</a>",
          "truncated": false,
          "in_reply_to_status_id": null,
          "in_reply_to_status_id_str": null,
          "in_reply_to_user_id": null,
          "in_reply_to_user_id_str": null,
          "in_reply_to_screen_name": null,
          "user": {
            "id": 3124844584,
            "id_str": "3124844584",
            "name": "BEG Flights",
            "screen_name": "BEGFlights",
            "location": null,
            "url": null,
            "description": "Unofficial experimental feed provides latest status of flights going to/from Belgrade's Nikola Tesla airport.",
            "protected": false,
            "verified": false,
            "followers_count": 26,
            "friends_count": 0,
            "listed_count": 13,
            "favourites_count": 0,
            "statuses_count": 1344,
            "created_at": { type: 'time'},
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": false,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "profile_background_color": "C0DEED",
            "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_tile": false,
            "profile_link_color": "1DA1F2",
            "profile_sidebar_border_color": "C0DEED",
            "profile_sidebar_fill_color": "DDEEF6",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "profile_image_url": "http://pbs.twimg.com/profile_images/583204646111444992/NMSykPbg_normal.png",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/583204646111444992/NMSykPbg_normal.png",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/3124844584/1427882011",
            "default_profile": true,
            "default_profile_image": false,
            "following": null,
            "follow_request_sent": null,
            "notifications": null
          },
          "geo": null,
          "coordinates": null,
          "place": null,
          "contributors": null,
          "is_quote_status": false,
          "retweet_count": 0,
          "favorite_count": 0,
          "entities": {
            "hashtags": [
              {
                "text": "JU112",
                "indices": [
                  0,
                  6
                ]
              }
            ],
            "symbols": [
              {
                "text": "THIS",
                "indices": [
                  82,
                  87
                ]
              },
              {
                "text": "THAT",
                "indices": [
                  82,
                  87
                ]
              }
            ],
            "urls": [
              {
                "url": "http://t.co/tPLOXjoafD",
                "expanded_url": "http://goo.gl/nE2Uqa",
                "display_url": "goo.gl/nE2Uqa",
                "indices": [
                  87,
                  109
                ]
              }
            ],
            "user_mentions": [
              {
                "name": "Matt Harris",
                "id": 777925,
                "id_str": "777925",
                "indices": [
                  0,
                  14
                ],
                "screen_name": "themattharris"
              }
            ],
            "media": [
              {
                "display_url": "pic.twitter.com/Ob7J2oBWhq",
                "expanded_url": "https://twitter.com/realDonaldTrump/status/766801978085117952/video/1",
                "id": 766801621007294500,
                "id_str": "766801621007294464",
                "indices": [
                  117,
                  140
                ],
                "media_url": "https://pbs.twimg.com/ext_tw_video_thumb/766801621007294464/pu/img/0utktWvDSyGamM4m.jpg",
                "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/766801621007294464/pu/img/0utktWvDSyGamM4m.jpg",
                "sizes": {
                  "large": {
                    "h": 576,
                    "resize": "fit",
                    "w": 1024
                  },
                  "medium": {
                    "h": 338,
                    "resize": "fit",
                    "w": 600
                  },
                  "small": {
                    "h": 191,
                    "resize": "fit",
                    "w": 340
                  },
                  "thumb": {
                    "h": 150,
                    "resize": "crop",
                    "w": 150
                  }
                },
                "type": "photo",
                "url": "https://t.co/Ob7J2oBWhq"
              }
            ]
          },
          "favorited": false,
          "retweeted": false,
          "filter_level": "low",
          "lang": "en",
          "timestamp_ms": "1486727530182",
          "sentiment": 75,
          "sentimentPolarity": "POSITIVE",
          "country": null,
          "state": null,
          "city": null
        };

        getClientsReports =  function(){
              return $dzupDashboard.getClientReports().success(function (result) {

                   $scope.previousReports = result.list;
                   $timeout(function(){
                       if (!$scope.$$phase) $scope.$apply();

                       $("#selectedReport").selectpicker("refresh");
                   });
                });
        }

        $scope.newReport = function(){
             $scope.previousReports.selected = null;
             $timeout(function(){
                if (!$scope.$$phase) $scope.$apply();

                $("#selectedReport").selectpicker("refresh");
            });

             $scope.model = {};
             $scope.$broadcast('schemaFormRedraw');
        }

       $scope.removeReport = function(){
           var repId = $scope.previousReports.selected.id;
           $dzupDashboard.removeReport(repId).then(function(){
                getClientsReports().then(function(){$scope.newReport();});

           });
       }

        $scope.getReportDef = function(value, useTimeout)
        {
            if (typeof value != 'undefined') {
                var reportObj =  angular.copy(value);
                var model = {
                    name: reportObj.reportName,
                    description: reportObj.reportDescription,
                    reportSource: reportObj.reportSource,
                };
                var reportDef =  reportObj.report;
                var dim = [];
                var met = [];

                for(var i = 0; i<reportDef.dimensions.length; i++){
                     dim.push(getStructure(reportDef.dimensions[i]));
                }

                for(var j = 0; j<reportDef.metrics.length; j++){
                     met.push(getStructure(reportDef.metrics[j]));
                }

                model.dimensions = _.chain(dim).map(function(item){

                    return {
                        dimensionProperty: (typeof item.property != 'undefined') ? item.property : null,
                        dimensionType: (typeof item.property != 'undefined') ? item.type : null,
                        dimensionFunction: (typeof item.property != 'undefined') ? item.funcName: null,
                        valueR: (typeof item.parameters != 'undefined') && item.parameters.length > 1 ?item.parameters[1].replace("'#","").replace("#'",""): undefined,
                        captureGroup: (typeof item.parameters != 'undefined') && item.parameters.length > 2 ?item.parameters[2]: undefined,
                        dimensionAlias: (typeof item.property != 'undefined') ? item.alias: undefined
                    }
                }).value();

                model.metrics = _.chain(met).map(function(item){
                    return {
                        metricProperty: (typeof item.property != 'undefined') ? item.property : null,
                        metricType: (typeof item.property != 'undefined') ? item.type : null,
                        metricFunction: (typeof item.property != 'undefined') ? item.funcName: null,
                        metricAlias: (typeof item.property != 'undefined') ? item.alias: undefined
                    }
                }).value();
                $scope.model = {};
                $scope.model = model;
                if(useTimeout){
                     $timeout(function () {
                        $scope.$broadcast('schemaFormRedraw');
                    });
                }
                else{
                    $scope.$broadcast('schemaFormRedraw');
                }

             }

             return true;
        }

        $scope.getJsonReportDef = function(model){

            var dimensions = model.dimensions;
            var metrics = model.metrics;
            var report = {
                dimensions: [],
                metrics: []
            };

            for(i=0;i<dimensions.length;i++)
            {
                var dimensionItem = {};
                dimensionItem.type = dimensions[i].dimensionType;

                var dimensionFN = "$"+ dimensions[i].dimensionProperty + "$";
                if(typeof dimensions[i].dimensionFunction != 'undefined'){
                    if(dimensions[i].dimensionFunction == 'REGEX_EXTRACT'  || dimensions[i].dimensionFunction == 'REGEX_MATCH'){
                        if(dimensions[i].dimensionFunction == 'REGEX_EXTRACT' ){
                            var captureGroup = (typeof dimensions[i].captureGroup != 'undefined') ? "," +dimensions[i].captureGroup : "";
                            dimensionFN = dimensions[i].dimensionFunction + "("+ dimensionFN+ ", '#" + dimensions[i].valueR + "#'"+ captureGroup+")";
                        }
                        else{
                            dimensionFN = dimensions[i].dimensionFunction + "("+ dimensionFN+ ", '" + dimensions[i].valueR + "')";
                        }
                    }
                    else{
                        dimensionFN = dimensions[i].dimensionFunction + "("+ dimensionFN+ ")";
                    }
                }

                if(typeof dimensions[i].dimensionAlias != 'undefined' && dimensions[i].dimensionAlias != null){
                    dimensionItem.name = dimensions[i].dimensionAlias;
                    dimensionItem.func =  dimensionFN;
                }
                else{
                    dimensionItem.name = dimensionFN;
                }
                report.dimensions.push(dimensionItem);
            }

            for(i=0;i<metrics.length;i++)
            {
                var metricItem = {};
                metricItem.type = metrics[i].metricType;

                var metricFN = "$"+ metrics[i].metricProperty + "$";
                if(typeof metrics[i].metricFunction != 'undefined' && metrics[i].metricFunction != null){
                   metricFN = metrics[i].metricFunction + "("+ metricFN+ ")";
                }

                if(typeof metrics[i].metricAlias != 'undefined' && metrics[i].metricAlias != null){
                    metricItem.name = metrics[i].metricAlias;
                    metricItem.func =  metricFN;
                }
                else{
                    metricItem.name = metricFN;
                }

                report.metrics.push(metricItem);
            }

            return report;
        }

        function setCharAt(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substring(0,index) + chr + str.substring(index+1);
        }

        var getStructure = function(item)
        {
            //"REGEX_EXTRACT($source$, '#<a[^>]*?>(.*?)</a>#', 1)"
            var obj = { parameters:[], type: item.type};
            var func =  item.name;
            if(typeof item.func != 'undefined'){
                func = item.func;
                obj.alias = item.name;
            }
            var funcBody = func.substring(func.indexOf('('), func.lastIndexOf(')')+1);
            obj.funcName = func.replace(funcBody, "");

            funcBody = setCharAt(funcBody,funcBody.indexOf('('),"");
            funcBody = setCharAt(funcBody,funcBody.lastIndexOf(')'),"");

            var funcParameters = funcBody.split(",");

            for(var d = 0; d<funcParameters.length ; d++){
                  if(d==0){
                    obj.property = funcParameters[d].split('$').join('');
                  }
                  obj.parameters.push(funcParameters[d]);
            }

            return obj;
        }

        JSON.unflatten = function(data) {
            "use strict";
            if (Object(data) !== data || Array.isArray(data))
                return data;
            var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
                resultholder = {};
            for (var p in data) {
                var cur = resultholder,
                    prop = "",
                    m;
                while (m = regex.exec(p)) {
                    cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
                    prop = m[2] || m[1];
                }
                cur[prop] = data[p];
            }
            return resultholder[""] || resultholder;
        };

        JSON.flatten = function(data, options) {
            var result = {};
            function recurse (cur, prop) {
                if (Object(cur) !== cur) {
                    result[prop] = cur;
                } else if (Array.isArray(cur)) {
                     for(var i=0, l=cur.length; i<l; i++)
                         recurse(cur[i], prop + "[" + (options.ignoreArrayPosition == true?"":i )+ "]");
                    if (l == 0)
                        result[prop] = [];
                } else {
                    var isEmpty = true;
                    for (var p in cur) {
                        isEmpty = false;
                        recurse(cur[p], prop ? prop+"."+p : p);
                    }
                    if (isEmpty && prop)
                        result[prop] = {};
                }
            }
            recurse(data, "");
            return result;
        }

        $scope.previousReports = [];

        getClientsReports();

        $scope.AvailableSources =  $dzupDashboard.getSourcesStatic();
        $scope.sourceOptions = _.chain(JSON.flatten(data, {ignoreArrayPosition:true}))
                                .map(function (value, key) {
                                   return {
                                           value: key,
                                           label: key
                                       }
                               }).value();
        $scope.reportTypes = [{ value: "VARCHAR", label: "VARCHAR" },{ value: "TINYINT", label: "TINYINT" },
                              { value: "INTEGER", label: "INTEGER" },{ value: "FLOAT", label: "FLOAT" }];

         $scope.dimensionFunctions = [{ value: "MINUTE", label: "Minute" },{ value: "HOUR", label: "Hour" },{ value: "DAY", label: "Day" },
         { value: "WEEK", label: "Week" },{ value: "MONTH", label: "Month" },{ value: "YEAR", label: "Year" },
         { value: "STR_TO_DATE_TIMESTAMP", label: "String to Date Timestamp" },{ value: "NOW", label: "Now" },{ value: "SIZE_OF", label: "Size Of" },
         { value: "IS_NULL", label: "Is Null" },{ value: "REGEX_MATCH", label: "Regex Match" },{ value: "REGEX_EXTRACT", label: "Regex Extract" },
         { value: "EQUAL", label: "Equal" },{ value: "NOT_EQUAL", label: "Not Equal" }];

        $scope.metricFunctions = [{ value: "SUM", label: "Sum" },{ value: "AVG", label: "Average" },
                                  { value: "MAX", label: "Max" },{ value: "MIN", label: "Min" },
                                  { value: "COUNT", label: "Count" },{ value: "LAST", label: "Last" }];

        $scope.schema = {
            type: 'object',
            properties: {
                jsonEditor: {
                    type: 'string',
                    title: null,
                    format: 'ace'

                },
                reportSource: {
                    type: 'string',
                    title: 'Report Source',
                    format: "uiselect",
                    placeholder: 'Select report source',
                    default: null,
                    required: true
                },
                name: {
                    type: 'string',
                    title: 'Report Name',
                    default: null,
                    required: true
                },
                description:{
                    type: 'string',
                    title: 'Description',
                    default: "",
                    required: false
                },
                 primaryTimeDimension:{
                    type: 'string',
                    title: 'Primary Time Dimension',
                    format: "uiselect",
                    placeholder: 'Select a primary time dimension',
                    default: null,
                    required: true
                },
                dimensions: {
                    type: "array",
                    items: {
                        type: "object",
                        required: [
                        ],
                        properties: {
                            dimensionProperty: {
                                type: 'string',
                                title: 'Dimension Property',
                                format: "uiselect",
                                placeholder: 'Select a property',
                                default: null,
                                required: true
                            },
                            dimensionType: {
                                type: 'string',
                                title: 'Dimension Type',
                                format: "uiselect",
                                placeholder: 'Select a type',
                                default: null,
                                required: true
                            },
                            dimensionFunction: {
                                type: 'string',
                                title: 'Dimension Function',
                                format: "uiselect",
                                placeholder: 'Select a function',
                                default: null,
                                required: false
                            },
                            valueR: {
                                type: 'string',
                                title: 'Value',
                                default: "",
                                required: true
                            },
                            captureGroup: {
                                type: 'string',
                                title: 'Capture Group',
                                default: "",
                                required: false
                            },
                            dimensionAlias: {
                                type: 'string',
                                title: 'Column Name',
                                default: "",
                                required: false
                            }

                        }
                    }
                },
                metrics: {
                    type: "array",
                    items: {
                        type: "object",
                        required: [
                        ],
                        properties: {
                            metricProperty: {
                                type: 'string',
                                title: 'Metric Property',
                                format: "uiselect",
                                placeholder: 'Select a property',
                                default: null,
                                required: true
                            },
                            metricType: {
                                type: 'string',
                                title: 'Metric Type',
                                format: "uiselect",
                                placeholder: 'Select a type',
                                default: null,
                                required: true
                            },
                            metricFunction: {
                                type: 'string',
                                title: 'Metric Function',
                                format: "uiselect",
                                placeholder: 'Select a function',
                                default: null,
                                required: false
                            },
                            metricAlias: {
                                type: 'string',
                                title: 'Column Name',
                                default: "",
                                required: false
                            }
                        }
                    }
                }
            }
        };

        $scope.form = [
                    {
                        type: 'tabs',
                         htmlClass: "dzup-tab",
                        tabs: [
                            {
                                title: 'Report',
                                click: function(){
                                    if($scope.tabSelected != "Report"){
                                        $scope.tabSelected = "Report";

                                        try {
                                                var result = JSON.parse(angular.copy($scope.model.jsonEditor));
                                                var jsonModel = {
                                                     reportName: $scope.model.name,
                                                     reportDescription: $scope.model.description,
                                                     reportSource: $scope.model.reportSource,
                                                     report: result
                                                 };
                                                 $scope.getReportDef(jsonModel, true);
                                            } catch (e) {
                                                console.log(e);
                                                return false;
                                            }
                                    }
                                },
                                items: [
                                    {
                                        type: 'section',
                                        htmlClass: "row",
                                        items: [
                                            {
                                                type: 'section',
                                                htmlClass: "col-xs-12",
                                                items:[
                                                    {
                                                        type: "section",
                                                        htmlClass: "col-xs-6",
                                                        items: [
                                                            {
                                                                key: 'reportSource',
                                                                options: {
                                                                    callback: $scope.AvailableSources
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
                                                                key: 'name',
                                                                feedback: false,
                                                                type: 'string'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                type: 'section',
                                                htmlClass: "col-xs-12",
                                                items:[
                                                    {
                                                            type: "section",
                                                            htmlClass: "col-xs-6",
                                                            items: [
                                                                {
                                                                    key: 'description',
                                                                    feedback: false
                                                                }
                                                            ]
                                                        },
                                                    {
                                                        type: "section",
                                                        htmlClass: "col-xs-6",
                                                        items: [
                                                            {
                                                                key: 'primaryTimeDimension',
                                                                options: {
                                                                    callback: $scope.AvailableSources,
                                                                 eventCallback: function (value) {
                                                                     console.log("value: " + value);
                                                                 }
                                                                },
                                                                feedback: false,
                                                                type: 'uiselect',
                                                                condition:"false"
                                                            }
                                                        ]
                                                    },
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        type: 'section',
                                        items:[
                                        {
                                            key:'dimensions',
                                            title:'Dimensions',
                                            add: "Add",
                                            style: {
                                                "add": "btn-success"
                                            },
                                            items:[
                                            {
                                                type:'section',
                                                htmlClass:'row',
                                                items:[{
                                                   type:'section',
                                                   htmlClass:'col-xs-12',
                                                   items: [
                                                       {
                                                           key: 'dimensions[].dimensionProperty',
                                                           options: {
                                                               callback: $scope.sourceOptions
                                                           },
                                                           feedback: false,
                                                           type: 'uiselect',
                                                           htmlClass: "col-xs-4",
                                                       },
                                                       {
                                                           key: 'dimensions[].dimensionType',
                                                           options: {
                                                               callback: $scope.reportTypes
                                                           },
                                                           feedback: false,
                                                           type: 'uiselect',
                                                           htmlClass: "col-xs-4",
                                                       },
                                                       {
                                                           htmlClass: "col-xs-4",
                                                           key: 'dimensions[].dimensionFunction',
                                                           titleMap: $scope.dimensionFunctions,
                                                           options: {
                                                               callback: $scope.dimensionFunctions
                                                           },
                                                           feedback: false,
                                                           type: 'uiselect'
                                                       },
                                                       {
                                                          key: 'dimensions[].valueR',
                                                          feedback: false,
                                                          condition: "(model.dimensions[arrayIndex].dimensionFunction == 'REGEX_EXTRACT') || (model.dimensions[arrayIndex].dimensionFunction == 'REGEX_MATCH')",
                                                          htmlClass: "col-xs-4"
                                                       },
                                                       {
                                                          key: 'dimensions[].captureGroup',
                                                          feedback: false,
                                                          condition: "(model.dimensions[arrayIndex].dimensionFunction == 'REGEX_EXTRACT')",
                                                          htmlClass: "col-xs-4"
                                                       },
                                                       {
                                                          key: 'dimensions[].dimensionAlias',
                                                          feedback: false,
                                                          type: 'string',
                                                          htmlClass: "col-xs-4"
                                                       }
                                                   ]
                                               }]
                                            }
                                            ]
                                        }
                                    ]
                                    },
                                    {
                                        type: 'section',
                                        items:[
                                        {
                                            key:'metrics',
                                            title:'Metrics',
                                            add: "Add",
                                            style: {
                                                "add": "btn-success"
                                            },
                                            items:[
                                            {
                                                type:'section',
                                                htmlClass:'row',
                                                items:[{
                                                   type:'section',
                                                   htmlClass:'col-xs-12',
                                                   items: [
                                                       {
                                                           key: 'metrics[].metricProperty',
                                                           options: {
                                                               callback: $scope.sourceOptions
                                                           },
                                                           feedback: false,
                                                           type: 'uiselect',
                                                           htmlClass: "col-xs-4",
                                                       },
                                                       {
                                                           key: 'metrics[].metricType',
                                                           options: {
                                                               callback: $scope.reportTypes
                                                           },
                                                           feedback: false,
                                                           type: 'uiselect',
                                                           htmlClass: "col-xs-4",
                                                       },
                                                       {
                                                           htmlClass: "col-xs-4",
                                                           key: 'metrics[].metricFunction',
                                                           options: {
                                                               callback: $scope.metricFunctions
                                                           },
                                                           feedback: false,
                                                           type: 'uiselect'
                                                       },
                                                       {
                                                           key: 'metrics[].metricAlias',
                                                           feedback: false,
                                                           type: 'string',
                                                           htmlClass: "col-xs-4"
                                                       }
                                                   ]
                                               }]
                                            }
                                            ]
                                        }
                                    ]
                                    }
                                ]
                            },
                            {
                                title: 'Advanced',
                                type: "section",
                                click: function(){

                                    if($scope.tabSelected != "Advanced"){

                                        var result = $scope.getJsonReportDef(angular.copy($scope.model));
                                         $scope.tabSelected = "Advanced";
                                        $scope.model.jsonEditor =  JSON.stringify(result);

                                    }
                                },
                                items: [
                                    {
                                            type: "section",
                                            htmlClass: "row",
                                            items: [
                                                {
                                                    type: "section",
                                                    htmlClass: "col-xs-12 dzup-dash-json-editor",
                                                    items: [
                                                        {
                                                            key:"jsonEditor",
                                                            title: null
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

        $scope.infoConfig = {
            showSchemaInfo: true,
            isReadOnly: false,
            inputSchemaInfo: {
                properties: {},
                type: 'object'
            }
        };
        $scope.title = "Reports";

        tv4.addSchema('dynamicReportSchema', $scope.schema);

        $scope.save = function () {

            //validation
            var valMod = JSON.parse(JSON.stringify($scope.model));
            var schema =tv4.getSchema('dynamicReportSchema');
            var result = tv4.validateMultiple(valMod, schema, true);

            $scope.$broadcast('schemaFormValidate');
            if(valMod.metrics.length == 0  || valMod.dimensions.length == 0){
                result.valid = false;
            }

            if(!result.valid)
                return result.valid;

            //end validation

            var model = $scope.model;
            var report = $scope.getJsonReportDef(model);

            var dashItem = {
                id: "",
                reportName: model.name,
                reportDescription: model.description,
                reportSource: model.reportSource,
                report: report
            };

            console.log("dashItem:");
            console.log(dashItem);

            $dzupDashboard.createReport(dashItem).then(function(result){
                $scope.previousReports.push(result.data);
                $scope.newReport();
            });
        };

        $scope.close = function () {
            $uibModalInstance.close({
                value: true
            });
            /*$uibModalInstance.dismiss('cancel');*/
        };
    }
]);
