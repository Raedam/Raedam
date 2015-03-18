var places;


var searchP =angular.module("searchPlace", []);
searchP.controller("printPlace",	function($scope, $http) {

    // when landing on the page, get all todos and show them
    $http.get('/search/all')
      .success(function(data) {
        places = data;
        console.log(places[0].lat);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
});

function initialize() {
  var mapOptions = {
    zoom: 15
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapOptions);

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);



      var markerClient = new google.maps.Marker({
           icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
           position: pos,
           map: map,
           draggable:true,
           animation: google.maps.Animation.DROP
          /* title:"Hello World!" */});
var indice =0;
        for(indice in places){

          var markerRent = new google.maps.Marker({
             icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
             position: new google.maps.LatLng(places[indice].lat, places[indice].lon),
             map: map,
             draggable:true,
             animation: google.maps.Animation.DROP
            /* title:"Hello World!" */});

      }
  map.setCenter(pos);},
  function() {
  handleNoGeolocation(true);
  });
  } else {
  //Browser doesn't support Geolocation
 handleNoGeolocation(false);
}
}
function toggleBounce() {
 infowindow.open(map, marker);
/* if (marker.getAnimation() != null) {
/      /marker.setAnimation(null);
      marker.setTitle="Hola";
 } else {
  // marker.setAnimation(google.maps.Animation.BOUNCE);
  } */
  }
function handleNoGeolocation(errorFlag) {
if (errorFlag) {
 var content = 'Error: The Geolocation service failed.';
} else {
  var content = 'Error: Your browser doesn\'t support geolocation.';
}

var options = {
     map: map,
     position: new google.maps.LatLng(60, 105),
    content: content
};
var infowindow = new google.maps.InfoWindow(options);
     map.setCenter(options.position);
     }
google.maps.event.addDomListener(window, 'load', initialize);
