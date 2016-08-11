(function(window){
    var maps = {
        init:function(arr, obj){
            this.createMap(arr, obj);
        },
        createMap:function(data, obj){
            var centerLoc = data.centerLoc;
            var pins = data.pins;

            console.log(pins);

            // Create a map object and specify the DOM element for display.
            var map = new google.maps.Map(obj, {
                center: centerLoc,
                scrollwheel: false,
                zoom: 12
            });

            pins.forEach(function(obj){
                var marker = new google.maps.Marker({
                    map: map,
                    position: obj.location,
                    title: obj.title
                });
            });

            // Create a marker and set its position.
        }
    };

    window.Maps = maps;
})(window);