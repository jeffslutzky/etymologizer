myApp.controller('homeController', ['$scope', '$http', '$resource', 'etymologyService', 'originLanguageService', function($scope, $http, $resource, etymologyService, originLanguageService) {

  $scope.text = "";

  $scope.resourceURL = "http://localhost:3000/api/word";

  $scope.showEtymology = function() {

    $scope.words = $scope.text.split(" ");
    $scope.etymologies = [];

    $http.get($scope.resourceURL, {
      params: {words: $scope.text}
    })
      .then(function success(response) {

        // cycle through each word
        $.each(response.data, function() {
          word = $scope.words.shift();
          etymology = etymologyService.findEtymology(this);
          language = originLanguageService.getLanguage(etymology);

          $scope.etymologies.push({"word": word, "etymology": etymology, "language": language });
        });

      }, function error(response) {
        console.log("Error");
      });
    };

}]);
