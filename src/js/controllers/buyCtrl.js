(function(app){
	app.controller('buyCtrl', function($scope, service){
		$scope.totalVal = 0;
		$scope.quant = 0;
		$scope.productsToBuy = [];

		$scope.putValue = function(obj, i){
			obj.quantbuy = i;

			$scope.changeTotalVal();
		};

		$scope.changeTotalVal = function(){
			$scope.productsToBuy = [];
			$scope.totalVal = 0;
			angular.forEach($scope.menuContent, function(data){
				angular.forEach(data.products, function(prod){
					if(prod.quantbuy){
						$scope.productsToBuy.push(prod);
						$scope.totalVal += prod.price.client * prod.quantbuy;
					}
				})
			});
			console.log($scope.productsToBuy);
		};

		$scope.finishSell = function(){
			if(document.querySelector('.finish').className.split(" ").indexOf('active') < 0){
				document.querySelector('.finish').classList.add('active');
			}else{
				var textEmail = '<table border="1">';
				var total = 0;
				textEmail += '<tr>';
				textEmail += '<td>Nome: </td>';
				textEmail += '<td></td>';
				textEmail += '<td>' + $scope.buy.name + '</td>';
				textEmail += '</tr>';
				textEmail += '<tr>';
				textEmail += '<td>E-mail: </td>';
				textEmail += '<td></td>';
				textEmail += '<td>' + $scope.buy.email + '</td>';
				textEmail += '</tr>';
				textEmail += '<tr>';
				textEmail += '<td>Telefone: </td>';
				textEmail += '<td></td>';
				textEmail += '<td>' + $scope.buy.phone + '</td>';
				textEmail += '</tr>';
				textEmail += '<tr>';
				textEmail += '<td>Endereço: </td>';
				textEmail += '<td></td>';
				textEmail += '<td>' + $scope.buy.adress + '</td>';
				textEmail += '</tr>';
				angular.forEach($scope.productsToBuy, function(data){
					textEmail += '<tr>';
					textEmail += '<td>' + data.name + '</td>';
					textEmail += '<td>' + data.quantbuy + '</td>';
					textEmail += '<td>R$ ' + (data.quantbuy * data.price.client) + '</td>';
					textEmail += '</tr>';
					total += data.quantbuy * data.price.client;
				});
				textEmail += '<tr>'
				textEmail += '<td>Total: </td>';
				textEmail += '<td></td>';
				textEmail += '<td>R$ ' + total + '</td>';
				textEmail += '</tr>';
				textEmail += "</table>";

				document.querySelector('.loading').innerHTML = "Envinando mensagem..."

				service.sendEmail(textEmail, $scope.buy.email, $scope.buy.name, $scope.buy.phone, $scope.buy.adress).then(function(){
					document.querySelector('.loading').innerHTML = "Mensagem enviada com sucesso...";
					document.querySelector('.finish').classList.remove('active');
				});
			}
		};

		$scope.closeFinish = function(){
			document.querySelector('.finish').classList.remove('active');
		};

		$scope.toggleMenu = function($event){
			var obj = $event.currentTarget.parentElement;

			if(obj.className.split(" ").indexOf('active') < 0)
				obj.classList.add('active');
			else
				obj.classList.remove('active');
		};

		service.getMenuFood().then(function(obj){
			$scope.menuContent = obj;
			console.log(obj);
		})
	});
})(angular.module('personalModule'));



