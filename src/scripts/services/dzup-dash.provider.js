var dzupDashboard = angular.module('dzupDash');

dzupDashboard.provider('$dzupDashboard', [ function () {
    var provider= {};

    provider.shouldUseOnlyCustomWidgets = false;
    this.host = "";
    this.updateUrl = "";
    this.dashboardsRetrievalUrl = "";
    this.dashboardPublicUrl = "";
    this.scheduledUrl = "";
    this.regularUrl = "";
    this.reportsBySourcesUrl = "";
    this.sourcesUrl = "";
    this.reportsUrl = "";
    this.staticDashboards = null;
    this.createReportUrl =  "";
    this.deleteReportUrl = "";
    this.clientReportsUrl = "";
    this.scheduledStreamsUrl= "";
    this.reportStreamConfUrl= "";

    provider.setConf = function(conf) {
        this.host = conf.host;
        this.updateUrl = conf.updateUrl;
        this.dashboardsRetrievalUrl = conf.dashboardsRetrievalUrl;
        this.dashboardPublicUrl = conf.dashboardPublicUrl;
        this.scheduledUrl  = conf.scheduledUrl;
        this.regularUrl  = conf.regularUrl;
        this.reportsBySourcesUrl = conf.reportsBySourcesUrl;
        this.sourcesUrl = conf.sourcesUrl;
        this.reportsUrl = conf.reportsUrl;
        this.staticDashboards = conf.staticDashboards;
        this.createReportUrl = conf.createReportUrl;
        this.deleteReportUrl = conf.deleteReportUrl;
        this.clientReportsUrl = conf.clientReportsUrl;
        this.scheduledStreamsUrl = conf.scheduledStreamsUrl;
        this.reportStreamConfUrl = conf.reportStreamConfUrl;
    };

    function WidServ($http,conf){
            this.create = function(item) {
                var item = {dashboard:item.model, id:item.model.identifier, availableStreams: item.availableStreams, publicDashboard:item.model.isPublic};
                return $http.post(conf.host+ conf.updateUrl ,item);
            }

            this.update = function(item) {
                  var item = {dashboard:item.model, id:item.model.identifier};
                  return $http.post(conf.host+ conf.updateUrl ,item);
            }

            this.remove = function(identifier) {
                return $http({
                        method: 'DELETE',
                        url: conf.host + conf.updateUrl,
                        params: { id:  identifier }
                    });
            }

            this.getDashboards = function() {

                var result =  $http.get(conf.host + conf.dashboardsRetrievalUrl );
                return result;
            }

            this.getPublicDashboard = function(identifier) {
                 return $http({
                    method: 'GET',
                    url: conf.host + conf.dashboardPublicUrl,
                    params: { identifier:  identifier }
                });
            }

            this.getStaticDashboards = function() {
                return conf.staticDashboards;
            }

            this.getReport = function(parameters){
               return $http({
                 url: conf.host + conf.reportsUrl,
                 method: "GET",
                 async: true,
                 params: {filter:parameters}
               });

            }

            this.getSources = function(){
                 return $http.get(conf.host + conf.sourcesUrl);
            }

             this.getSourcesStatic = function(){
                 return  [{ value: "twitter_stream", label: "Twitter stream" }, { value: "tagged_stream", label: "Tagged stream" }];
            }

            this.getStreamTypes = function(){
                 return  [{value: "scheduled", label: "Scheduled"}, {value: "regular", label: "Regular"}];
            }

            this.getReportsBySource = function(source){
                 var s = encodeURIComponent(source);
                 return $http.get(conf.host + conf.reportsBySourcesUrl  +'?source='+s);
            }

             this.getScheduledStreams = function(){
                 return $http.get(conf.host +  conf.scheduledUrl );
             }

             this.getRegularStreams = function(){
                 return $http.get(conf.host +  conf.regularUrl );
             }

             this.getClientReports = function()
             {
                return $http.get(conf.host +  conf.clientReportsUrl );
             }

             this.getScheduledStreams = function()
             {
                return $http.get(conf.host +  conf.scheduledStreamsUrl );
             }

             this.getReportStreamsConf = function(parameters){
                return $http({
                  url: conf.host + conf.reportStreamConfUrl,
                  method: "GET",
                  async: true,
                  params: {filter:parameters}
                });

             }

             this.insertReportStreamsConf = function(item)
             {
                return $http.post(conf.host +  conf.reportStreamConfUrl, item);
             }

             this.createReport = function(item) {
                 return $http.post(conf.host+ conf.createReportUrl ,item);
             }

             this.removeReport = function(identifier) {
                 return $http({
                         method: 'DELETE',
                         url: conf.host + conf.deleteReportUrl,
                         params: { id:  identifier }
                     });
             }
    }

    provider.$get = function($http) {
        var conf = { host:this.host,
                     updateUrl:this.updateUrl,
                     dashboardsRetrievalUrl:this.dashboardsRetrievalUrl,
                     dashboardPublicUrl:this.dashboardPublicUrl,
                     scheduledUrl:this.scheduledUrl,
                     regularUrl:this.regularUrl,
                     reportsBySourcesUrl:this.reportsBySourcesUrl,
                     sourcesUrl:this.sourcesUrl,
                     reportsUrl:this.reportsUrl,
                     staticDashboards:this.staticDashboards,
                     createReportUrl: this.createReportUrl,
                     deleteReportUrl: this.deleteReportUrl,
                     clientReportsUrl: this.clientReportsUrl,
                     scheduledStreamsUrl: this.scheduledStreamsUrl,
                     reportStreamConfUrl: this.reportStreamConfUrl
                    }
        return new WidServ($http, conf);
    };

    return provider;
}]);