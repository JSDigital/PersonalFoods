(function(app){
	app.factory('baseService', ['$http', '$templateCache', function($http, $templateCache){
		this.getHighlights = function(){
			return [
				{ "w":2, "h":2, "x":0, "y":0},
				{ "w":2, "h":1, "x":2, "y":0 },
				{ "w":1, "h":1, "x":2, "y":1},
				{ "w":1, "h":1, "x":3, "y":1},
				{ "w":1, "h":1, "x":4, "y":0},
				{ "w":1, "h":1, "x":5, "y":0},
				{ "w":2, "h":1, "x":4, "y":1}
			];
		};
		return this;
	}])
})(angular.module('personalModule'));



