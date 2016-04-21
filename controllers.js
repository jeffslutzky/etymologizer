
myApp.controller('homeController', ['$scope', '$http', '$resource', 'textService', function($scope, $http, $resource, textService) {

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
        console.log(response);

        // cycle through each word
        $.each(response.data, function() {
          if (this.entry_list.entry) {
            var word_etymology = this.entry_list.entry[0] ? this.entry_list.entry[0].et : this.entry_list.entry.et;
            $scope.etymology.push(word_etymology);
          };
        });

        console.log($scope.etymology);

      }, function error(response) {
        console.log("Error");
      });
    };

}]);
