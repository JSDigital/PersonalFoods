(function(app){
	app.controller('findCtrl', function($scope, service){
		service.getMapLocation().then(function(data){
			console.log(data);
			Maps.init(data, document.querySelector(".find .map"));
		});
	});
})(angular.module('personalModule'));



