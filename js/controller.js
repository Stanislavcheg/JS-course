var todo = angular.module('todo',[]);

todo.filter('startFrom', function(){
  return function(input, start){
    start = +start;
    return input.slice(start);
  }
});

todo.directive('item', function () {
 	return {
 		restrict: 'E',
 		scope: {
 			item: '=',
 			data: '='
 		},
 		templateUrl: 'templates/item.html',
 		controller: function($scope) {
 			var bufferVal = "";
 			$scope.edit = function () {
 				var isEdit = false;
 				for (var i = $scope.data.length - 1; i >= 0; i--) {
 					if($scope.data[i].item_edit) isEdit = true;
 				}
					if(!isEdit) {
						$scope.item.item_edit = true;	
						bufferVal = $scope.item.text;			
					}					
				}
			$scope.cancel = function () {
				$scope.item.item_edit = false;
				$scope.item.text = bufferVal;	
			}
			$scope.ok = function () {
				$scope.item.item_edit = false;
				if(!$scope.item.text) $scope.del();
			}
			$scope.del = function () {
				for (var i = $scope.data.length - 1; i >= 0; i--) {
				if($scope.data[i].id == $scope.item.id) $scope.data.splice(i,1);
				}
			}
			$scope.isDone = function () {
				$scope.item.item_done ? $scope.item.item_done = false : $scope.item.item_done = true;
			}
 		}
 	};
});


todo.controller('todoCtrl', function todoCtrl($scope){

	$scope.data = [];
	$scope.tags = [];
	$scope.tagSelected = "";
	$scope.currentPage = 0;
	$scope.itemsPerPage = 3;
	var tagFiltered = { filter: false, tag: ""};

	function getHash () {
		var dictionary = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
		var hashId = "";
		for (var i = 0; i < 10; i++) {
			hashId+= dictionary[Math.floor(Math.random()*dictionary.length)];
		}
		return hashId;
	}

	$scope.add = function (e) {
		e.preventDefault();
		if (!$scope.task | !$scope.tag) return;

		if(!($scope.tags.indexOf($scope.tag) + 1)){
			$scope.tags.push($scope.tag);
		}
		$scope.data.unshift({
			"text": $scope.task,
			"item_done": false,
			"tag": $scope.tag,
			"id": getHash(),
			"item_edit": false,
			"show": true
		});
		$scope.task = '';
	}

	$scope.tagFltr = function(tag) {
		$scope.tagSelected == tag ? $scope.tagSelected = "" : $scope.tagSelected = tag;

	}

	$scope.firstPage = function() {
		return $scope.currentPage == 0;
	}

	$scope.lastPage = function() {
		var lastPageNum = Math.ceil($scope.filteredData.length / $scope.itemsPerPage - 1);
		return $scope.currentPage == lastPageNum;
	}

	$scope.numberOfPages = function(){
		return Math.ceil($scope.filteredData.length / $scope.itemsPerPage);
	}

	$scope.startingItem = function() {
		return $scope.currentPage * $scope.itemsPerPage;
	}

	$scope.pageBack = function() {
		$scope.currentPage = $scope.currentPage - 1;
	}

	$scope.pageForward = function() {
		$scope.currentPage = $scope.currentPage + 1;
	}
	
});	
