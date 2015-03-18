var place =angular.module("searchPlace", []);
place.controller("printPlace",	function($scope, $http) {

    // when landing on the page, get all todos and show them
    $http.get('/all')
      .success(function(data) {
        $scope.lugar = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });



});
