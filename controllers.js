myApp.controller('homeController', ['$scope', '$http', '$resource', 'etymologyService', 'colorCodeService', function($scope, $http, $resource, etymologyService, colorCodeService) {

  $scope.text = "";

  $scope.resourceURL = "http://localhost:3000/api/word";

  $scope.showEtymology = function() {

    $scope.words = $scope.text.split(" ");
    $scope.etymology = [];

    $http.get($scope.resourceURL, {
      params: {words: $scope.text}
    })
      .then(function success(response) {
        // cycle through each word
        $.each(response.data, function() {
          word = $scope.words.shift();
          etymology = etymologyService.findEtymology(this);

          // find language of origin for color-coding
          colorCodeService.getColor(etymology);

          $scope.etymologies.push({"word": word, "etymology": etymology});
        });

      }, function error(response) {
        console.log("Error");
      });
    };

}]);
