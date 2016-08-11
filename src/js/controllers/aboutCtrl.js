(function(app){
	app.controller('aboutCtrl', function($scope, service, $templateRequest, $compile, $http){

		if(window.innerHeight < 808) {
            document.querySelector('.header').style.height = "808px";
		}else {
			document.querySelector('.header').style.height = window.innerHeight + "px";
		}

	});
})(angular.module('personalModule'));



