myApp.config(function($routeProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'homeController'
  })

  .when('/result', {
    templateUrl: 'pages/result.html',
    controller: 'resultController'
  })

});
