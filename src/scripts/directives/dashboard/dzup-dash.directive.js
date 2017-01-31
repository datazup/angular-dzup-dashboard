var dzupDashboard = angular.module('dzupDash');
// not in use
dzupDashboard.directive('dzupDashboard', ['$dzupDashboard', '$dzupConfigUtils', 'dzupDashboardWidgetHelper', function ($dzupDashboard, $dzupConfigUtils, dzupDashboardWidgetHelper) {

    return {
        restrict: "E",
        scope: {},
        templateUrl: $dzupConfigUtils.templateUrlBase['dzup-dashboard'] + '/templates/dashboard.main.view.html',
        controller: ['$rootScope', '$scope', '$timeout', '$dzupConfigUtils',
            function ($rootScope, $scope, $timeout, $dzupConfigUtils) {

                $scope.tabUrl = $dzupConfigUtils.templateUrlBase['dzup-dashboard'] + '/templates/dashboard.tab.template.view.html';

                $scope.dashboardList = [];
                $scope.selectedDashboard = {};

                $scope.selectDashboard = function (dashboard, index) {
                    console.log("Hi, you selected me?");
                    $scope.selectedDashboard = dashboard;
                    dzupDashboardWidgetHelper.setDashboardWidgets(index, dashboard);
                };

                $dzupDashboard.getDashboards().success(function (result) {
                    if (result != null && result.list.length > 0) {
                        var list = result.list;
                        var selectedDashboard = list[0].dashboard;
                        for (i = 0; i < list.length; i++) {
                            var dashItem = result.list[i].dashboard;
                            dashItem.title = "Dashboard " + (i + 1);
                            dashItem.identifier = result.list[i].id;
                            $scope.dashboardList.push({ model: result.list[i].dashboard });

                            /*for(rowItem = 0; rowItem<dashItem.rows.length;rowItem++) {
                                var rowItems = dashItem.rows[rowItem].columns;
                                for(colItems = 0; colItems<rowItems.length;colItems++){
                                    var colItem =  rowItems[colItems].widgets;
                                    for(widItem=0; widItem < colItem.length;widItem++){
                                        console.log(colItem[widItem]);
                                        dzupDashboardWidgetHelper.setWidgetData(colItem[widItem]);
                                    }
                                }
                            }*/

                        }
                    }
                });

                $scope.indexOfItem = function (item) {
                    var index = _.indexOf($scope.dashboardList, item);
                    return index;
                };

                $scope.getDashboardTemplate = function () {
                    var dash = {
                        model: {
                            key: $scope.generateUUID(),
                            title: "Dashboard ",
                            structure: "4-8"
                        }
                    };
                    return dash;
                };

                $scope.generateUUID = function () { // this is temporaly
                    var d = new Date().getTime();
                    if (window.performance && typeof window.performance.now === "function") {
                        d += performance.now(); //use high-precision timer if available
                    }
                    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = (d + Math.random() * 16) % 16 | 0;
                        d = Math.floor(d / 16);
                        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                    });
                    return uuid;
                }

                $scope.addDashboard = function ($event) {
                    var dash = $scope.getDashboardTemplate();
                    $scope.dashboardList.push(dash);


                    var self = this;
                    $timeout(function () {
                        var activeIndex = $scope.dashboardList.length;
                        self.$parent.tabset.select(activeIndex);
                    }, 10);

                    $scope.selectDashboard(dash);
                };

                $scope.removeDashboard = function (dashboard) {

                    var index = $scope.indexOfItem(dashboard);
                    if (index === -1) {
                        $scope.error = "Something wrong. Cannot find dashboard in collection";
                    } else {
                        $scope.dashboardList.splice(index, 1);
                        if (dashboard.id) {
                            $dzupDashboard.dataService.remove(dashboard.id)
                                .success(function (result) {
                                    $scope.success = "Successfully removed from database";
                                    $scope.refresh();
                                })
                                .error(function (data, status) {
                                    $scope.error = data.message;
                                });
                        }
                    }
                };

                $scope.updateInList = function (dashboard) {
                    var dashItem = _.find($scope.dashboardList, function (item) {
                        if (item.model.key === dashboard.model.key) {
                            return item;
                        }
                    });
                    var index = _.indexOf($scope.dashboardList, dashItem);

                    $scope.dashboardList.splice(index, 1, dashboard);
                }

                $scope.create = function (dashItem) {
                    $dzupDashboard.create(dashItem);
                };

                $scope.update = function (dashItem) {
                    $dzupDashboard.create(dashItem)
                        .success(function (result) {
                            $scope.updateInList(result);
                            $scope.success = "Successfully updated";
                        })
                        .error(function (data, status) {
                            $scope.error = data.message;
                        });
                };

                $scope.saveOrUpdate = function (dashItem) {
                    if (dashItem.id && (typeof dashItem.id != "undefined")) {
                        $scope.update(dashItem);
                    } else {
                        $scope.create(dashItem);
                    }
                };

                $scope.$on('adfWidgetAdded', function (event, name, model, widget) {
                    dzupDashboardWidgetHelper.addDashboardWidget(widget);
                });

                $scope.$on('adfWidgetRemovedFromColumn', function (root) {
                    dzupDashboardWidgetHelper.setDashboardWidgets(-1, root.currentScope.selectedDashboard);
                });

                $scope.$on('adfDashboardChanged', function (event, name, model) {
                    var dashItem = _.find($scope.dashboardList, function (item) {
                        if (item.model.key === model.key) {
                            return item;
                        }
                    });
                    if (dashItem) {
                        $scope.saveOrUpdate(dashItem);
                    } else {
                        $scope.error = 'Something wrong. Please try again!';
                    }
                });
            }]
    }

}]);

dzupDashboard.directive('dzupResolveAttr', ['$compile', function ($compile) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var valTmpl = attrs.dzupResolveAttr;
            var splited = valTmpl.split('=');
            attrs[splited[0]] = scope.$eval(splited[1]);
        }
    };

}]);
