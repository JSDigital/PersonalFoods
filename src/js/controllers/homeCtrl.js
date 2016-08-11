(function(app){
	app.controller('homeCtrl', function($scope, service, $templateRequest, $compile, $http){
		var carouselHighlightData;
        var foodMenu;
        var mapLoc;
        var instaContent;

       

        //https://api.instagram.com/v1/users/search?q=juliosgarbi&client_id=ee1008e3dad0433eb962cbf6a8b5f17a&access_token=32268563.ee1008e.5b3a8945f92d4402a31912ce4fbfccbb&callback=jQuery21102631924652949065_1465078545962&_=1465078546204

        var insta = {
            init:function(){
                angular.forEach(instaContent, function(obj, index){
                    var li = document.createElement('li');
                    li.className = 'item';

                    var img = document.createElement('img');
                    img.src = obj.images.standard_resolution.url;

                    li.appendChild(img);

                    if(index < 10)
                        document.querySelector('.insta-list._first').appendChild(li);
                    else
                        document.querySelector('.insta-list._sec').appendChild(li);
                });

                this.createInteration();
            },
            createInteration:function(){
                document.querySelector('.insta-list._first').addEventListener('mousemove', this.onMoveMouse.bind(this));
                document.querySelector('.insta-list._sec').addEventListener('mousemove', this.onMoveMouse.bind(this));
            },
            onMoveMouse:function(e){
                var x = (e.currentTarget.offsetWidth -  window.innerWidth) * (e.screenX / (window.innerWidth - 40)) ;
                e.currentTarget.style.transform = "translate("+-x+"px, 0)";
            }
        };


        var mapLocale = {
            init:function(){
                Maps.init(mapLoc, document.querySelector(".where-we-work .map"));
            }
        };

		var menuCarousel = {
            actual:2,
			init:function(){
               this.createFirstScreen();

			},
            createFirstScreen:function(){
                this.createTemplate(0, 'before-out').then(function(){
                    this.createTemplate(1, 'before').then(function(){
                        this.createTemplate(2, 'actual').then(function(){
                            this.createTemplate(3, 'after').then(function(){
                                this.createTemplate(4, 'after-out').then(function(){
                                    this.startEvent();
                                }.bind(this));
                            }.bind(this));
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            },
            goNext:function(){
                this.disposeEvent();
                angular.element(document.querySelector('.before-out')).remove();
                angular.element(document.querySelector('.after')).addClass('actual').removeClass('after');
                angular.element(document.querySelector('.after-out')).addClass("after").removeClass('after-out');
                angular.element(document.querySelector('.actual')).addClass("before").removeClass('actual');
                angular.element(document.querySelector('.before')).addClass("before-out").removeClass('before');
                if(this.actual == foodMenu.length - 1){
                    this.actual = 0;
                }else{
                    this.actual++;
                }

                this.createTemplate(this.actual, 'after-out').then(function(){
                    this.startEvent();
                }.bind(this));
            },
            goBack:function(){
                this.disposeEvent();
                angular.element(document.querySelector('.after-out')).remove();
                angular.element(document.querySelector('.after')).addClass('after-out').removeClass('after');
                angular.element(document.querySelector('.actual')).addClass("after").removeClass('actual');
                angular.element(document.querySelector('.before')).addClass("actual").removeClass('before');
                angular.element(document.querySelector('.before-out')).addClass("before").removeClass('before-out');

                if(this.actual == 0){
                    this.actual = foodMenu.length - 1;
                }else{
                    this.actual--;
                }

                this.createTemplate(this.actual, 'before-out').then(function(){
                   this.startEvent();
                }.bind(this));

            },
            createTemplate:function(index, loc){
                return $templateRequest("views/templates/menu-card.html").then(function(html){
                    var scope = $scope.$new(true);
                    var template = angular.element(html);
                    template.addClass(loc);

                    scope.title = foodMenu[index].title;
                    scope.desc = foodMenu[index].description;
                    scope.price = foodMenu[index].price;

                    angular.element(document.querySelector('.carousel-menu')).append($compile(template)(scope));
                    document.querySelector('.'+loc + " .image").style.background = "url("+foodMenu[index].image+") no-repeat center center";
                    document.querySelector('.'+loc + " .image").style.backgroundSize = "cover";
                });
            },
            startEvent:function(){
                this.a = document.querySelector('.after').eventListener('click', this.goNext.bind(this), false); //to add
                this.b = document.querySelector('.before').eventListener('click', this.goBack.bind(this), false); //to add
            },
            disposeEvent:function(){
                document.querySelector('.after').eventListener(this.a);
                document.querySelector('.before').eventListener(this.b);
            }
		};
		var headerCarousel = {
			init:function(){
				this.createFirstScreen();
				this.alignImage();
				this.createBullets();

                window.addEventListener('resize', this.alignImage);
			},
			blockScreen:function(){
				document.querySelector('.header').style.height = "808px";
				document.querySelector('.header .image').style.top = "inherit";
				document.querySelector('.header .image').style.transform = "inherit";
				document.querySelector('.header .image').style.bottom = "0";
			},
			alignImage:function(){
                document.querySelector('.header .image').style.left = window.innerWidth / 2 + "px";

				if(document.querySelector('.header .image').getBoundingClientRect().top < 103){
					document.querySelector('.header .image').style.transform = "inherit";
					document.querySelector('.header .image').style.top = 103 + "px";
				}
			},
			createFirstScreen:function(){
				this.changeCarousel(0)
			},
			createBullets:function(){
				var bullets = '';

				for(var i = 0; i < carouselHighlightData.length; i ++){
					bullets +=	'<li class="bullet">';
					bullets +=	'	<div class="ball"></div>';
					bullets +=	'	<div class="line"></div>';
					bullets +=	'</li>';
				}

				document.querySelector('.header .bullets').innerHTML = bullets;
				document.querySelector('.header .bullets .bullet').classList.add('active');

				var bulletList = document.querySelectorAll('.header .bullets .bullet');

				for(var j = 0; j < bulletList.length; j++){
					bulletList[j].addEventListener('click', this.handleClickBullet.bind(this));
				}
			},
			handleClickBullet:function(e){
				var node = e.currentTarget;

				var childs = node.parentNode.childNodes;
				for (i = 0; i < childs.length; i++) {
					if (node == childs[i]) break;
				}

				document.querySelector('.header .bullets .active').classList.remove('active');
				document.querySelectorAll('.header .bullets .bullet')[i].classList.add('active');

				this.changeCarousel(i);

			},
			changeCarousel:function(index){
				document.querySelector('.header .background').style.background = "url("+carouselHighlightData[index].image+") no-repeat center center";
				document.querySelector('.header .background').style.backgroundSize = "cover";

				document.querySelector('.header .image').style.background = "url("+carouselHighlightData[index].image+") no-repeat center center";
				document.querySelector('.header .image').style.backgroundSize = "cover";

				document.querySelector('.header .title').innerHTML = carouselHighlightData[index].title;
				document.querySelector('.header .desc').innerHTML = carouselHighlightData[index].description;
				document.querySelector('.header .more').setAttribute("href", carouselHighlightData[index].link);
			}
		};

		if(window.innerHeight < 808) {
			headerCarousel.blockScreen();
		}else {
			document.querySelector('.header').style.height = window.innerHeight + "px";

		}

		service.getHeaderHighlights().then(function(data){
			carouselHighlightData = data;
			headerCarousel.init();
		});

        service.getMenuKits().then(function(data){
            foodMenu = data;
            menuCarousel.init();
        });

        service.getMapLocation().then(function(data){
            mapLoc = data;
            mapLocale.init();
        });

        service.getInstagram().then(function(data){
            instaContent = data.data.data;
            insta.init();
        });

        HTMLElement.prototype.eventListener=
            function(type, func, capture){
                if(typeof arguments[0]=="object"&&(!arguments[0].nodeType)){
                    return this.removeEventListener.apply(this,arguments[0]);
                }
                this.addEventListener(type, func, capture);
                return arguments;
            }
	});
})(angular.module('personalModule'));



