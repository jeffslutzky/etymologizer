
myApp.controller('homeController', ['$scope', '$http', '$resource', 'textService', 'etymologyService', function($scope, $http, $resource, textService, etymologyService) {

  $scope.text = textService.text;

  $scope.$watch('text', function() {
     textService.text = $scope.text;
  });

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
          word = $scope.words.shift()
          wordEtymology = etymologyService.findEtymology(this);
          $scope.etymology.push({"word": word, "etymology": wordEtymology});
        });
      }, function error(response) {
        console.log("Error");
      });
    };

}]);
