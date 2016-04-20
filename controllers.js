myApp.controller('homeController', ['$scope', function($scope) {

    $scope.text = "";

}]);


myApp.controller('resultController', ['$scope', '$http', '$resource', function($scope, $http, $resource) {

  $scope.etymology = "";

  $scope.click = function (){
    console.log("Clicked");
  };

  $scope.resourceURL = "http://localhost:3000/api/word";

  $http.get($scope.resourceURL, {
    params: {word: $scope.text}
  })
    .then(function success(response) {
      console.log(response);
      if (response.data.entry_list.entry) {
        $scope.etymology = response.data.entry_list.entry[0] ? response.data.entry_list.entry[0].et : response.data.entry_list.entry.et;
      console.log($scope.text + ": " + $scope.etymology);
    }}, function error(response) {
      console.log("Error");
    });

}]);
