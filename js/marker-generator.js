var map = null;

var markerGenerator = function() {

    var _init = function() {
        var myOptions = {
          zoom: 7,
          center: new google.maps.LatLng(16.77532, -3.008265),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

        $(".trigger-generation").on("click", markerGenerator.generateSome);
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push($("#map-filter-controls")[0]);

      }

    var _generateSome = function() {
        var bounds = markerGenerator.getBounds();
        markerGenerator.clearMarkers();

        var value = $(".generation-type option:selected").val();
        //Value will be implementaed later on
        var to_generate = $("#markers-to-generate").val();
        if (markerGenerator.validateNumber(to_generate)){
          markerGenerator.generateMarkers(to_generate, bounds);
       }


      }

    var _validateNumber = function(num){

      if (isNaN(num)){
        return false;
      }else if (num > markerGenerator.MAX_MARKERS){
        return false;
      }else if (num.length == 0){
        return false;
      }

      return true;

    }
    var _getBounds = function() {

        var bounds = map.getBounds();
        return {
          south_west_lat: bounds.getSouthWest().lat(),
          south_west_lng: bounds.getSouthWest().lng(),
          north_east_lat: bounds.getNorthEast().lat(),
          north_east_lng: bounds.getNorthEast().lng()
        }
      }

    var _generateMarkers = function(times, bounds) {
        for (var i = 0; i < times; i++) {
          var lat = markerGenerator.randomXToY(bounds.north_east_lat * markerGenerator.FACTOR, bounds.south_west_lat * markerGenerator.FACTOR, 5) / markerGenerator.FACTOR;
          var lng = markerGenerator.randomXToY(bounds.north_east_lng * markerGenerator.FACTOR, bounds.south_west_lng * markerGenerator.FACTOR, 5) / markerGenerator.FACTOR;

          markerGenerator.validateMarker("Point at: [" + lat + "," + lng + "].", lat, lng);
        }
      }

    var _clearMarkers = function() {
        var markers = markerGenerator.markers;
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markerGenerator.markers = [];

      }

    var _randomXToY = function(minVal, maxVal, floatValm) {
        var randVal = minVal + (Math.random() * (maxVal - minVal));
        return typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
      }

    var _validateMarker = function(caption, lat, lng) {
        var position = new google.maps.LatLng(lat, lng);
        markerGenerator.setMarker({
          position: position,
          caption: caption
        });
      }


    var _setMarker = function(params) {

        var color = "4D00FF"; // : "FF0033";
        var pin = markerGenerator.getPinByColor(color);

        var marker = new google.maps.Marker({
          position: params.position,
          map: map,
          title: params.caption,
          icon: pin.image,
          shadow: pin.shadow
        });
        markerGenerator.markers.push(marker);


      }

    var _getPinByColor = function(pinColor) {

        return {
          image: new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor, new google.maps.Size(21, 34), new google.maps.Point(0, 0), new google.maps.Point(10, 34)),

          shadow: new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow", new google.maps.Size(40, 37), new google.maps.Point(0, 0), new google.maps.Point(12, 35))
        };
      }

    return {
      init: _init,
      getPinByColor: _getPinByColor,
      validateNumber : _validateNumber,
      setMarker: _setMarker,
      validateMarker: _validateMarker,
      generateSome: _generateSome,
      randomXToY: _randomXToY,
      generateMarkers: _generateMarkers,
      clearMarkers: _clearMarkers,
      getBounds: _getBounds,
      markers: [],
      MAX_MARKERS : 500,
      FACTOR: 1000,
    };

  }();