(function(app){
	app.controller('menuCtrl', function($scope, service){
        $scope.menuFood = {};
        $scope.actualList = {};
        var actualLocation = 0;
        var changeItem = true;

        $scope.changeList = function(index){
            actualLocation = 0;

            var itemList = document.querySelectorAll('.menu-category .item');

            itemList.forEach(function(obj){
                obj.classList.remove('active');
            }.bind(this));

            itemList[index].classList.add('active');

            document.querySelector('.list .itens').style.transform = "translate(0," + -163 * (actualLocation) + "px)";

            $scope.actualList = $scope.menuFood[index];

            menu.createMenuContent($scope.actualList.products[0]);
        };

        $scope.handleSelectItem = function(){
            changeItem = false;
            document.querySelector('.content.product').classList.add('active');
        };

        $scope.closeProduct = function(){
            changeItem = true;
            document.querySelector('.content.product').classList.remove('active');
        };

        $scope.handleOverItem = function(e, obj){
            if(!changeItem) return;

            var itemList = document.querySelectorAll('.itens .item');

            itemList.forEach(function(obj){
                obj.classList.remove('active');
            }.bind(this));

            e.currentTarget.classList.add('active');

            menu.createMenuContent(obj);
        };

        var menu = {
            init:function(){
                document.querySelector('.down-arrow').addEventListener('click', this.handleClickDown.bind(this));
                document.querySelector('.up-arrow').addEventListener('click', this.handleClickUp.bind(this));
            },
            initCategory:function(){
                this.init();

                this.createMenuList($scope.menuFood[0]);
            },
            createMenuList:function(list){
                $scope.actualList = list;

               this.createMenuContent(list.products[0]);
            },
            createMenuContent:function(obj){
                $scope.actualProduct = obj;
                $scope.styleMenuContent = {
                    "background":"url("+obj.image+") no-repeat center center",
                    "backgroundSize":"cover"
                };
            },
            handleClickDown:function(){
                if(actualLocation < $scope.actualList.products.length - 3){
                    actualLocation++;
                    document.querySelector('.list .itens').style.transform = "translate(0," + -163 * (actualLocation) + "px)";
                }else{
                    console.log('peee');
                }
            },
            handleClickUp:function(){
                if(actualLocation > 0){
                    actualLocation--;
                    document.querySelector('.list .itens').style.transform = "translate(0," + -163 * (actualLocation) + "px)";
                }
            },
            getActualFood:function(){
              return this.getIndex(document.querySelector('.itens .item.active')) - 1;
            },
            getActualCategory:function(){
              return this.getIndex(document.querySelector('.menu-category .active')) - 1;
            },
            getIndex:function (node) {
                var childs = node.parentNode.childNodes;
                for (i = 0; i < childs.length; i++) {
                    if (node == childs[i]) break;
                }
                return i;
            }
        };

		service.getMenuFood().then(function(data){
            $scope.menuFood = data;
            menu.initCategory();
		});
	});
})(angular.module('personalModule'));



