(function(app){
	app.controller('mainCtrl', function($scope, $state, $location){
		$scope.switchPage = function(page){
			$state.go(page);
		};

		$scope.getClass = function (path) {
			return ($location.path().substr(0, path.length) === path) ? 'active' : '';
		};

		$scope.openMenu = function(){
			if(window.innerWidth < 998){
				if(!document.querySelector('.menu ul.active')){
					document.querySelector('.menu ul').classList.add('active');
				}else{
					document.querySelector('.menu ul').classList.remove('active');
				}
			}
		};
	});
})(angular.module('personalModule'));
