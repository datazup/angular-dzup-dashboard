var app = angular.module('dzupDash');

app.directive('droppable', ['$parse',
  function($parse) {
    return {

      link: function(scope, element, attr) {
        function onDragOver(e) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          if (e.stopPropagation) {
            e.stopPropagation();
          }
          e.originalEvent.dataTransfer.dropEffect = 'move';
          return false;
        }

        function onDrop(e) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          if (e.stopPropagation) {
            e.stopPropagation();
          }
          var data = e.originalEvent.dataTransfer.getData("Text");
          data = angular.fromJson(data);
          var dropfn = attr.drop;
          var fn = $parse(attr.drop);
          var headerElem=e.target.closest('th');
          var textOfHeader=angular.element(headerElem).find("a");
          scope.$apply(function() {
            scope[dropfn](data, textOfHeader[0]);
          });

        }
        element.bind("dragover", onDragOver);
        element.bind("drop", onDrop);
      }
    };
  }
]);
app.directive('draggable', function() {
  return {
    link: function(scope, elem, attr) {
      elem.attr("draggable", true);
      var dragDataVal = '';
      var draggedGhostImgElemId = '';
      attr.$observe('dragdata', function(newVal) {
        dragDataVal = newVal;

      });
      attr.$observe('dragimage', function(newVal) {
        draggedGhostImgElemId = newVal;
      });
      elem.bind("dragstart", function(e) {
        var sendData = angular.toJson(dragDataVal);
        e.originalEvent.dataTransfer.setData("Text", sendData);
        if (attr.dragimage !== 'undefined') {
          e.originalEvent.dataTransfer.setDragImage(
            document.getElementById(draggedGhostImgElemId), 0, 0
          );
        }
        var dragFn = attr.drag;
        if (dragFn !== 'undefined') {
          scope.$apply(function() {
            scope[dragFn](sendData);
          })
        }
      });
    }
  };
});
app.directive('dragAndDropTable', ['$compile','$dzupConfigUtils',
  function($compile,$dzupConfigUtils) {
    return {
      restrict: 'E',
      templateUrl: $dzupConfigUtils.templateUrlBase['dzup-dashboard'] + '/templates/directives/table/drag.drop.html',
      replace: true,
      scope: {
        conf: "=",
        orderBy:"=",
        ascDesc:"=",
        refreshWidget: '&'
      },
      controller: function($scope) {
      $scope.predicate = 'none';
      $scope.CountRange =  [5,10,15,20,25];
      $scope.reverse = true;
      $scope.numLimit=5;
      $scope.start = 0;
      $scope.$watch('conf.data',function(newVal){
        if(newVal){
            $scope.pageRecalc();
        }
      });

      $scope.pageRecalc = function(){
        $scope.pages=Math.ceil($scope.conf.data.length/$scope.numLimit);
      }

      $scope.hideNext=function(){

        if(typeof $scope.conf != 'undefined' && typeof $scope.conf.data != 'undefined'){
             if(($scope.start+ $scope.numLimit) < $scope.conf.data.length){
               return false;
             }
            else
               return true;
        }
        return false;
      };
       $scope.hidePrev=function(){
        if($scope.start===0){
          return true;
        }
        else
        return false;
      };
      $scope.nextPage=function(){
        $scope.start=$scope.start+ $scope.numLimit;
      };
      $scope.PrevPage=function(){
        $scope.start=$scope.start - $scope.numLimit;
      };

      $scope.order = function(predicate) {
        $scope.ascDesc = $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.orderBy = $scope.predicate = predicate;
        var refreshConf = {
            ascDesc:$scope.reverse  ? "ASC" : "DESC",
            orderBy: $scope.predicate
        }
        $scope.refreshWidget({refreshConf:refreshConf});
      };
        $scope.dragHead = '';
        $scope.dragImageId = "dragtable";
        $scope.handleDrop = function(draggedData,
          targetElem) {

          var swapArrayElements = function(array_object, index_a, index_b) {
            var temp = array_object[index_a];
            array_object[index_a] = array_object[index_b];
            array_object[index_b] = temp;
          };
          var srcInd = $scope.conf.heads.indexOf(draggedData);
          var destInd = $scope.conf.heads.indexOf(targetElem.textContent);
          swapArrayElements($scope.conf.heads, srcInd, destInd);
        };
        $scope.handleDrag = function(columnName) {
          $scope.dragHead = columnName.replace(/["']/g, "");
        };
      },
      compile: function(elem) {
        return function(ielem, $scope) {
          $compile(ielem)($scope);
        };
      }
    };
  }
]);