var app = angular.module('dzupDash');

app.controller('ReportCreateEditController', ['$scope', '$timeout', '$uibModalInstance', '$dzupConfigUtils', 'report','$dzupDashboard',
    function ($scope, $timeout, $uibModalInstance, $dzupConfigUtils, report, $dzupDashboard) {

        $scope.report = report;

        var data =  {
          "created_at": "Fri Feb 10 11:52:10 +0000 2017",
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
            "created_at": "Sat Mar 28 20:46:36 +0000 2015",
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

        $scope.PreviousReports = [];
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
                                  { value: "COUNT", label: "Count" },{ value: "LAST", label: "Last" }]

        $scope.AvailableSources =  $dzupDashboard.getSourcesStatic();

        $scope.schema = {
            type: 'object',
            properties: {
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
                },
                description:{
                    type: 'string',
                    title: 'Description'
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
                            value: {
                                type: 'string',
                                title: 'Value',
                                default: null,
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

                        }
                    }
                }
            }
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
                                                        htmlClass: "col-xs-12",
                                                        items: [
                                                            {
                                                                key: 'description',
                                                                feedback: false,
                                                                type: 'string'
                                                            }
                                                        ]
                                                    }
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
                                                           options: {
                                                               callback: $scope.dimensionFunctions
                                                           },
                                                           feedback: false,
                                                           type: 'uiselect'
                                                       },
                                                       {
                                                          htmlClass: "col-xs-4",
                                                          key: 'dimensions[].value',
                                                          feedback: false,
                                                          type: 'string',
                                                          condition: "dimensions[].dimensionFunction == 'REGEX_EXTRACT' || dimensions[].dimensionFunction == 'REGEX_MATCH'"
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
                                                       }
                                                   ]
                                               }]
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
        $scope.ok = function () {
            $uibModalInstance.close({
                value: 'evo ga'
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
]);
