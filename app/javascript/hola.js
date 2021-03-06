var map;
var google;
var navigator;
var handleNoGeolocation;
var infowindow;
var marker;
var window;

function initialize() {
  var mapOptions = {
    zoom: 18
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
                                                        mapOptions);

    // Try HTML5 geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                            position.coords.longitude);
      var marker = new google.maps.Marker({
          icon      :  'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          position  :  pos,
          map       :  map,
          draggable :  true,
          animation :  google.maps.Animation.DROP
        });
      var infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.setContent("<p>Marker Location:" + marker.getPosition() + "</p>");
        var lat = marker.getPosition().lat();
        var ln = marker.getPosition().lng();
        document.place.la.value = lat;
        document.place.lo.value = ln;
        infowindow.open(map, marker);
      });
      map.setCenter(pos);
    }, function () {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}
function toggleBounce() {
  infowindow.open(map, marker);
}
function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
      map      :  map,
      position :  new google.maps.LatLng(60, 105),
      content  :  content
    };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
