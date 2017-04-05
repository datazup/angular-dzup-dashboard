var app = angular.module('dzupDash');

GoCharting.init();

app.directive('googleGeoMap', ['$compile', function ($compile) {
    return {
        restrict: 'E',
        template: '<div><button class="btn btn-primary btn-sm" ng-click="returnToMain()" title="World map"> World map </button></div>',
        scope: {
            data: '=', //chart data, [required]
            options: '=' //chart options, according to nvd3 core api, [required]
        },
        link: function (scope, element, attrs) {
            
            scope.containerId = 'geoMap-'+Date.now();
            scope.container = angular.element('<div style="width: 90%;" id="'+scope.containerId+'"></div>');
                        
            scope.getContainer = function(){            
                return scope.container;
            };
            
            scope.returnToMain = function(){
                delete scope.config.region;
                delete scope.config.resolution;
                scope.loadData();
            };
            
            scope.handleCountryChartDrawing = function (region) {

                var options = {
                    region: region,
                    resolution: 'provinces'
                };
                
                scope.config = angular.extend(scope.config, options);

                var regionData = scope.data.states[region];
                
                if (regionData){
                    for (var i=0;i<regionData.length;i++){
                        var regionObj = regionData[i];
                        var abbreviation = regionObj.state;
                        
                        var normalizedAbbreviation = GoCharting.normalizeStateAbbreviation(region,abbreviation);
                        abbreviation = normalizedAbbreviation?normalizedAbbreviation:abbreviation;
                        
                        var name = GoCharting.resolveStateName(region,regionObj.state);  
                        regionObj.name = name;
                    }
                }
                
                var container = scope.getContainer();
                element.append(container);
                var el = container[0];
                GoCharting.drawGeoLocationStatesChart(regionData, el, scope.config);
                
            };

            scope.loadStateChart = function (region) {
                scope.region = region;
                scope.handleCountryChartDrawing(region);
            };

            scope.regionClick = function (region) {
               
                var exists = false;
                for (var i = 0; i < scope.data.countries.length; i++) {
                    if (scope.data.countries[i].country === region) {
                        exists = true;
                    }
                }
                if (!exists) {
                    alert('There is no data for country/region: ' + region);
                } else {
                    scope.loadStateChart(region);
                }
            };

            scope.config = {
                colorAxis: {
                    colors: ['green', 'red']
                },
                backgroundColor: '#ffffff',       
                enableRegionInteractivity: true,
                keepAspectRatio: true
            };
            
            
            scope.loadData = function () {
                scope.config = angular.extend(scope.config, scope.options.chart);                
                var container = scope.getContainer();                
                element.append(container);
                var el = container[0];
                
                if (scope.data)
                    GoCharting.drawGeoLocationMainChart(scope.data, scope.config, el, scope.regionClick);
                else
                    console.log('scope.data is not defined');

               
            }

            scope.$watch('data', function (newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    scope.loadData();
                }
            });
        }

    };
}]);
