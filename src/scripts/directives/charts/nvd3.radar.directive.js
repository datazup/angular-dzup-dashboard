/*
'use strict';
var nv = window.nv;

var app = angular.module('dzupDash');

app.directive('nvd3Radar', ['$compile', function ($compile) {
    return {
        restrict: 'E',
        template: '',
        scope: {
            data: '=', //chart data, [required]
            options: '=' //chart options, according to nvd3 core api, [required]
        },
        link: function (scope, element, attrs) {
            //flag indicates if directive and chart is ready
            scope.isReady = false;

            scope.addGraph = function () {
                nv.addGraph(function () {

                    if (!scope.chart) return;

                    // Remove resize handler. Due to async execution should be placed here, not in the clearElement
                    if (scope.chart.resizeHandler) scope.chart.resizeHandler.clear();

                    // Update the chart when window resizes
                    scope.chart.resizeHandler = nv.utils.windowResize(function () {
                        scope.chart && scope.chart.update && scope.chart.update();
                    });

                    var chart = nv.models.radarChart()
                        .margin({
                            top: 40,
                            right: 130,
                            bottom: 40,
                            left: 40
                        });
                    d3.select('#chart1 svg')
                        .datum(Radarvalues())
                        .call(chart);
                    nv.utils.windowResize(chart.update);
                    return chart;
                });

            }

            // remove completely when directive is destroyed
            element.on('$destroy', function () {
                // scope.api.clearElement();
            });
        }
    };
}]);
*/
