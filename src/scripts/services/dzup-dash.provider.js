var dzupDashboard = angular.module('dzupDash');

dzupDashboard.provider('$dzupDashboard', function () {
    var provider= {};

    provider.shouldUseOnlyCustomWidgets = false;
    this.host = "";
    this.updateUrl = "";
    this.dashboardsRetrievalUrl = "";
    this.scheduledUrl = "";
    this.regularUrl = "";
    this.reportsBySourcesUrl = "";
    this.sourcesUrl = "";
    this.reportsUrl = "";

    provider.setConf = function(conf) {
        this.host = conf.host;
        this.updateUrl = conf.updateUrl;
        this.dashboardsRetrievalUrl = conf.dashboardsRetrievalUrl;
        this.scheduledUrl  = conf.scheduledUrl;
        this.regularUrl  = conf.regularUrl;
        this.reportsBySourcesUrl = conf.reportsBySourcesUrl;
        this.sourcesUrl = conf.sourcesUrl;
        this.reportsUrl = conf.reportsUrl;
    };

    function WidServ($http,conf){
            this.create = function(item) {
                var item = {dashboard:item.model, id:item.model.identifier};
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

            this.getReport = function(source, streamId, reportName){
               var s = encodeURIComponent(source);
               var sid = encodeURIComponent(streamId);
               var rn = encodeURIComponent(reportName);
               return $http.get(conf.host + conf.reportsUrl + '?reportName=' + rn + '&source='+s+ '&streamId='+sid);
            }

            this.getSources = function(){
                 return $http.get(conf.host + conf.sourcesUrl);
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
    }

    provider.$get = function($http) {
        var conf = { host:this.host,
                     updateUrl:this.updateUrl,
                     dashboardsRetrievalUrl:this.dashboardsRetrievalUrl,
                     scheduledUrl:this.scheduledUrl,
                     regularUrl:this.regularUrl,
                     reportsBySourcesUrl:this.reportsBySourcesUrl,
                     sourcesUrl:this.sourcesUrl,
                     reportsUrl:this.reportsUrl
                    }
        return new WidServ($http, conf);
    };

    return provider;
});