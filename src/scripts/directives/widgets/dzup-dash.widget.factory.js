var app = angular.module('dzupDash');

app.directive('widgetMainFormConfig', ['$compile', '$interpolate','$templateRequest', '$dzupConfigUtils', function ($compile, $interpolate, $templateRequest, $dzupConfigUtils) {

    return {
        restrict: "E",
        controller: ['$rootScope', '$scope', function ($rootScope, $scope) {
        }],
        link: function (scope, element, attrs) {
            var base = $dzupConfigUtils.templateUrlBase['dzup-dashboard'];
            $templateRequest(base+"/templates/directives/widgets/widget.main.form.config.view.html").then(function (html) {
                var template = angular.element(html);
                var compiled = $compile(template)(scope);
                element.replaceWith(compiled);
            });
        }
    }

}]);


app.directive('widgetChildConfigFactory', ['$compile', '$interpolate', function ($compile, $interpolate) {

    return {
        restrict: "E",
        link: function (scope, element, attrs) {

            var chartType = scope.$eval(attrs.chartType);
            scope.chartType = chartType;
            
            var tmpl = '<div class="edit-child-form"><form sf-schema="chartDefinition.schema" sf-form="chartDefinition.form" sf-options="{setSchemaDefaults:true, validateOnRender: true}" sf-model="config.chartDefinitionModel"></form></div>';

            var html = element.html();

            scope.recompile = function (newType) {
                element.empty();
                if (newType) {
                    element.children(0).html(tmpl);
                    var compiled1 = $compile(tmpl)(scope);
                    element.append(compiled1);
                    $compile(element.contents())(scope);
                }else{
                    var compiled1 = $compile('<div></div>')(scope);
                    element.append(compiled1);
                }
            }

            scope.recompile(scope.chartType);

            scope.$watch('config.definitionModel.chartType', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.recompile(newValue);
                }
            });
        }
    }

}]);
