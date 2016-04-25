myApp.controller('homeController', ['$scope', '$http', '$resource', 'etymologyService', 'originLanguageService', function($scope, $http, $resource, etymologyService, originLanguageService) {

  $scope.text = "";

  $scope.resourceURL = "http://localhost:3000/api/word";

  $scope.getEtymologies = function() {

    $scope.words = $scope.text.replace("-", " ").split(" ");
    $scope.etymologies = [];

    $http.get($scope.resourceURL, {
      params: {words: $scope.text.replace("-", " ")}
    })
      .then(function success(response) {

        // cycle through each word
        $.each(response.data, function() {
          word = $scope.words.shift();
          this.entry_list.entry ? etymology = etymologyService.findEtymology(this) : etymology = null;
          etymology ? etymology = etymologyService.getValidHTML(etymology) : etymology = "null";
          etymology ? color = originLanguageService.getColor(etymology) : color = null;
          if (etymology === "null") {
            etymology = "<em>no etymology provided</em>";
          };
          $scope.etymologies.push({"word": word, "etymology": etymology, "color": color });
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
