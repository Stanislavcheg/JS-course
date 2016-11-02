define('Storage', function(){

	function getCookie(name) {
	     var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	var date = new Date(new Date().getTime() + 999999999999999999999999999999999999999999999999);
	var storage = {		
			saveData: function (data) {
				document.cookie = "username=Вася; expires=15/02/2011 00:00:00"; //"data=" + JSON.stringify(data.items);
				var str = JSON.stringify(data.items);
				console.log("data=", typeof str);
				console.log("get: " + document.cookie);
			},
			getData: function () {
				var data = getCookie('data');
				return (data) ? {items: JSON.parse(getCookie('data'))} : {items: []};
			}
	}
	return storage;	
});