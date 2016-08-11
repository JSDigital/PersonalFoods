(function(app){
	app.factory('service', ['$http', '$templateCache', function($http, $templateCache){
		this.getHeaderHighlights = function(){
			return $http.get('mock/home_highlight.json').then(function(data){
				return data.data;
			});
		};

		this.getMenuKits = function(){
			return $http.get('mock/kits.json').then(function(data){
				return data.data;
			});
		};

		this.getMapLocation = function(){
			return $http.get('mock/map.json').then(function(data){
				return data.data;
			});
		};

		this.getInstagram = function(){
			return $http({
				method: 'JSONP',
				url: 'https://api.instagram.com/v1/users/2016553853/media/recent?access_token=32268563.ee1008e.5b3a8945f92d4402a31912ce4fbfccbb&callback=JSON_CALLBACK'
			}).then(function(data){
				return data;
			});
		};

		this.getMenuFood = function(){
			return $http.get('mock/menu.json').then(function(data){
				return data.data;
			});
		};

		this.sendEmail = function(textContent, email, name, tel, adress){
			var data = {
				mail:email,
				name:name,
				text:textContent,
				tel:tel,
				adress:adress
			};

			var config = {
				params: data,
				headers : {'Accept' : 'application/json'}
			};

			return $http.get('sendthebill.php', config).then(function(response) {
				return response
			});
		};


		return this;
	}])
})(angular.module('personalModule'));



