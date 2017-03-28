(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['schemaForm'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('schemaForm'));
  } else {
    root.bootstrapDecorator = factory(root.schemaForm);
  }
}(this, function(schemaForm) {
angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/actions-trcl.html","<div class=\"btn-group schema-form-actions {{form.htmlClass}}\" ng-transclude=\"\"></div>");
$templateCache.put("directives/decorators/bootstrap/actions.html","<div class=\"btn-group schema-form-actions {{form.htmlClass}}\"><input ng-repeat-start=\"item in form.items\" type=\"submit\" class=\"btn {{ item.style || \'btn-default\' }} {{form.fieldHtmlClass}}\" value=\"{{item.title}}\" ng-if=\"item.type === \'submit\'\"> <button ng-repeat-end=\"\" class=\"btn {{ item.style || \'btn-default\' }} {{form.fieldHtmlClass}}\" type=\"button\" ng-disabled=\"form.readonly\" ng-if=\"item.type !== \'submit\'\" ng-click=\"buttonClick($event,item)\"><span ng-if=\"item.icon\" class=\"{{item.icon}}\"></span>{{item.title}}</button></div>");
$templateCache.put("directives/decorators/bootstrap/array.html","<div sf-array=\"form\" class=\"schema-form-array {{form.htmlClass}}\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\"><label class=\"control-label\" ng-show=\"showTitle()\">{{ form.title }}</label><ol class=\"list-group\" ng-model=\"modelArray\" ui-sortable=\"\"><li class=\"list-group-item {{form.fieldHtmlClass}}\" ng-repeat=\"item in modelArray track by $index\"><button ng-hide=\"form.readonly || form.remove === null\" ng-click=\"deleteFromArray($index)\" style=\"position: relative; z-index: 20;\" type=\"button\" class=\"close pull-right\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button><sf-decorator ng-init=\"arrayIndex = $index\" form=\"copyWithIndex($index)\"></sf-decorator></li></ol><div class=\"clearfix\" style=\"padding: 15px;\"><button ng-hide=\"form.readonly || form.add === null\" ng-click=\"appendToArray()\" type=\"button\" class=\"btn {{ form.style.add || \'btn-default\' }} pull-right\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || \'Add\'}}</button></div><div class=\"help-block\" ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\" ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div></div>");
$templateCache.put("directives/decorators/bootstrap/checkbox.html","<div class=\"checkbox schema-form-checkbox {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\"><label class=\"{{form.labelHtmlClass}}\"><input type=\"checkbox\" sf-clicked=\"form\" sf-changed=\"form\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\" class=\"{{form.fieldHtmlClass}}\" name=\"{{form.key.slice(-1)[0]}}\"> <span ng-bind-html=\"form.title\"></span></label><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("directives/decorators/bootstrap/checkboxes.html","<div sf-array=\"form\" ng-model=\"$$value$$\" class=\"form-group schema-form-checkboxes {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\"><label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label><div class=\"checkbox\" ng-repeat=\"val in titleMapValues track by $index\"><label><input type=\"checkbox\" ng-disabled=\"form.readonly\" sf-clicked=\"form\" sf-changed=\"form\" class=\"{{form.fieldHtmlClass}}\" ng-model=\"titleMapValues[$index]\" name=\"{{form.key.slice(-1)[0]}}\"> <span ng-bind-html=\"form.titleMap[$index].name\"></span></label></div><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("directives/decorators/bootstrap/default.html","<div class=\"form-group schema-form-{{form.type}} {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }\"><label class=\"control-label {{form.labelHtmlClass}}\" ng-class=\"{\'sr-only\': !showTitle()}\" for=\"{{form.key.slice(-1)[0]}}\">{{form.title}}</label> <input ng-if=\"!form.fieldAddonLeft && !form.fieldAddonRight\" ng-show=\"form.key\" type=\"{{form.type}}\" step=\"any\" sf-clicked=\"form\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" class=\"form-control {{form.fieldHtmlClass}}\" id=\"{{form.key.slice(-1)[0]}}\" ng-model-options=\"form.ngModelOptions\" ng-model=\"$$value$$\" ng-disabled=\"form.readonly\" schema-validate=\"form\" name=\"{{form.key.slice(-1)[0]}}\" aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\"><div ng-if=\"form.fieldAddonLeft || form.fieldAddonRight\" ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\"><span ng-if=\"form.fieldAddonLeft\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonLeft\"></span> <input ng-show=\"form.key\" type=\"{{form.type}}\" step=\"any\" sf-clicked=\"form\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" class=\"form-control {{form.fieldHtmlClass}}\" id=\"{{form.key.slice(-1)[0]}}\" ng-model-options=\"form.ngModelOptions\" ng-model=\"$$value$$\" ng-disabled=\"form.readonly\" schema-validate=\"form\" name=\"{{form.key.slice(-1)[0]}}\" aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\"> <span ng-if=\"form.fieldAddonRight\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonRight\"></span></div><span ng-if=\"form.feedback !== false\" class=\"form-control-feedback\" ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\" aria-hidden=\"true\"></span> <span ng-if=\"hasError() || hasSuccess()\" id=\"{{form.key.slice(-1)[0] + \'Status\'}}\" class=\"sr-only\">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("directives/decorators/bootstrap/fieldset-trcl.html","<fieldset ng-disabled=\"form.readonly\" class=\"schema-form-fieldset {{form.htmlClass}}\"><legend ng-class=\"{\'sr-only\': !showTitle() }\">{{ form.title }}</legend><div class=\"help-block\" ng-show=\"form.description\" ng-bind-html=\"form.description\"></div><div ng-transclude=\"\"></div></fieldset>");
$templateCache.put("directives/decorators/bootstrap/fieldset.html","<fieldset ng-disabled=\"form.readonly\" class=\"schema-form-fieldset {{form.htmlClass}}\"><legend ng-class=\"{\'sr-only\': !showTitle() }\">{{ form.title }}</legend><div class=\"help-block\" ng-show=\"form.description\" ng-bind-html=\"form.description\"></div><sf-decorator ng-repeat=\"item in form.items\" form=\"item\"></sf-decorator></fieldset>");
$templateCache.put("directives/decorators/bootstrap/help.html","<div class=\"helpvalue schema-form-helpvalue {{form.htmlClass}}\" ng-bind-html=\"form.helpvalue\"></div>");
$templateCache.put("directives/decorators/bootstrap/radio-buttons.html","<div class=\"form-group schema-form-radiobuttons {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\"><div><label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label></div><div class=\"btn-group\"><label class=\"btn {{ (item.value === $$value$$) ? form.style.selected || \'btn-default\' : form.style.unselected || \'btn-default\'; }}\" ng-class=\"{ active: item.value === $$value$$ }\" ng-repeat=\"item in form.titleMap\"><input type=\"radio\" class=\"{{form.fieldHtmlClass}}\" sf-clicked=\"form\" sf-changed=\"form\" style=\"display: none;\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\" ng-value=\"item.value\" name=\"{{form.key.join(\'.\')}}\"> <span ng-bind-html=\"item.name\"></span></label></div><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("directives/decorators/bootstrap/radios-inline.html","<div class=\"form-group schema-form-radios-inline {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\"><label ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\" class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label><div><label class=\"radio-inline\" ng-repeat=\"item in form.titleMap\"><input type=\"radio\" class=\"{{form.fieldHtmlClass}}\" sf-clicked=\"form\" sf-changed=\"form\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-value=\"item.value\" name=\"{{form.key.join(\'.\')}}\"> <span ng-bind-html=\"item.name\"></span></label></div><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("directives/decorators/bootstrap/radios.html","<div class=\"form-group schema-form-radios {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\"><label ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\" class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label><div class=\"radio\" ng-repeat=\"item in form.titleMap\"><label><input type=\"radio\" class=\"{{form.fieldHtmlClass}}\" sf-clicked=\"form\" sf-changed=\"form\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-value=\"item.value\" name=\"{{form.key.join(\'.\')}}\"> <span ng-bind-html=\"item.name\"></span></label></div><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("directives/decorators/bootstrap/section.html","<div class=\"schema-form-section {{form.htmlClass}}\"><sf-decorator ng-repeat=\"item in form.items\" form=\"item\"></sf-decorator></div>");
$templateCache.put("directives/decorators/bootstrap/select.html","<div class=\"form-group {{form.htmlClass}} schema-form-select\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false}\"><label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label><select ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" ng-disabled=\"form.readonly\" sf-clicked=\"form\" sf-changed=\"form\" class=\"form-control {{form.fieldHtmlClass}}\" schema-validate=\"form\" ng-options=\"item.value as item.name group by item.group for item in form.titleMap\" name=\"{{form.key.slice(-1)[0]}}\"></select><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("directives/decorators/bootstrap/submit.html","<div class=\"form-group schema-form-submit {{form.htmlClass}}\"><input type=\"submit\" class=\"btn {{ form.style || \'btn-primary\' }} {{form.fieldHtmlClass}}\" value=\"{{form.title}}\" ng-disabled=\"form.readonly\" ng-if=\"form.type === \'submit\'\"> <button class=\"btn {{ form.style || \'btn-default\' }}\" type=\"button\" ng-click=\"buttonClick($event,form)\" ng-disabled=\"form.readonly\" ng-if=\"form.type !== \'submit\'\"><span ng-if=\"form.icon\" class=\"{{form.icon}}\"></span> {{form.title}}</button></div>");
$templateCache.put("directives/decorators/bootstrap/tabarray.html","<div sf-array=\"form\" ng-init=\"selected = { tab: 0 }\" class=\"clearfix schema-form-tabarray schema-form-tabarray-{{form.tabType || \'left\'}} {{form.htmlClass}}\"><div ng-if=\"!form.tabType || form.tabType !== \'right\'\" ng-class=\"{\'col-xs-3\': !form.tabType || form.tabType === \'left\'}\"><ul class=\"nav nav-tabs\" ng-class=\"{ \'tabs-left\': !form.tabType || form.tabType === \'left\'}\"><li ng-repeat=\"item in modelArray track by $index\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\">{{interp(form.title,{\'$index\':$index, value: item}) || $index}}</a></li><li ng-hide=\"form.readonly\" ng-click=\"$event.preventDefault() || (selected.tab = appendToArray().length - 1)\"><a href=\"#\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || \'Add\'}}</a></li></ul></div><div ng-class=\"{\'col-xs-9\': !form.tabType || form.tabType === \'left\' || form.tabType === \'right\'}\"><div class=\"tab-content {{form.fieldHtmlClass}}\"><div class=\"tab-pane clearfix\" ng-repeat=\"item in modelArray track by $index\" ng-show=\"selected.tab === $index\" ng-class=\"{active: selected.tab === $index}\"><sf-decorator ng-init=\"arrayIndex = $index\" form=\"copyWithIndex($index)\"></sf-decorator><button ng-hide=\"form.readonly\" ng-click=\"selected.tab = deleteFromArray($index).length - 1\" type=\"button\" class=\"btn {{ form.style.remove || \'btn-default\' }} pull-right\"><i class=\"glyphicon glyphicon-trash\"></i> {{ form.remove || \'Remove\'}}</button></div></div></div><div ng-if=\"form.tabType === \'right\'\" class=\"col-xs-3\"><ul class=\"nav nav-tabs tabs-right\"><li ng-repeat=\"item in modelArray track by $index\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\">{{interp(form.title,{\'$index\':$index, value: item}) || $index}}</a></li><li ng-hide=\"form.readonly\" ng-click=\"$event.preventDefault() || appendToArray()\"><a href=\"#\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || \'Add\'}}</a></li></ul></div></div>");
$templateCache.put("directives/decorators/bootstrap/tabs.html","<div ng-init=\"selected = { tab: 0 }\" class=\"schema-form-tabs {{form.htmlClass}}\"><ul class=\"nav nav-tabs\"><li ng-repeat=\"tab in form.tabs\" ng-disabled=\"form.readonly\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\" ng-click=\"tab.click?tab.click():\'\' \">{{ tab.title }}</a></li></ul><div class=\"tab-content {{form.fieldHtmlClass}}\"><div class=\"tab-pane\" ng-disabled=\"form.readonly\" ng-repeat=\"tab in form.tabs\" ng-show=\"selected.tab === $index\" ng-class=\"{active: selected.tab === $index}\"><bootstrap-decorator ng-repeat=\"item in tab.items\" form=\"item\"></bootstrap-decorator></div></div></div>");
$templateCache.put("directives/decorators/bootstrap/textarea.html","<div class=\"form-group has-feedback {{form.htmlClass}} schema-form-textarea\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\"><label class=\"{{form.labelHtmlClass}}\" ng-class=\"{\'sr-only\': !showTitle()}\" for=\"{{form.key.slice(-1)[0]}}\">{{form.title}}</label> <textarea ng-if=\"!form.fieldAddonLeft && !form.fieldAddonRight\" class=\"form-control {{form.fieldHtmlClass}}\" id=\"{{form.key.slice(-1)[0]}}\" sf-clicked=\"form\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\" name=\"{{form.key.slice(-1)[0]}}\"></textarea><div ng-if=\"form.fieldAddonLeft || form.fieldAddonRight\" ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\"><span ng-if=\"form.fieldAddonLeft\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonLeft\"></span> <textarea class=\"form-control {{form.fieldHtmlClass}}\" id=\"{{form.key.slice(-1)[0]}}\" sf-clicked=\"form\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\" name=\"{{form.key.slice(-1)[0]}}\"></textarea> <span ng-if=\"form.fieldAddonRight\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonRight\"></span></div><span class=\"help-block\" sf-message=\"form.description\"></span></div>");}]);
angular.module('schemaForm').config(['schemaFormDecoratorsProvider', function(decoratorsProvider) {
  var base = 'directives/decorators/bootstrap/';

  decoratorsProvider.defineDecorator('bootstrapDecorator', {
    textarea: {template: base + 'textarea.html', replace: false},
    fieldset: {template: base + 'fieldset.html', replace: false},
    /*fieldset: {template: base + 'fieldset.html', replace: true, builder: function(args) {
      var children = args.build(args.form.items, args.path + '.items');
      console.log('fieldset children frag', children.childNodes)
      args.fieldFrag.childNode.appendChild(children);
    }},*/
    array: {template: base + 'array.html', replace: false},
    tabarray: {template: base + 'tabarray.html', replace: false},
    tabs: {template: base + 'tabs.html', replace: false},
    section: {template: base + 'section.html', replace: false},
    conditional: {template: base + 'section.html', replace: false},
    actions: {template: base + 'actions.html', replace: false},
    select: {template: base + 'select.html', replace: false},
    checkbox: {template: base + 'checkbox.html', replace: false},
    checkboxes: {template: base + 'checkboxes.html', replace: false},
    number: {template: base + 'default.html', replace: false},
    password: {template: base + 'default.html', replace: false},
    submit: {template: base + 'submit.html', replace: false},
    button: {template: base + 'submit.html', replace: false},
    radios: {template: base + 'radios.html', replace: false},
    'radios-inline': {template: base + 'radios-inline.html', replace: false},
    radiobuttons: {template: base + 'radio-buttons.html', replace: false},
    help: {template: base + 'help.html', replace: false},
    'default': {template: base + 'default.html', replace: false}
  }, []);

  //manual use directives
  decoratorsProvider.createDirectives({
    textarea: base + 'textarea.html',
    select: base + 'select.html',
    checkbox: base + 'checkbox.html',
    checkboxes: base + 'checkboxes.html',
    number: base + 'default.html',
    submit: base + 'submit.html',
    button: base + 'submit.html',
    text: base + 'default.html',
    date: base + 'default.html',
    password: base + 'default.html',
    datepicker: base + 'datepicker.html',
    input: base + 'default.html',
    radios: base + 'radios.html',
    'radios-inline': base + 'radios-inline.html',
    radiobuttons: base + 'radio-buttons.html',
  });

}]).directive('sfFieldset', function() {
  return {
    transclude: true,
    scope: true,
    templateUrl: 'directives/decorators/bootstrap/fieldset-trcl.html',
    link: function(scope, element, attrs) {
      scope.title = scope.$eval(attrs.title);
    }
  };
});

return schemaForm;
}));


/**
 * A version of ng-click that only listens if
 * there is actually a onClick defined on the form
 *
 * Takes the form definition as argument.
 * If the form definition has a "onClick" defined as either a function or
 */
angular.module('schemaForm').directive('sfClicked', function () {
    return {
        require: 'ngModel',
        restrict: 'AC',
        scope: false,
        link: function (scope, element, attrs, ctrl) {
            var form = scope.$eval(attrs.sfClicked);
            if (form && form.onClick) {
                element.on('click', function () {
                    if (angular.isFunction(form.onClick)) {
                        form.onClick(form, ctrl);
                    } else {
                        scope.evalExpr(form.onClick, {
                            form: form,
                            ctrl: ctrl
                        });
                    }
                });
            }
        }
    };
});



angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/datetimeedit/datetime-edit.html","<div class=\"form-group schema-form-{{form.type}} {{form.htmlClass}}\"\n     ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\">\n\n   <label class=\"control-label {{form.labelHtmlClass}}\"\n          ng-class=\"{\'sr-only\': !showTitle()}\" for=\"{{form.key.slice(-1)[0]}}\">{{form.title}}</label>\n\n   <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n      <span ng-if=\"form.fieldAddonLeft\"\n            class=\"input-group-addon\"\n            ng-bind-html=\"form.fieldAddonLeft\"></span>\n      <input ng-show=\"form.key\"\n             style=\"background-color: white\"\n             type=\"{{form.schema.format===\'datetime\'?\'datetime-local\':form.schema.format}}\"\n             step=\"{{form.step}}\"\n             class=\"form-control {{form.fieldHtmlClass}}\"\n             schema-validate=\"form\"\n             ng-model=\"$$value$$\"\n             schema-form-datetime-edit\n             ignore-timezone=\"form.ignoreTimezone\"\n             name=\"{{form.key.slice(-1)[0]}}\"/>\n      <span ng-if=\"form.fieldAddonRight\"\n            class=\"input-group-addon\"\n            ng-bind-html=\"form.fieldAddonRight\"></span>\n   </div>\n      <span ng-if=\"form.feedback !== false\"\n            class=\"form-control-feedback\"\n            ng-style=\"{\'padding-right\':form.fieldAddonRight?60:0+\'px\'}\"\n            ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"\n            aria-hidden=\"true\">\n      </span>\n   <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n\n</div>\n");}]);
'use strict';

angular.module('schemaForm')

    .directive('schemaFormDatetimeEdit', function() {

      // All parameters are string in ISO format
      // "1961-06-04T00:00:00.000Z"
      function getFullYear(value) {
        return Number(value.substring(0, 4));
      }

      function getMonth(value) {
        return Number(value.substr(5, 2)) - 1; // 0 based
      }

      function getDate(value) {
        return Number(value.substr(8, 2));
      }

      function getHours(value) {
        return Number(value.substr(11, 2));
      }

      function getMinutes(value) {
        return Number(value.substr(14, 2));
      }

      function getSeconds(value) {
        return Number(value.substr(17, 2));
      }

      function getMilliseconds(value) {
        return Number(value.substr(20, 3));
      }

      return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
          ngModel: '=',
          ignoreTimezone: '='
        },
        link: function(scope, element, attrs, ngModel) {

          ngModel.$formatters.push(function(value) {
            if (!value) {
              return value;
            }
            if (scope.ignoreTimezone) {
              return new Date(
                  getFullYear(value),
                  getMonth(value),
                  getDate(value),
                  getHours(value),
                  getMinutes(value),
                  getSeconds(value),
                  getMilliseconds(value));
            }
            return new Date(value);
          });

          ngModel.$parsers.push(function(value) {
            if (!value) {
              return value;
            }
            if (scope.ignoreTimezone) {
              value = new Date(Date.UTC(
                  value.getFullYear(),
                  value.getMonth(),
                  value.getDate(),
                  value.getHours(),
                  value.getMinutes(),
                  value.getSeconds(),
                  value.getMilliseconds()));
            }
            return value.toISOString();
          });
        }
      };
    });

angular.module('schemaForm')
    .config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
      function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

        var datetimeedit = function(name, schema, options) {
          if (schema.type === 'string' &&
              (schema.format === 'date' ||
              schema.format === 'time' ||
              schema.format === 'datetime' || // -> datetime-local
              schema.format === 'month' ||
              schema.format === 'week')) {
            var f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            f.type = 'datetimeedit';
            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
          }
        };

        schemaFormProvider.defaults.string.unshift(datetimeedit);

        //Add to the bootstrap directive
        schemaFormDecoratorsProvider.addMapping(
            'bootstrapDecorator',
            'datetimeedit',
            'directives/decorators/bootstrap/datetimeedit/datetime-edit.html'
        );
        schemaFormDecoratorsProvider.createDirective(
            'datetimeedit',
            'directives/decorators/bootstrap/datetimeedit/datetime-edit.html'
        );
      }
    ]);



// add to template cache:

/*

<div class="form-group schema-form-{{form.type}} {{form.htmlClass}}" ng-class="{'has-error': form.disableErrorState !== true && hasError(), 'has-success': form.disableSuccessState !== true && hasSuccess(), 'has-feedback': form.feedback !== false }">
    <label class="control-label {{form.labelHtmlClass}}" ng-class="{'sr-only': !showTitle()}" for="{{form.key.slice(-1)[0]}}">{{form.title}}</label>
    <input ng-if="!form.fieldAddonLeft && !form.fieldAddonRight" ui-mask="9999/99/99 99:99:99"  ui-mask-placeholder ui-mask-placeholder-char="_" ng-show="form.key" type="{{form.type}}" step="any" sf-changed="form" placeholder="{{form.placeholder}}" class="form-control {{form.fieldHtmlClass}}" id="{{form.key.slice(-1)[0]}}" ng-model-options="form.ngModelOptions" ng-model="$$value$$" ng-disabled="form.readonly" schema-validate="form" name="{{form.key.slice(-1)[0]}}" aria-describedby="{{form.key.slice(-1)[0] + 'Status'}}">
    <div ng-if="form.fieldAddonLeft || form.fieldAddonRight" ng-class="{'input-group': (form.fieldAddonLeft || form.fieldAddonRight)}"><span ng-if="form.fieldAddonLeft" class="input-group-addon" ng-bind-html="form.fieldAddonLeft"></span>
        
        <input ng-show="form.key" ui-mask="9999/99/99 99:99:99"  ui-mask-placeholder ui-mask-placeholder-char="_" type="{{form.type}}" step="any" sf-changed="form" placeholder="{{form.placeholder}}" class="form-control {{form.fieldHtmlClass}}" id="{{form.key.slice(-1)[0]}}" ng-model-options="form.ngModelOptions" ng-model="$$value$$" ng-disabled="form.readonly" schema-validate="form" name="{{form.key.slice(-1)[0]}}" aria-describedby="{{form.key.slice(-1)[0] + 'Status'}}"> <span ng-if="form.fieldAddonRight" class="input-group-addon" ng-bind-html="form.fieldAddonRight"></span></div><span ng-if="form.feedback !== false" class="form-control-feedback" ng-class="evalInScope(form.feedback) || {'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError() }" aria-hidden="true"></span> <span ng-if="hasError() || hasSuccess()" id="{{form.key.slice(-1)[0] + 'Status'}}" class="sr-only">{{ hasSuccess() ? '(success)' : '(error)' }}</span>
    <div class="help-block" sf-message="form.description"></div>
</div>

*/

angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put('js/directives/angular-schema-form-bootstrap-ui-dateparser/dateparser.schemaform.template.html',"<div class=\"form-group schema-form-{{form.type}} {{form.htmlClass}}\" ng-class=\"{'has-error': form.disableErrorState !== true && hasError(), 'has-success': form.disableSuccessState !== true && hasSuccess(), 'has-feedback': form.feedback !== false }\"><label class=\"control-label {{form.labelHtmlClass}}\" ng-class=\"{'sr-only': !showTitle()}\" for=\"{{form.key.slice(-1)[0]}}\">{{form.title}}</label> <input ng-if=\"!form.fieldAddonLeft && !form.fieldAddonRight\" ui-mask=\"9999/99/99 99:99:99\"  ui-mask-placeholder ui-mask-placeholder-char=\"_\" ng-show=\"form.key\" type=\"{{form.type}}\" step=\"any\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" class=\"form-control {{form.fieldHtmlClass}}\" id=\"{{form.key.slice(-1)[0]}}\" ng-model-options=\"form.ngModelOptions\" ng-model=\"$$value$$\" ng-disabled=\"form.readonly\" schema-validate=\"form\" name=\"{{form.key.slice(-1)[0]}}\" aria-describedby=\"{{form.key.slice(-1)[0] + 'Status'}}\">  <div ng-if=\"form.fieldAddonLeft || form.fieldAddonRight\" ng-class=\"{'input-group': (form.fieldAddonLeft || form.fieldAddonRight)}\"><span ng-if=\"form.fieldAddonLeft\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonLeft\"></span> <input ng-show=\"form.key\" ui-mask=\"9999/99/99 99:99:99\"  ui-mask-placeholder ui-mask-placeholder-char=\"_\" type=\"{{form.type}}\" step=\"any\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" class=\"form-control {{form.fieldHtmlClass}}\" id=\"{{form.key.slice(-1)[0]}}\" ng-model-options=\"form.ngModelOptions\" ng-model=\"$$value$$\" ng-disabled=\"form.readonly\" schema-validate=\"form\" name=\"{{form.key.slice(-1)[0]}}\" aria-describedby=\"{{form.key.slice(-1)[0] + 'Status'}}\"> <span ng-if=\"form.fieldAddonRight\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonRight\"></span></div><span ng-if=\"form.feedback !== false\" class=\"form-control-feedback\" ng-class=\"evalInScope(form.feedback) || {'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError() }\" aria-hidden=\"true\"></span> <span ng-if=\"hasError() || hasSuccess()\" id=\"{{form.key.slice(-1)[0] + 'Status'}}\" class=\"sr-only\">{{ hasSuccess() ? '(success)' : '(error)' }}</span> <div class=\"help-block\" sf-message=\"form.description\"></div></div>")}]);

angular.module('schemaForm').config(
       ['schemaFormProvider', 'schemaFormDecoratorsProvider','sfPathProvider',
function (schemaFormProvider, schemaFormDecoratorsProvider,sfPathProvider) {

            var dateparser = function (name, schema, options) {
                if (schema.type === 'string' && schema.format === 'dateparser') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'dateparser';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(dateparser);

            //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'dateparser', 'js/directives/angular-schema-form-bootstrap-ui-dateparser/dateparser.schemaform.template.html');
            schemaFormDecoratorsProvider.createDirective('dateparser', 'js/directives/angular-schema-form-bootstrap-ui-dateparser/dateparser.schemaform.template.html');

}]);


angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/external-options/external-options.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false, \'float\': form.float === true }\">\r\n  <label class=\"control-label\" ng-show=\"showTitle()\">\r\n    {{form.title}}\r\n  </label><select ng-model=\"form.selectedOption\"\r\n          ng-model-options=\"form.ngModelOptions\"\r\n          ng-disabled=\"form.readonly\"\r\n          sf-changed=\"form\"\r\n          ng-change=\"changed()\"\r\n          class=\"form-control\"\r\n          schema-validate=\"form\"\r\n          external-options\r\n          links=\"form.schema.links\"\r\n          model=\"model\"\r\n          form=\"form\"\r\n          test=\"evalExpr(this)\"\r\n          ng-options=\"item.value as item.name for item in form.options\" destroy-hidden-data>\r\n          <option ng-show=\"form.selectedOption\" value=\"\"></option>\r\n  </select>\r\n  <div class=\"help-block\"\r\n       ng-show=\"(hasError() && errorMessage(schemaError()))\"\r\n       ng-bind-html=\"(hasError() && errorMessage(schemaError()))\"></div>\r\n</div>\r\n");}]);
angular.module('schemaForm').directive('externalOptions', function() {
  return {
    restrict: 'A',
    require: [ 'ngModel', '?^sfSchema' ],
    scope: {
      test: '=',
      form: '=',
      model: '='
    },
    controller:[ '$scope', '$http', '$interpolate', '$filter', 'sfSelect',
      function($scope, $http, $interpolate, $filter, sfSelect) {

        var i,
            scope = $scope;

        scope.form.options = [];
        scope.currentSource = '';
        scope.externalOptions = {};

        var processOptions = function(optionSource, data, current) {
          var enumTitleMap = [];

          if (data.enum && data.enum.length) {
            for (i = 0; i < data.enum.length; i++) {
              if (data.enum[i] && data.enum[i].length) {
                enumTitleMap.push({ name:data.enum[i], value:data.enum[i] });
              };
            };
            scope.form.options = enumTitleMap;
          }
          else if (data.titleMap) {
            scope.form.options = data.titleMap;
          };

          if (scope.externalOptions[optionSource] !== data) {
            scope.externalOptions[optionSource] = data;
          };

          scope.$watch('form.selectedOption', function(newValue, oldValue) {
            sfSelect(scope.form.key, scope.model, scope.form.selectedOption);
          });

          // determine if the new options contain the old one
          for (var i = 0; i < scope.form.options.length; i++) {
            if (typeof scope.form.options[i].value !== 'undefined' && current === scope.form.options[i].value) {
              scope.form.selectedOption = scope.form.options[i].value;
              return;
            }
          };

          sfSelect(scope.form.key, scope.model, 'null');
          return;
        };

        var loadOptions = function(optionSource, newValue) {
          if (scope.currentSource === optionSource && (typeof scope.externalOptions[optionSource] === 'object')) {
            return;
          }
          else {
            scope.currentSource = optionSource;
          };

          var current = sfSelect(scope.form.key, scope.model);
          current = (current) ? current : undefined;

          optionSource = $filter('_externalOptionUri')(optionSource);

          if (typeof scope.externalOptions[optionSource] === 'object') {
            processOptions(optionSource, scope.externalOptions[optionSource], current);
            return;
          };

          $http.get(optionSource, { responseType: 'json' })
            .success(function(data, status) {
              processOptions(optionSource, data, current);
            })
            .error(function(data, status) {
              scope.form.options = [];
              scope.form.selectedOption = '';
              sfSelect(scope.form.key, scope.model, scope.form.selectedOption);
            });
        };

        if (!!scope.form.optionData) {
          scope.$parent.evalExpr('this').$watchCollection(scope.form.optionData, function(newOptions, oldOptions) {
            var options = {};
            if (angular.isArray(newOptions) && newOptions.length) {
              options = (angular.isString(newOptions[0])) ? { enum: newOptions } : { titleMap: newOptions };
            };
            processOptions('data:' + scope.form.optionData, options, scope.form.selectedOption);
          });
        }
        else if (scope.form.parameters && scope.form.parameters.length) {
          for (var i = 0; i < scope.form.parameters.length; i++) {
            if (angular.isDefined(scope.form.parameters[i])) {
              scope.$watch(scope.form.parameters[i][1], function(newValue, oldValue) {
                var newValue = $filter('_externalOptionUriField')(newValue),
                    exp,
                    optionSource;

                if (newValue) {
                  exp = $interpolate(scope.form.optionSource, false, null, true);
                  optionSource = exp(scope);
                  loadOptions(optionSource, scope.form.key);
                }
                else {
                  scope.form.options = [];
                };
              });
            };
          };
        }
        else {
          loadOptions(scope.form.optionSource);
        };
      }
    ]
  };
})
.filter('_externalOptionUriField', [ '$injector', '$filter',
  function($injector, $filter) {
    var _externalOptionUriFieldFilter = function(input) {
      if ($injector.has('externalOptionUriFieldFilter')) {
        input = $filter('externalOptionUriField')(input);
      };
      return input;
    };

    return _externalOptionUriFieldFilter;
  }
])
.filter('_externalOptionUri', [ '$injector', '$filter',
  function($injector, $filter) {
    var _externalOptionUriFilter = function(input) {
      if ($injector.has('externalOptionUriFilter')) {
        input = $filter('externalOptionUri')(input);
      };
      return input;
    };

    return _externalOptionUriFilter;
  }
]);

/**
 * @license Uecomm v{{version}}
 * (c) 2014-{{year}} Singtel Optus. http://optus.com.au
 * License: MIT
 */
(function(angular, undefined) {'use strict';
  angular
    .module('schemaForm')
    .directive('destroyHiddenData', [ 'sfSelect', function(sfSelect) {
      return {
        link: function(scope, element, attrs) {
          var preserve = false;

          scope.$on('$destroy', function() {
            if (typeof scope.form.preserveOnDestroy === 'object' && scope.form.preserveOnDestroy.condition) {
              preserve = scope.evalExpr(scope.form.preserveOnDestroy.condition);
            }
            else if (!!scope.form.preserveOnDestroy) {
              preserve = true;
            };

            if (!preserve) {
              scope.form.selectedOption = '';
              sfSelect(scope.form.key, scope.model, scope.form.selectedOption);
            };
          });
        }
      };
    } ]);
})(window.angular);

/**
 * @license Uecomm v{{version}}
 * (c) 2014-{{year}} Singtel Optus. http://optus.com.au
 * License: MIT
 */
(function(angular, undefined) {'use strict';

  angular
    .module('schemaForm')
    .directive('oyInline', [ 'schemaForm', 'sfValidator', 'sfPath', 'sfSelect',
      function(schemaForm, sfValidator, sfPath, sfSelect) {
        return {
          restrict: 'A',
          require: 'ngModel',
          //scope: false,
          scope: {
            oyInline:'=',
            ngModel: '=',
            ngModelOptions: '=',
            model: '=',
            sfChanged: '=',
            schemaValidate: '='
          },
          link: function(scope, element, attrs, ngModel) {
            var useKey = sfPath.stringify(scope.schemaValidate.key),
                schema = {},
                title = scope.schemaValidate.title || scope.schemaValidate.key.join('.') || '';

            angular.copy(scope.schemaValidate.schema, schema);

            if (schema.properties && schema.anyOf) {
              scope.schemaValidate.schema.allowInvalid = true;
              delete schema.properties;
            };

            ngModel.$name = title;
            ngModel.$options.allowInvalid = true;

            scope.$watchCollection('model' + useKey, function(newVal, oldVal) {
              if (ngModel.$validate) {
                ngModel.$validate();
                if (ngModel.$invalid) { // The field must be made dirty so the error message is displayed
                  ngModel.$dirty = true;
                  ngModel.$pristine = false;
                }
              }
              else {
                ngModel.$setViewValue(ngModel.$viewValue);
              }
            });

            ngModel.$validators = {
              anyOf: function(modelValue, viewValue) {
                tv4.validate(scope.ngModel, schema);
                return tv4.valid;
              }
            };

            // Listen to an event so we can validate the input on request
            scope.$on('schemaFormValidate', function() {
              if (ngModel.$validate) {
                ngModel.$validate();
                if (ngModel.$invalid) { // The field must be made dirty so the error message is displayed
                  ngModel.$dirty = true;
                  ngModel.$pristine = false;
                }
              }
              else {
                ngModel.$setViewValue(ngModel.$viewValue);
              };
            });
          }
        };
      }
    ]);
})(window.angular);

angular.module('schemaForm')
  .config([ 'schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
    function(schemaFormProvider, schemaFormDecoratorsProvider,  sfPathProvider) {
      var i,
          externalOptions
      ;

      externalOptions = function(name, schema, options) {
        var schema = schema || {};
        var stringType = (schema.type === 'string') ? 'string' : schema.type;

        if (typeof stringType === 'Array') {
          stringType = !!schema.type.indexOf('string');
        };

        if (stringType && schema.links && (typeof schema.links) === 'object') {
          for (i = 0; i < schema.links.length; i++) {
            if (schema.links[i].rel === 'options') {
              var related = /({)([^}]*)(})/gm;
              var source = /{{([^}]*)}}/gm;
              var f = schemaFormProvider.stdFormObj(name, schema, options);
              f.key  = options.path;
              f.type = 'select-external';
              f.optionSource = schema.links[i].href.replace(related, '$1$1 model.$2 | _externalOptionUri $3$3');
              f.options = [];
              f.schema = schema;
              f.parameters = [];

              var matched = f.optionSource.match(source);

              while ((matched = source.exec(f.optionSource)) !== null) {
                f.parameters.push(matched);
              }
              options.lookup[sfPathProvider.stringify(options.path)] = f;
              return f;
            }
          }
        }
      };

      schemaFormProvider.defaults.string.unshift(externalOptions);

      //Add to the bootstrap directive
      schemaFormDecoratorsProvider.addMapping(
        'bootstrapDecorator',
        'select-external',
        'directives/decorators/bootstrap/external-options/external-options.html'
      );
      schemaFormDecoratorsProvider.createDirective(
        'select-external',
        'directives/decorators/bootstrap/external-options/external-options.html'
      );

    }
  ]);




angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("js/directives/angular-schema-form-label/label.schemaform.template.html", "<div class=\"form-group form-clean-text\" ng-class=\"{'has-error': hasError(), 'has-success': hasSuccess(), 'has-feedback': form.feedback !== false}\"> <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>  <div class=\"form-clean-text-container\"> <p>{{ $$value$$ }}</p>  </div></div>")}]);
    
angular.module('schemaForm').config(
       ['schemaFormProvider', 'schemaFormDecoratorsProvider','sfPathProvider',
function (schemaFormProvider, schemaFormDecoratorsProvider,sfPathProvider) {

            var ace = function (name, schema, options) {
                if (schema.type === 'string' && schema.format === 'labelText') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'labelText';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(ace);

            //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'labelText', 'js/directives/angular-schema-form-label/label.schemaform.template.html');
            schemaFormDecoratorsProvider.createDirective('labelText', 'js/directives/angular-schema-form-label/label.schemaform.template.html');   

}]);



//------------------DATEPICKER-------------------------------
angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("templates/directives/datasource/view.html","<div class=\"form-group {{form.htmlClass}}\" ng-class=\"{'has-error': hasError()}\"><div class=\"input-group\"><div class=\"input-group-addon\"><span class=\"fa fa-calendar txt-danger form-control-feedback\"></span></div><input type=\"text\" sf-field-model schema-validate=\"form\" ng-model=\"$$value$$\" mask=\"99/99/9999 - 99/99/9999\" restrict=\"reject\"  data-placeholder=\"{{form.placeholder || form.schema.placeholder || ('placeholders.select' )}}\" dataformat=\"{{form.dateformat || form.schema.dateformat}}\" setranges=\"true\" custom-datepicker /></div></div>")}]);


angular.module('schemaForm').config(
       ['schemaFormProvider', 'schemaFormDecoratorsProvider','sfPathProvider',
function (schemaFormProvider, schemaFormDecoratorsProvider,sfPathProvider) {

            var datepicker = function (name, schema, options) {
                if (schema.type === 'string' && schema.format === 'datepicker') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'datepicker';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(datepicker);

            //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'datepicker', 'templates/directives/datasource/view.html');
            schemaFormDecoratorsProvider.createDirective('datepicker', 'templates/directives/datasource/view.html');

}])
.directive('datepicker', function() {

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '=',


    }
  };
});
//------------------DATEPICKER-------------------------------


//------------------DYNAMIC SELECT-------------------------------
//---------------------------------------------------------------


angular.module('schemaForm').config(
    ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
        function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

            var select = function (name, schema, options) {
                if ((schema.type === 'string') && ("enum" in schema)) {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'strapselect';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(select);

            //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapselect',
                'directives/decorators/bootstrap/strap/strapselect.html');
            schemaFormDecoratorsProvider.createDirective('strapselect',
                'directives/decorators/bootstrap/strap/strapselect.html');

            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapmultiselect',
                'directives/decorators/bootstrap/strap/strapmultiselect.html');
            schemaFormDecoratorsProvider.createDirective('strapmultiselect',
                'directives/decorators/bootstrap/strap/strapmultiselect.html');

            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapselectdynamic',
                'directives/decorators/bootstrap/strap/strapselect.html');
            schemaFormDecoratorsProvider.createDirective('strapselectdynamic',
                'directives/decorators/bootstrap/strap/strapselect.html');

            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapmultiselectdynamic',
                'directives/decorators/bootstrap/strap/strapmultiselect.html');
            schemaFormDecoratorsProvider.createDirective('strapmultiselectdynamic',
                'directives/decorators/bootstrap/strap/strapmultiselect.html');


            // UI SELECT
            //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'uiselect',
                'directives/decorators/bootstrap/uiselect/uiselect.html')

            schemaFormDecoratorsProvider.createDirective('uiselect',
                'directives/decorators/bootstrap/uiselect/uiselect.html');

            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'uiselectmultiple',
                'directives/decorators/bootstrap/uiselect/uiselectmultiple.html')

            schemaFormDecoratorsProvider.createDirective('uiselectmultiple',
                'directives/decorators/bootstrap/uiselect/uiselectmultiple.html');

        }])
    .directive("toggleSingleModel", function() {
        // some how we get this to work ...
        return {
            require: 'ngModel',
            restrict: "A",
            scope: {},
            replace: true,
            controller: ['$scope', function($scope)  {
                $scope.$parent.$watch('select_model.selected',function(){
                    if($scope.$parent.select_model.selected != undefined) {
                        $scope.$parent.insideModel = $scope.$parent.select_model.selected.value;
                        $scope.$parent.ngModel.$setViewValue($scope.$parent.select_model.selected.value);
                    }
                });
            }]
        };
    })
    .directive("toggleModel", function() {
        // some how we get this to work ...
        return {
            require: 'ngModel',
            restrict: "A",
            scope: {},
            controller: ['$scope','sfSelect', function($scope,  sfSelect)  {
                var list = sfSelect($scope.$parent.form.key, $scope.$parent.model);
                //as per base array implemenation if the array is undefined it must be set as empty for data binding to work
                if (angular.isUndefined(list)) {
                    list = [];
                    sfSelect($scope.$parent.form.key, $scope.$parent.model, list);
                }
                $scope.$parent.$watch('form.selectedOptions',function(){
                    if (!($scope.$parent.form.selectedOptions)) {

                    } else
                    if($scope.$parent.form.selectedOptions.length == 0) {

                        if($scope.$parent.ngModel.$viewValue != undefined) {
                            $scope.$parent.ngModel.$setViewValue($scope.$parent.form.selectedOptions);
                        }
                    } else {
                        $scope.$parent.$$value$$ = [];
                        $scope.$parent.form.selectedOptions.forEach(function (item){
                                $scope.$parent.$$value$$.push(item.value);
                            }
                        );
                        $scope.$parent.ngModel.$setViewValue($scope.$parent.$$value$$);
                    }
                }, true);
            }]
        };
    })
    .directive('multipleOn', function() {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch(
                    function () { return $element.attr('multiple-on'); },
                    function (newVal) {

                        if(newVal == "true") {
                            var select_scope = angular.element($element).scope().$$childTail;
                            select_scope.$isMultiple = true;
                            select_scope.options.multiple = true;
                            select_scope.$select.$element.addClass('select-multiple');
                        }
                        else {
                            angular.element($element).scope().$$childTail.$isMultiple = false;
                        }
                    }
                );
            }
        };
    })
    .filter('whereMulti', function() {
        return function(items, key, values) {
            var out = [];

            if (angular.isArray(values) && items !== undefined) {
                values.forEach(function (value) {
                    for (var i = 0; i < items.length; i++) {
                        if (value == items[i][key]) {
                            out.push(items[i]);
                            break;
                        }
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    })
    .filter('propsFilter', function() {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        if (item.hasOwnProperty(prop)) {
                            //only match if this property is actually in the item to avoid
                            var text = props[prop].toLowerCase();
                            //search for either a space before the text or the textg at the start of the string so that the middle of words are not matched
                            if (item[prop].toString().toLowerCase().indexOf(text) === 0 || ( item[prop].toString()).toLowerCase().indexOf(' ' + text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });

angular.module('schemaForm').controller('dynamicSelectController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {


    $scope.triggerTitleMap = function () {
        // Ugly workaround to trigger titleMap expression re-evaluation so that the selectFilter it reapplied.
        $scope.form.titleMap.push({"value": "345890u340598u3405u9", "name": "34095u3p4ouij"})
        $timeout(function () {

        $scope.form.titleMap.pop() ;
        if($scope.form.options.asyncReloadOnFilterTrigger){

            $scope.form.options.populateTitleMap = $scope.populateTitleMap;
            $scope.form.options.form = $scope.form;

            var aCll = $scope.form.options.asyncCallback();
            if(typeof aCll.then == "function"){
                aCll.then(function(result) { $scope.form.titleMap = result.data;

                 $scope.populateTitleMap($scope.form);

                });
            }
        }

        });
    };

    $scope.initFiltering = function (localModel) {
        if ($scope.form.options.filterTriggers) {
            $scope.form.options.filterTriggers.forEach(function (trigger) {
                $scope.$parent.$watch(trigger, $scope.triggerTitleMap)

            });
        }
        // This is set here, as the model value may become unitialized and typeless if validation fails.
        $scope.localModelType =  Object.prototype.toString.call(localModel);
        $scope.filteringInitialized = true;
    };


    $scope.remap = function (options, data) {
        if (options && "map" in options && options.map) {
            var current_row = null;
            var result = [];
            data.forEach(function (current_row) {
                current_row["value"] = current_row[options.map.valueProperty];
                current_row["name"] = current_row[options.map.nameProperty];
                result.push(current_row);
            });
            return result;

        }
        else {
            data.forEach(function (item) {
                    if ("text" in item) {
                        item.name = item.text
                    }
                }
            );
            return data;
        }
    };

    $scope.clone = function (obj) {
        if (null == obj || "object" != typeof(obj)) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = $scope.clone(obj[attr]);
        }
        return copy;
    };


    $scope.getCallback = function (callback, name) {
        if (typeof(callback) == "string") {
            var _result = $scope.$parent.evalExpr(callback);
            if (typeof(_result) == "function") {
                return _result;
            }
            else {
                throw("A callback string must match name of a function in the parent scope")
            }

        }
        else if (typeof(callback) == "function") {
            return callback;
        }
        else {
            throw("A callback must either be a string matching the name of a function in the parent scope or a " +
            "direct function reference")

        }
    };

    $scope.getOptions = function (options) {
        // If defined, let the a callback function manipulate the options
        if (options.httpPost && options.httpPost.optionsCallback) {
            var newOptionInstance = $scope.clone(options);
            return $scope.getCallback(options.httpPost.optionsCallback)(newOptionInstance);
        }
        if (options.httpGet && options.httpGet.optionsCallback) {
            var newOptionInstance = $scope.clone(options);
            return $scope.getCallback(options.httpGet.optionsCallback)(newOptionInstance);
        }
        else {
            return options;
        }
    };

    $scope.test = function (form) {
        form.titleMap.pop();
    };

    $scope.populateTitleMap = function (form) {

        if ("enum" in form.schema) {
            form.titleMap = [];
            form.schema.enum.forEach(function (item) {
                    form.titleMap.push({"value": item, "name": item})
                }
            );

        } else if (form.titleMap) {

        }
        else if (!form.options) {

        }
        else if (form.options.callback) {
            form.titleMap = $scope.getCallback(form.options.callback)(form.options);
        }
        else if (form.options.asyncCallback) {
            return $scope.getCallback(form.options.asyncCallback)(form.options).then(
                function (_data) {
                    form.titleMap = $scope.remap(form.options, _data.data);
                },
                function (data, status) {
                    alert("Loading select items failed(Options: '" + String(form.options) +
                        "\nError: " + status);
                });
        }
        else if (form.options.httpPost) {
            var finalOptions = $scope.getOptions(form.options);

            return $http.post(finalOptions.httpPost.url, finalOptions.httpPost.parameter).then(
                function (_data) {

                    form.titleMap = $scope.remap(finalOptions, _data.data);
                },
                function (data, status) {
                    alert("Loading select items failed (URL: '" + String(finalOptions.httpPost.url) +
                        "' Parameter: " + String(finalOptions.httpPost.parameter) + "\nError: " + status);
                });
        }
        else if (form.options.httpGet) {
            var finalOptions = $scope.getOptions(form.options);
            return $http.get(finalOptions.httpGet.url, finalOptions.httpGet.parameter).then(
                function (data) {
                    form.titleMap = $scope.remap(finalOptions, data.data);
                },
                function (data, status) {
                    alert("Loading select items failed (URL: '" + String(finalOptions.httpGet.url) +
                        "\nError: " + status);
                });
        }
    };
    $scope.uiMultiSelectInitInternalModel = function(_model)
    {
        function find_in_titleMap(value) {
            if($scope.form.titleMap){
                for (i = 0; i < $scope.form.titleMap.length; i++) {
                    if ($scope.form.titleMap[i].value == value) {
                        return $scope.form.titleMap[i].name
                    }
                }
            }
            return value;
        }
        $scope.internalModel = [];
        if (_model !== undefined && angular.isArray(_model)){
            _model.forEach(function (value) {
                    $scope.internalModel.push({"value": value, "name": find_in_titleMap(value) })
                }

            )
        }
    }

}]);

angular.module('schemaForm').filter('selectFilter', [function ($filter) {
    return function (inputArray, controller, localModel, strLocalModel) {
        // As the controllers' .model is the global and its form is the local, we need to get the local model as well.
        // We also need tp be able to set it if is undefined after a validation failure,so for that we need
        // its string representation as well as we do not know its name. A typical value if strLocalModel is model['groups']
        // This is very ugly, though. TODO: Find out why the model is set to undefined after validation failure.

        if (!angular.isDefined(inputArray) || !angular.isDefined(controller.form.options) ||
            !angular.isDefined(controller.form.options.filter) || controller.form.options.filter == '') {
            return inputArray;
        }

        if (!controller.filteringInitialized) {
            controller.initFiltering(localModel);
        }
        var data = [];


        angular.forEach(inputArray, function (curr_item) {
            if (controller.$eval(controller.form.options.filter, {item: curr_item})) {
                data.push(curr_item);
            }
            else if (localModel) {
                // If not in list, also remove the set value

                if (controller.localModelType == "[object Array]" && localModel.indexOf(curr_item.value) > -1) {
                    localModel.splice(localModel.indexOf(curr_item.value), 1);
                }
                else if (localModel == curr_item.value) {
                    localModel = null;
                }
            }
        });

        if (controller.localModelType == "[object Array]" && !localModel) {
            // An undefined local model seems to mess up bootstrap select's indicators

            controller.$eval(strLocalModel + "=[]");
        }

        return data;
    };
}]);

//---------------------------------------------------------------
//------------------END DYNAMIC SELECT---------------------------
//---------------------------------------------------------------


// angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("js/directives/angular-schema-form-ui-select/single.html","<div class=\"form-group {{ ::form.htmlClass}}\" initializer ng-class=\"{'has-error': hasError(), 'has-success': hasSuccess(), 'has-feedback': form.feedback !== false} \" >  <label class=\"control-label\" ng-show=\"showTitle()\">{{ ::form.title}}</label>   <div class=\"form-group  dzup-ui-select\" ng-model=\"$$value$$\">    <ui-select ng-model=\"select_model.selected\" ng-controller=\"UiSelectController\" theme=\"bootstrap\" ng-disabled=\"form.disabled\" on-select=\"$$value$$=$item.value; form.options.eventCallback($item.value)\" class=\"{{form.options.uiClass}}\">       <ui-select-match allow-clear class=\"ui-select-match\" placeholder=\"{{form.placeholder || form.schema.placeholder || ('placeholders.select' )}}\">{{ select_model.selected.label}}</ui-select-match>       <ui-select-choices class=\"ui-select-choices\" position=\"down\" refresh=\"fetchResult(form.schema, form.options, $select.search)\"              refresh-delay=\"form.options.refreshDelay\" group-by=\"form.options.groupBy\"  repeat=\"item in form.schema.items | propsFilter: {label: $select.search, description: (form.options.searchDescriptions===true ? $select.search : 'NOTSEARCHINGFORTHIS') }\"  >  <div ng-bind-html=\"::item.label | highlight: $select.search\"></div>  <div ng-if=\"item.description\"> <span ng-bind-html=\"::'<small>' + (''+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : 'NOTSEARCHINGFORTHIS'))+ '</small>'\"></span></div>  </ui-select-choices> </ui-select> <input type=\"hidden\" sf-changed=\"form\" ng-model=\"insideModel\" schema-validate=\"form\" /><span ng-if=\"form.feedback !== false\" class=\"form-control-feedback\" ng-class=\"evalInScope(form.feedback) || {'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError() }\"></span> <div class=\"help-block\" ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\" ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div> </div> </div>")}]);


angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("js/directives/angular-schema-form-ui-select/single.html","<div class=\"form-group {{ ::form.htmlClass}}\" initializer ng-class=\"{'has-error': hasError(), 'has-success': hasSuccess(), 'has-feedback': form.feedback !== false} \" >  <label class=\"control-label\" ng-show=\"showTitle()\">{{ ::form.title}}</label>   <div class=\"form-group  dzup-ui-select\" sf-changed=\"form\" schema-validate=\"form\" ng-model=\"$$value$$\">    <ui-select ng-model=\"select_model.selected\" ng-controller=\"UiSelectController\" theme=\"bootstrap\" ng-disabled=\"form.disabled\" on-select=\"$$value$$=$item.value; form.options.eventCallback($item.value)\" class=\"{{form.options.uiClass}}\">       <ui-select-match allow-clear class=\"ui-select-match\" placeholder=\"{{form.placeholder || form.schema.placeholder || ('placeholders.select' )}}\">{{ select_model.selected.label}}</ui-select-match>       <ui-select-choices class=\"ui-select-choices\" position=\"down\" refresh=\"fetchResult(form.schema, form.options, $select.search)\"              refresh-delay=\"form.options.refreshDelay\" group-by=\"form.options.groupBy\"  repeat=\"item in form.schema.items | propsFilter: {label: $select.search, description: (form.options.searchDescriptions===true ? $select.search : 'NOTSEARCHINGFORTHIS') }\"  >  <div ng-bind-html=\"::item.label | highlight: $select.search\"></div>  <div ng-if=\"item.description\"> <span ng-bind-html=\"::'<small>' + (''+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : 'NOTSEARCHINGFORTHIS'))+ '</small>'\"></span></div>  </ui-select-choices> </ui-select> <span ng-if=\"form.feedback !== false\" class=\"form-control-feedback\" ng-class=\"evalInScope(form.feedback) || {'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError() }\"></span> <div class=\"help-block\" ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\" ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div> </div> </div>")}]);


/*angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/uiselect/single.html","")}]);*/


angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("js/directives/angular-schema-form-ui-select/multi.html","<div class=\"form-group {{form.htmlClass}}\" ng-class=\"{'has-error': hasError(), 'has-success': hasSuccess(), 'has-feedback': form.feedback !== false}\" ng-init=\"form.select_models=(form.schema.items| whereMulti : 'value' : ($$value$$||[]))\"> <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label> <div class=\"form-group\" ng-controller=\"UiSelectController\">     <ui-select multiple sortable-options=\"{{form.sortableOptions}}\" ng-if=\"!(form.options.tagging||false)\" ng-model=\"form.select_models\" theme=\"bootstrap\" on-select=\"$$value$$.push($item.value)\" on-remove=\"$$value$$.splice($$value$$.indexOf($item.value), 1)\" class=\"{{form.options.uiClass}}\">       <ui-select-match placeholder=\"{{form.placeholder || form.schema.placeholder || ('placeholders.select' )}}\">{{$item.label}}</ui-select-match>       <ui-select-choices refresh=\"fetchResult(form.schema, form.options, $select.search)\"         refresh-delay=\"form.options.refreshDelay\" group-by=\"form.options.groupBy\"  repeat=\"item in form.schema.items | propsFilter: {label: $select.search, description: (form.options.searchDescriptions===true ? $select.search : 'NOTSEARCHINGFORTHIS') }\">         <div ng-bind-html=\"item.label | highlight: $select.search\"></div>        <div ng-if=\"item.description\">          <span ng-bind-html=\"'<small>' + (''+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : 'NOTSEARCHINGFORTHIS'))+ '</small>'\"></span>         </div>     </ui-select-choices>     </ui-select>     <ui-select ng-controller=\"UiSelectController\" multiple ng-if=\"(form.options.tagging||false) && !(form.options.groupBy || false)\" tagging=\"form.options.tagging||false\" tagging-label=\"form.options.taggingLabel\" tagging-tokens=\"form.options.taggingTokens\" sortable-options=\"{{form.sortableOptions}}\" ng-model=\"form.select_models\" theme=\"bootstrap\" on-select=\"$$value$$.push($item.value)\" on-remove=\"$$value$$.splice($$value$$.indexOf($item.value), 1)\" class=\"{{form.options.uiClass}}\">      <ui-select-match placeholder=\"{{form.placeholder || form.schema.placeholder || ('placeholders.select' )}}\">{{$item.label}}&nbsp;<small>{{($item.isTag===true ?  form.options.taggingLabel : '')}}</small></ui-select-match>       <ui-select-choices  refresh-delay=\"form.options.refreshDelay\" refresh=\"fetchResult(form.schema, form.options, $select.search)\"          refresh-delay=\"form.options.refreshDelay\" repeat=\"item in form.schema.items | propsFilter: {label: $select.search, description: (form.options.searchDescriptions===true ? $select.search : 'NOTSEARCHINGFORTHIS') }\">           <div ng-if=\"item.isTag\" ng-bind-html=\"'<div>' + (item.label   | highlight: $select.search) + ' ' + form.options.taggingLabel + '</div><div class=&quot;divider&quot;></div>'\"></div>           <div ng-if=\"!item.isTag\" ng-bind-html=\"item.label + item.isTag | highlight: $select.search\"></div>       <div ng-if=\"item.description\">         <span ng-bind-html=\"'<small>' + (''+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : 'NOTSEARCHINGFORTHIS')) + '</small>'\"></span>      </div>    </ui-select-choices>   </ui-select> <ui-select ng-controller=\"UiSelectController\" multiple ng-if=\"(form.options.tagging||false) && (form.options.groupBy || false)\" tagging=\"form.options.tagging||false\" tagging-label=\"form.options.taggingLabel\" tagging-tokens=\"form.options.taggingTokens\" sortable-options=\"{{form.sortableOptions}}\" ng-model=\"form.select_models\" theme=\"bootstrap\" on-select=\"$$value$$.push($item.value)\" on-remove=\"$$value$$.splice($$value$$.indexOf($item.value), 1)\" class=\"{{form.options.uiClass}}\">      <ui-select-match placeholder=\"{{form.placeholder || form.schema.placeholder || ('placeholders.select' )}}\">{{$item.label}}&nbsp;<small>{{($item.isTag===true ?  form.options.taggingLabel : '')}}</small></ui-select-match>       <ui-select-choices group-by=\"form.options.groupBy\" refresh-delay=\"form.options.refreshDelay\" refresh=\"fetchResult(form.schema, form.options, $select.search)\"   refresh-delay=\"form.options.refreshDelay\" repeat=\"item in form.schema.items | propsFilter: {label: $select.search, description: (form.options.searchDescriptions===true ? $select.search : 'NOTSEARCHINGFORTHIS') }\">     <div ng-if=\"item.isTag\" ng-bind-html=\"'<div>' + (item.label   | highlight: $select.search) + ' ' + form.options.taggingLabel + '</div><div class=&quot;divider&quot;></div>'\"></div>        <div ng-if=\"!item.isTag\" ng-bind-html=\"item.label + item.isTag | highlight: $select.search\"></div>       <div ng-if=\"item.description\">         <span ng-bind-html=\"'<small>' + (''+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : 'NOTSEARCHINGFORTHIS')) + '</small>'\"></span>      </div>    </ui-select-choices>    </ui-select>    <input toggle-model type=\"hidden\" ng-model=\"insideModel\" sf-changed=\"form\" schema-validate=\"form\" />    <span ng-if=\"form.feedback !== false\"      class=\"form-control-feedback\"       ng-class=\"evalInScope(form.feedback) || {'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-remove': hasError() }\"></span>    <div class=\"help-block\"      ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\"       ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div>  </div> </div>")}]);





angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

                var uiselect = function (name, schema, options) {
                    if (schema.type === 'string' && schema.format == 'uiselect') {
                        var f = schemaFormProvider.stdFormObj(name, schema, options);
                        f.key = options.path;
                        f.type = 'uiselect';
                        options.lookup[sfPathProvider.stringify(options.path)] = f;
                        return f;
                    }
                };

                schemaFormProvider.defaults.string.unshift(uiselect);

                var uiselect = function (name, schema, options) {
                    if (schema.type === 'number' && schema.format == 'uiselect') {
                        var f = schemaFormProvider.stdFormObj(name, schema, options);
                        f.key = options.path;
                        f.type = 'uiselect';
                        options.lookup[sfPathProvider.stringify(options.path)] = f;
                        return f;
                    }
                };

                schemaFormProvider.defaults.number.unshift(uiselect);

                var uimultiselect = function (name, schema, options) {
                    if (schema.type === 'array' && schema.format == 'uiselect') {
                        var f = schemaFormProvider.stdFormObj(name, schema, options);
                        f.key = options.path;
                        f.type = 'uimultiselect';
                        options.lookup[sfPathProvider.stringify(options.path)] = f;
                        return f;
                    }
                };
                schemaFormProvider.defaults.array.unshift(uimultiselect);


                //Add to the bootstrap directive
                /*schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'uiselect',
    'directives/decorators/bootstrap/uiselect/single.html');
    schemaFormDecoratorsProvider.createDirective('uiselect',
    'directives/decorators/bootstrap/uiselect/single.html');
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'uimultiselect',
    'directives/decorators/bootstrap/uiselect/multi.html');
    schemaFormDecoratorsProvider.createDirective('uimultiselect',
    'directives/decorators/bootstrap/uiselect/multi.html');
  }])*/
                schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'uiselect',
                    'js/directives/angular-schema-form-ui-select/single.html');
                schemaFormDecoratorsProvider.createDirective('uiselect',
                    'directives/decorators/bootstrap/uiselect/single.html');
                schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'uimultiselect',
                    'js/directives/angular-schema-form-ui-select/multi.html');
                schemaFormDecoratorsProvider.createDirective('uimultiselect',
                    'js/directives/angular-schema-form-ui-select/multi.html');
  }])
    .directive("initializer", function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            controller: ['$scope', '$q', '$timeout', function ($scope, $q, $timeout) {
                
                $scope.prepareKey = function(keyArray){
                    var key = '';
                    _.forEach(keyArray, function(item){
                        key+=(item+'.');
                    });
                    key = key.substr(0, key.length-1);
                    
                    return key;
                };
                
                //  $scope.ttt = "asdf";
                $timeout(function(){
                    $q.when($scope.form.options.callback).then(function (data) {
                        
                        var k = $scope.prepareKey($scope.form.key);
                        var v = _.get($scope.model, k);
                        var s = _.filter(data, v);
                        
                        if (s && s.length){
                            $scope.select_models = s;
                            //this helps me to bind data from $resource or $http or object

                            $scope.select_model = {
                                selected: $scope.select_models[0]
                            }
                        }
                        
                    /*var val = $scope.model[$scope.form.key[0]];
                    if (val) {
                        var selected = _.filter(data, val);
                        if (selected && selected.length) {
                            $scope.select_models = selected;
                            //this helps me to bind data from $resource or $http or object

                            $scope.select_model = {
                                selected: $scope.select_models[0]
                            }
                        }
                    }*/
                });
                },100);
                
                
                
            }]
        }

    })
    .directive("toggleSingleModel", function () {
        // some how we get this to work ...
        return {
            require: 'ngModel',
            restrict: "A",
            scope: {},
            replace: true,
            controller: ['$scope', function ($scope) {
                $scope.$parent.$watch('select_model.selected', function () {
                    if ($scope.$parent.select_model.selected != undefined) {
                        $scope.$parent.insideModel = $scope.$parent.select_model.selected.value;
                        $scope.$parent.ngModel.$setViewValue($scope.$parent.select_model.selected.value);
                    }
                });
      }],
        };
    })
    .directive("toggleModel", function () {
        // some how we get this to work ...
        return {
            require: 'ngModel',
            restrict: "A",
            scope: {},
            replace: true,
            controller: ['$scope', 'sfSelect', function ($scope, sfSelect) {
                var list = sfSelect($scope.$parent.form.key, $scope.$parent.model);
                //as per base array implemenation if the array is undefined it must be set as empty for data binding to work
                if (angular.isUndefined(list)) {
                    list = [];
                    sfSelect($scope.$parent.form.key, $scope.$parent.model, list);
                }
                $scope.$parent.$watch('form.select_models', function () {
                    if ($scope.$parent.form.select_models.length == 0) {
                        $scope.$parent.insideModel = $scope.$parent.$$value$$;
                        if ($scope.$parent.ngModel.$viewValue != undefined) {
                            $scope.$parent.ngModel.$setViewValue($scope.$parent.form.select_models);
                        }
                    } else {
                        $scope.$parent.insideModel = $scope.$parent.form.select_models;
                        $scope.$parent.ngModel.$setViewValue($scope.$parent.form.select_models);
                    }
                }, true);
      }],
        };
    })
    .filter('whereMulti', function () {
        return function (items, key, values) {
            var out = [];

            if (angular.isArray(values)) {
                values.forEach(function (value) {
                    for (var i = 0; i < items.length; i++) {
                        if (value == items[i][key]) {
                            out.push(items[i]);
                            break;
                        }
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    })
    .filter('whereSingle', ['$q', function ($q) {
        /*var data = null,
            serviceInvoked = false;

        var fn = function (list, k, vals) {
            if (k.value) {
                return _.filter(list, k);
            } else {
                return null;
            }
        }*/

        flt.$stateful = true;

        function flt(items, key, values) {
            /*if (null===data){
                
            }else{
                return fn(items,key,values)
            }*/

            /*$q.when(items).then(function (data) {
                if (key.value) {
                    return _.filter(data, key);
                } else {
                    return null;
                }
            });*/
            if (key.value) {

                return _.filter(items, key);
            } else {
                return null;
            }

        };
        return flt;
    }])
    .filter('propsFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        if (item.hasOwnProperty(prop)) {
                            //only match if this property is actually in the item to avoid
                            var text = props[prop].toLowerCase();
                            //search for either a space before the text or the textg at the start of the string so that the middle of words are not matched
                            if (item[prop].toString().toLowerCase().indexOf(text) === 0 || (item[prop].toString()).toLowerCase().indexOf(' ' + text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    })
    .controller('UiSelectController', ['$scope', '$http', '$q', function ($scope, $http, $q) {

        //Infinite Scroll Magic
        $scope.infiniteScroll = {};
        $scope.infiniteScroll.numToAdd = 10;
        $scope.infiniteScroll.currentItems = 10;

        $scope.resetInfScroll = function () {
            $scope.infiniteScroll.currentItems = $scope.infiniteScroll.numToAdd;
        };
        $scope.addMoreItems = function () {
            $scope.infiniteScroll.currentItems += $scope.infiniteScroll.numToAdd;
        };


        $scope.fetchResult = function (schema, options, search) {
            if (options) {
                if (options.callback) {
                    /*if (angular.isFunction(options.callback)){
                        if (angular.isFunction(options.callback.then)){
                            options.callback.then(function(data){
                              schema.items = data;      
                            });
                        }else{
                          schema.items = options.callback(schema, options, search);      
                      }
                      
                    }else{
                        schema.items = options.callback;
                    }*/

                    if (angular.isFunction(options.callback)) {
                        if (angular.isFunction(options.callback.then)) {
                            options.callback.then(function (data) {
                                schema.items = data;
                            });
                        } else {
                            schema.items = options.callback(schema, options, search);
                        }
                    } else {
                        $q.when(options.callback).then(function (data) {
                            schema.items = data;
                            //this helps me to bind data from $resource or $http or object
                        });
                    }

                    // console.log('items', schema.items);
                } else if (options.http_post) {
                    return $http.post(options.http_post.url, options.http_post.parameter).then(
                        function (_data) {
                            schema.items = _data.data;
                            //   console.log('items', schema.items);
                        },
                        function (data, status) {
                            alert("Loading select items failed (URL: '" + String(options.http_post.url) +
                                "' Parameter: " + String(options.http_post.parameter) + "\nError: " + status);
                        });
                } else if (options.http_get) {
                    return $http.get(options.http_get.url, options.http_get.parameter).then(
                        function (_data) {
                            schema.items = _data.data;
                            // console.log('items', schema.items);
                        },
                        function (data, status) {
                            alert("Loading select items failed (URL: '" + String(options.http_get.url) +
                                "\nError: " + status);
                        });
                } else if (options.async) {
                    return options.async.call(schema, options, search).then(
                        function (_data) {
                            schema.items = _data.data;
                            // console.log('items', schema.items);
                        },
                        function (data, status) {
                            alert("Loading select items failed(Options: '" + String(options) +
                                "\nError: " + status);
                        });
                }

            }
        };
  }])


angular.module("template/modal/window.html", []).run(["$templateCache",
    function ($templateCache) {
        $templateCache.put("template/modal/window.html",
            "<div tabindex=\"-1\" role=\"dialog\" class=\"modal fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
            "    <div class=\"modal-dialog \" ng-class=\"size ? 'modal-'+size : ''\"><div class=\"modal-content\" ng-transclude></div></div>\n" +
            "</div>");
}]);

angular
    .module('schemaForm')
    .directive(
        'uiAceWrapper', [
        function () {

                var findMode = function (modes, language) {
                    if (language && modes) {
                        var selected = null;
                        for (var i = 0; i < modes.length; i++) {
                            if (modes[i].ext === language)
                                selected = modes[i];
                        }
                        return selected;
                    }
                    return null;
                };

                return {
                    restrict: 'EA',
                    transclude: true,
                    template: '<div ng-class="{\'grayshadow\': fullView }"><div class="ace-wrapper" ng-class="{\'fullView\': fullView }"  ng-transclude></div></div>',
                    controller: function ($rootScope, $scope, $uibModal) {
                        $scope.modes = [
                            {
                                name: 'json',
                                mode: 'json',
                                ext: 'json'
                            }
                        ];

                        $scope.themes = ['chrome', 'monokai', 'twilight'];



                        $scope.selectedTheme = $scope.themes[0];
                        if ($scope.language) {
                            var selected = null;
                            for (var i = 0; i < $scope.modes.length; i++) {
                                if ($scope.modes[i].ext === $scope.language)
                                    selected = $scope.modes[i];
                            }

                            if (selected === null)
                                $scope.selectedMode = $scope.modes[0];
                            else
                                $scope.selectedMode = selected;

                        } else {
                            $scope.selectedMode = $scope.modes[0];
                        }

                        $scope.fullView = false;
                        $scope.toogleFullViewName = 'Full View';



                    },
                    link: function (scope, element, attrs, ngModel) {

                        scope._editor = null;

                        scope.fullEdit = function () {

                            if (scope.fullView)
                                scope.fullView = false;
                            else
                                scope.fullView = true;

                            if (scope.fullView)
                                scope.toogleFullViewName = 'Exit Full View';
                            else
                                scope.toogleFullViewName = 'Full View';

                            setTimeout(function () {
                                $(window).trigger('resize');
                            });
                        }

                        scope.language = 'json';

                        scope.onChangedTheme = function () {
                            scope._editor.setTheme('ace/theme/' + this.selectedTheme);
                        };

                        scope.onChangedMode = function () {
                            scope._editor.getSession().setMode('ace/mode/' + this.selectedMode.mode);
                            scope.language = this.selectedMode.mode;
                        };


                        scope.aceOption = {
                            onLoad: function (_editor) {
                                scope._editor = _editor;
                                _editor.setTheme('ace/theme/' + scope.selectedTheme);
                                _editor.getSession().setMode('ace/mode/' + scope.selectedMode.mode);
                                //      _editor.setAutoScrollEditorIntoView(true);    

                               // _editor.on("input", scope.updateEditorOnInput);



                                _editor.commands.addCommand({
                                    name: 'Format',
                                    bindKey: {
                                        win: 'Ctrl-Shift-F',
                                        mac: 'Ctrl-Shift-F'
                                    },
                                    exec: function (editor) {
                                        var m = scope.language; //scope.selectedMode.mode;
                                        var val = scope._editor.getSession().getValue();
                                        var formatted = val;
                                        // alert('It is formatting: '+m);
                                        // scope.$parent.$parent.$parent.shortCutSave();
                                        if (m === 'js') {
                                            formatted = js_beautify(val);
                                        } else if (m === 'fruit' || m === 'dsl') {

                                            formatted = val; // JSON.stringify(vkbeautify.json(json, 4));
                                        } else if (m === 'xml' || m === 'gui') {
                                            formatted = vkbeautify.xml(val);
                                        }
                                        scope._editor.getSession().setValue(formatted);
                                    }
                                });



                                _editor.setOptions({
                                    useWrapMode: true,
                                    showGutter: true,
                                    enableBasicAutocompletion: true,
                                    enableSnippets: true,
                                    enableLiveAutocompletion: true
                                });
                            }
                        };

                       /* scope.$watch('$parent.model', function (newValue, oldValue) {
                            if (newValue && newValue.language) {
                                var selectedModel = findMode(scope.modes, newValue.language);
                                if (selectedModel) {
                                    scope.selectedMode = selectedModel;
                                    if (scope._editor) {
                                        scope._editor.getSession().setMode('ace/mode/' + selectedModel.mode);
                                        scope.language = newValue.language;
                                    }
                                }
                            }
                        });*/

                    }

                };
        }]);

angular.module('schemaForm').controller('FullModalViewCtrl', ['$scope', 'item', '$uibModalInstance',
    function ($scope, item, $modalInstance) {
        $scope.item = item;
        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);


angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("js/directives/ace.schemaform.template.html","<div class=\"form-group has-feedback\" data-ng-class=\"{'has-error': hasError(), 'has-success': hasSuccess()}\">  <div class=\"row top-buffer\">       <ui-ace-wrapper>          <div class=\"pull-left\">             <label data-ng-show=\"showTitle()\">{{form.title}}</label>           </div>            <div class=\"ace-schemaform-toolbar\">                <select class=\"btn btn-default btn-sm dropdown-toggle\" data-ng-options=\"item.name for item in modes\" data-ng-model=\"selectedMode\" data-ng-change=\"onChangedMode(item)\">                </select>                 <select class=\"btn btn-default  btn-sm dropdown-toggle\" data-ng-options=\"item for item in themes\" data-ng-model=\"selectedTheme\" data-ng-change=\"onChangedTheme(item)\">                </select>                <button type=\"button\" class=\"btn btn-default  btn-sm\" ng-click=\"fullEdit()\">{{ toogleFullViewName }}</button><!--                 <button type=\"button\" class=\"btn btn-default  btn-sm\" ng-click=\"showHelp()\">Show Help</button>-->            </div>            <div class=\"clear-fix\"></div>             <div ng-show=\"form.key\" class=\"form-control\" schema-validate=\"form\" sf-changed=\"form\" ng-model-options=\"form.ngModelOptions\" ng-model=\"$$value$$\" ui-ace=\"aceOption\"></div>         </ui-ace-wrapper>         <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>     </div></div> ")}]);

angular.module('schemaForm').config(
       ['schemaFormProvider', 'schemaFormDecoratorsProvider','sfPathProvider',
function (schemaFormProvider, schemaFormDecoratorsProvider,sfPathProvider) {

            var ace = function (name, schema, options) {
                if (schema.type === 'string' && schema.format === 'ace') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'ace';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(ace);

            //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'ace', 'js/directives/ace.schemaform.template.html');
            schemaFormDecoratorsProvider.createDirective('ace', 'js/directives/ace.schemaform.template.html');

}]);