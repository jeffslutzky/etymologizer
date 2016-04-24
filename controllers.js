myApp.controller('homeController', ['$scope', '$http', '$resource', 'etymologyService', 'originLanguageService', function($scope, $http, $resource, etymologyService, originLanguageService) {

  $scope.text = "";

  $scope.resourceURL = "http://localhost:3000/api/word";

  $scope.getEtymologies = function() {

    $scope.words = $scope.text.split(" ");
    $scope.etymologies = [];

    $http.get($scope.resourceURL, {
      params: {words: $scope.text}
    })
      .then(function success(response) {

        // cycle through each word
        $.each(response.data, function() {
          word = $scope.words.shift();
          this.entry_list.entry ? etymology = etymologyService.findEtymology(this) : etymology = null;
          etymology ? language = originLanguageService.getLanguage(etymology) : language = null;

          $scope.etymologies.push({"word": word, "etymology": etymology, "language": language });
        });

      }, function error(response) {
        console.log("Error");
      });
    };

  $scope.showEtymology = function(item) {
    item.display = true;
  }

  $scope.hideEtymology = function(item) {
    item.display = false;
  }

}]);
