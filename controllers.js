
myApp.controller('homeController', ['$scope', 'textService', function($scope, textService) {

    $scope.text = textService.text;

    $scope.$watch('text', function() {
       textService.text = $scope.text;
    });

}]);


myApp.controller('resultController', ['$scope', '$http', '$resource', 'textService', function($scope, $http, $resource, textService) {
  $scope.text = textService.text;

  $scope.$watch('text', function() {
     textService.text = $scope.text;
  });

  // $scope.etymology = "";
  $scope.etymology = [];

  $scope.resourceURL = "http://localhost:3000/api/word";

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
      }
    });
    debugger;
    console.log($scope.text + ": " + $scope.etymology);
    }, function error(response) {
      console.log("Error");
    });

}]);
