/*

Configure dashboard
- Single or Tabset
- Base URL to request/save/delete dashboard(s)
- 

Dashboard
- There will be one or more dashbords
- Each one can be titled and described
- Will have predefined sizes - allowing add new screen organization/template configuration

DataSource
- Enable defining Name, Description
- Add: Dimensions, Metrics from fields available
    - define callback fn to load available fields
- Will load data from Rest API - need to configure base API host and context - we'll call 'known' methods to get 'known' format of data

Widget
- Widget type: Table, Chart, Counter, Template/View/Controller
- Widget will use DataSource to get data
- Widget has title and description
- Widget configuration is persistable  as well as dashboard configuration/ e.g. widget position
- Configure base URL - we call 'known' methods and expect 'known' model
- Widget has Edit and View mode

*/

var dzupDashboard = angular.module('dzupDash');

dzupDashboard.provider('$dzupDashboardWidget', [function () {

    var templateUrlBase;
    var configProvider;
    
    var widgets = function () {
        var w = {

        };
        return w;
    };
    var dataSources = function () {
        var ds = {
           dataSource: {
                title: 'Data Source',
                description: 'Data source widget',
                category: 'DataSource',
                controller: 'DzupGenericDataSourceController',
                templateUrl: configProvider.templateUrlBase['dzup-dashboard'] + '/templates/directives/datasource/view.html',
                frameless: true,
                edit: {
                    templateUrl: configProvider.templateUrlBase['dzup-dashboard'] + '/templates/directives/datasource/edit.view.html',
                    controller: 'DzupGenericDataSourceEditController',
                    immediate: true,
                    apply: function(definition,widget,$http, config){

                        config.changesApplied = true;

                        var schema =tv4.getSchema('dataSourceSchema');
                        var result = tv4.validateMultiple(config.definitionModel, schema, true);

                        config.definitionModel.validateForm();

                        return result.valid;
                    }
                },
                config: null
            },
           chartConf: {
                    title: 'Chart Configuration',
                    description: 'Chart Configuration',
                    category: 'Chart',
                    controller: 'DzupGenericChartController',
                    templateUrl: configProvider.templateUrlBase['dzup-dashboard'] + '/templates/directives/chart/view.html',
                    frameless: true,
                    edit: {
                        templateUrl: configProvider.templateUrlBase['dzup-dashboard'] + '/templates/directives/chart/edit.view.html',
                        controller: 'DzupGenericChartEditController',
                        immediate: true,
                        apply: function(definition,widget,$http, config){
                            config.changesApplied = true;

                            var schema =tv4.getSchema('chartSchema');
                            var result = tv4.validateMultiple(config.definitionModel, schema, true);

                            config.definitionModel.validateForm();

                            return result.valid;
                        }
                    },
                    config: null
                }
        }
        return ds;
    };
    var service = {
        setConfigProvider: function(value){
            configProvider = value;  
        },
        setTemplateUrlBase: function (value) {
            templateUrlBase = value;
        },
        getWidgets: function () {
            var w = widgets();
            return w;
        },
        getDataSources: function () {
            var ds = dataSources();
            return ds;
        },
        $get: [function () {
            return {
                configProvider: configProvider,
                templateUrlBase: templateUrlBase,
                getDataSources: dataSources,
                getWidgets: widgets
            };
        }]
    };

    return service;

}]);


