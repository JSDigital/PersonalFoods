'use strict';
(function(app){
	app.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home',{
				url:'/home',
				templateUrl:'views/homePage.html',
				controller:"homeCtrl"
			})
			.state('about',{
				url:'/about',
				templateUrl:'views/aboutPage.html',
				controller:"aboutCtrl"
			})
			.state('find',{
				url:'/find',
				templateUrl:'views/findPage.html',
				controller:"findCtrl"
			})
			.state('workwithus',{
				url:'/workwithus',
				templateUrl:'views/workPage.html',
				controller:"workCtrl"
			})
			.state('menu',{
				url:'/menu',
				templateUrl:'views/menuPage.html',
				controller:"menuCtrl"
			})
			.state('buywithus',{
				url:'/buywithus',
				templateUrl:'views/buyPage.html',
				controller:"buyCtrl"
			});

			$urlRouterProvider.otherwise('/home');
	});
})(angular.module('personalModule'));