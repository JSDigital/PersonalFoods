(function(app){
	'use strict';

	app.run(function($rootScope){
		// N/A yet.

		$rootScope.$on('$stateChangeStart', function(){
			window.scrollTo(0, 0);
		});
	});

})(angular.module('personalModule', ['ngAnimate', 'ui.router']));