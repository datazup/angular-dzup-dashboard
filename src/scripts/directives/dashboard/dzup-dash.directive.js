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

                    //keeps the dashboard changes in the page memory
                    if(typeof $scope.selectedDashboard != 'undefined' && $scope.selectedDashboard != null
                    && typeof $scope.selectedDashboard.model != 'undefined' ){
                        var index = _.indexOf($scope.dashboardList, _.find($scope.dashboardList, { model:{identifier: $scope.selectedDashboard.model.identifier} }));
                        if (index != -1) {
                            $scope.dashboardList.splice(index, 1, $scope.selectedDashboard);
                        }
                    }

                    $scope.selectedDashboard = dashboard;
                    dzupDashboardWidgetHelper.setDashboardWidgets(index, dashboard);
                };

                // Init dashboard load
                $dzupDashboard.getDashboards().success(function (result) {

                    var staticDashboards = $dzupDashboard.getStaticDashboards();

                    $dzupDashboard.getRegularStreams().success(function (result) { return result; })
                        .then(function (result) {

                            var availableStreams = _.map(result.data.list, function (x) { return { value: x.streamId, label: x.keyword } });

                            staticDashboards[0].rows[0].columns[0].widgets[0].config.definitionModel.stream = availableStreams[0].value;
                            staticDashboards[0].rows[0].columns[0].widgets[0].stream = availableStreams[0].value;
                            staticDashboards[1].rows[0].columns[0].widgets[0].config.definitionModel.stream = availableStreams[0].value;
                            staticDashboards[1].rows[0].columns[0].widgets[0].stream = availableStreams[0].value;
                            staticDashboards[2].rows[0].columns[0].widgets[0].config.definitionModel.stream = availableStreams[0].value;
                            staticDashboards[2].rows[0].columns[0].widgets[0].stream = availableStreams[0].value;
                        });

                    if (staticDashboards != null && staticDashboards.length > 0) {

                        for (j = 0; j < staticDashboards.length; j++) {
                            staticDashboards[j].key = $scope.generateUUID();
                            var staticDashItem = staticDashboards[j];
                            staticDashItem.identifier = $scope.generateUUID();
                            staticDashItem.staticDashboard = true;

                            $scope.dashboardList.push({ model: staticDashItem });

                            if ((result == null || result.list.length == 0) && j == (staticDashboards.length - 1))
                                $scope.selectedDashboard = staticDashItem;
                        }
                    }

                    if (result != null && result.list.length > 0) {
                        var list = result.list;

                        for (i = 0; i < list.length; i++) {
                            result.list[i].dashboard.key = $scope.generateUUID();
                            var dashItem = result.list[i].dashboard;
                            //dashItem.title = "Dashboard " + (i + 1);
                            dashItem.identifier = result.list[i].id;

                            $scope.dashboardList.push({ model: dashItem });

                            if (i == (list.length - 1))
                                $scope.selectedDashboard = dashItem;
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

                    if (typeof $event != 'undefined') {
                        var dash = $scope.getDashboardTemplate();
                        $scope.dashboardList.push(dash);
                        $scope.selectDashboard(dash);
                    }

                    var self = this;
                    $timeout(function () {
                        var activeIndex = $scope.dashboardList.length;
                        self.$parent.tabset.select(activeIndex);
                    }, 10);
                };

                $scope.removeDashboard = function (dashboard, $event) {
                    $event.preventDefault();

                    if (dashboard.staticDashboard) return;

                    var index = $scope.indexOfItem(dashboard);
                    if (index === -1) {
                        $scope.error = "Something wrong. Cannot find dashboard in collection";
                    } else {
                        $scope.dashboardList.splice(index, 1);
                        var id = dashboard.model.identifier;
                        if (id) {
                            $dzupDashboard.remove(id);
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
                    if (dashItem.model.staticDashboard == true) return;

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
                    if (dashItem.model.staticDashboard == true) return;

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
