var todo = angular.module('todo',[]);

todo.directive('item', function () {
 	return {
 		restrict: 'E',
 		scope: {
 			item: '=',
 			allData: '='
 		},
 		templateUrl: 'templates/item.html',
 		controller: function ($scope) {
 			scope.edit = function () {
 				$scope.data[i].item_edit = true;
 				
 			}
 		}
 	};
});





todo.controller('todoCtrl', function todoCtrl($scope, $filter){

	$scope.data = [];
	$scope.tags = [];
	$scope.pages =[];
	$scope.pagesVis = false;
	var bufVal = "";
	$scope.allData = [];
	$scope.tagSelected = "";
	var tagFiltered = { filter: false, tag: ""};
	var paginator =	{
			totalPages: function(data){return Math.ceil(data.length / this.tasksPerPage);},
			tasksPerPage: 2,
			pageContent: function(data, pageNum){
				var pageData = [];
				if(!pageNum) return data.slice(0, this.tasksPerPage);
				for (var i = (pageNum - 1)*this.tasksPerPage; i < pageNum *this.tasksPerPage; i++) {
					if(data[i]){
						pageData.push(data[i]);
					}
				}
				return pageData;
			},
			pagesArray: function(data){
				var arr = [];
				for (var i = 1; i <= this.totalPages(data); i++) {
					arr.push(i);
				}
				return arr;
			}
	};

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
		$scope.allData.unshift({
			"text": $scope.task,
			"item_done": false,
			"tag": $scope.tag,
			"id": getHash(),
			"item_edit": false,
			"show": true
		});
		$scope.data = paginator.pageContent($scope.allData);
		$scope.task = '';
		
		$scope.pagesVis = (paginator.totalPages($scope.allData) > 1);
		$scope.pages = paginator.pagesArray($scope.allData);
	}

	$scope.del = function (id) {
		var indFirstEl = 0;
		var pageNum = 1;
		for (var i = $scope.allData.length - 1; i >= 0; i--) {
		if($scope.allData[i].id == $scope.data[0].id) indFirstEl = i;
		if($scope.allData[i].id == id) $scope.allData.splice(i,1);
		}
		pageNum = Math.ceil(indFirstEl / paginator.tasksPerPage);
		$scope.data = paginator.pageContent($scope.allData, pageNum);
		$scope.pagesVis = (paginator.totalPages($scope.allData) > 1);
		$scope.pages = paginator.pagesArray($scope.allData);
	}

	$scope.edit = function (i) {
		$scope.data[i].item_edit = true;	
		bufferVal = $scope.data[i].text;																					
	}

	$scope.cancel = function (i) {
		$scope.data[i].item_edit = false;
		$scope.data[i].text = bufferVal;	

	}

	$scope.ok = function (i) {
		$scope.data[i].item_edit = false;
		if(!$scope.data[i].text) $scope.del($scope.data[i].id);
	}

	$scope.pager = function (i) {
		$scope.data = paginator.pageContent($scope.allData, i);
	}	

	$scope.tagFltr = function(tag) {
		$scope.tagSelected == tag ? $scope.tagSelected = "" : $scope.tagSelected = tag;
		var dat = $filter('filter')($scope.data, {tag: $scope.tagSelected});
		console.log(dat);
		$scope.pages = paginator.pagesArray(dat);
	}
/*
	$scope.tagFltr = function(tag) {
		var resultArr = [];
		if(tagFiltered.filter & (tagFiltered.tag != tag) & tagFiltered.tag) tagFiltered.filter = false;
		for (var i = $scope.allData.length - 1; i >= 0; i--) {
			if($scope.allData[i].tag != tag & !tagFiltered.filter & !(tagFiltered.tag == tag)){
				$scope.allData[i].show = false;
			}
			else{
				$scope.allData[i].show = true;
				resultArr.unshift($scope.allData[i]);
			}
		}
		$scope.data = $scope.allData;
				
		tagFiltered.filter ? tagFiltered.filter = false : tagFiltered.filter = true; 
		tagFiltered.tag == tag ? tagFiltered.tag = "" : tagFiltered.tag = tag;
		
		$scope.data = paginator.pageContent(resultArr);
		$scope.pagesVis = (paginator.totalPages(resultArr) > 1);
		$scope.pages = paginator.pagesArray(resultArr);
		
	}*/



	$scope.isDone = function (e, i) {
		e.preventDefault();
		$scope.data[i].item_done ? $scope.data[i].item_done = false : $scope.data[i].item_done = true;
		if($scope.data[i].item_done) {
			$scope.data[i].item_done = true;
		}
		else{
			$scope.data[i].item_done = false;
		}
	}	
	
});	

/*
	todo.filter('tagFilter', function () {
  		return function (items, tagSelected) {
  			if (!tagSelected) return items;
    		var filtered = [];
    		for (var i = 0; i < items.length; i++) {
      			if (items[i].tag == tagSelected) {
       				 filtered.push(items[i]);
      			}
    		}
    		return filtered;
  		};
	});

*/