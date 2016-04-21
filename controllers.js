
myApp.controller('homeController', ['$scope', '$http', '$resource', 'textService', 'etymologyService', function($scope, $http, $resource, textService, etymologyService) {

  $scope.text = textService.text;

  $scope.$watch('text', function() {
     textService.text = $scope.text;
  });


  $scope.resourceURL = "http://localhost:3000/api/word";

  $scope.click = function() {

    $scope.etymology = [];

    $http.get($scope.resourceURL, {
      params: {words: $scope.text}
    })
      .then(function success(response) {

        // cycle through each word
        $.each(response.data, function() {
          if (this.entry_list.entry) { // if word exists
            entry = this.entry_list.entry;
            var word = entry[0] ? entry[0].ew : entry.ew;

            if (entry[0]) {
              $scope.wordEtymology = etymologyService.findEtymology();
            } else {
              $scope.wordEtymology = entry.et;
            };

            $scope.etymology.push({"word": word, "etymology": $scope.wordEtymology});
          };
        });

      }, function error(response) {
        console.log("Error");
      });
    };

}]);
