var dzupDashboard = angular.module('dzupDash');

dzupDashboard.provider('$dzupDashboard', function () {
    var provider= {};

    provider.shouldUseOnlyCustomWidgets = false;
    this.host = "";
    this.updateUrl = "";
    this.dashboardsRetrievalUrl = "";

    provider.setConf = function(conf) {
        this.host = conf.host;
        this.updateUrl = conf.updateUrl;
        this.dashboardsRetrievalUrl = conf.dashboardsRetrievalUrl ;
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
               return $http.get(conf.host + 'analytic/query/report' + '?reportName=' + rn + '&source='+s+ '&streamId='+sid);
            }

            this.getSources = function(){
                 return $http.get(conf.host + 'analytic/query/reports/sources');
            }

            this.getReportsBySource = function(source){
                 var s = encodeURIComponent(source);
                 return $http.get(conf.host + 'analytic/query/reports/ddl?source='+s);
            }
    }

    provider.$get = function($http) {
        var host = this.host;
        var updateUrl = this.updateUrl;
        var dashboardsRetrievalUrl = this.dashboardsRetrievalUrl;

        var conf = { host:host, updateUrl:updateUrl, dashboardsRetrievalUrl:dashboardsRetrievalUrl}
        return new WidServ($http, conf);
    };

    return provider;
});