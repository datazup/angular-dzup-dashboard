var dzupDashboard = angular.module('dzupDash');

dzupDashboard.provider('$dzupDashboard', function () {
    var provider= {};

    provider.shouldUseOnlyCustomWidgets = false;
    this.host = "";
    provider.setHost = function(value) {
        this.host = value;
    };

    function WidServ($http,host){

           this.create = function(dashboard) {
               this.dashboards.push(dashboard);
               return this.dashboards;
           }
           this.update = function(dashboard) {
               this.dashboards.push(dashboard);
              return this.dashboards;
          }
          this.remove = function(identifier) {
             return  this.dashboards;
          }
          this.getDashboards = function(identifier) {
              return  this.dashboards;
          }

           this.getReport = function(source, streamId, reportName)
          {
               var s = encodeURIComponent(source);
               var sid = encodeURIComponent(streamId);
               var rn = encodeURIComponent(reportName);
               return $http.get(host + 'analytic/query/report?reportName=' + rn + '&source='+s+ '&streamId='+sid);
          }
    }

    provider.$get = function($http) {
        var host = this.host;
        return new WidServ($http, host);
    };

    return provider;
});