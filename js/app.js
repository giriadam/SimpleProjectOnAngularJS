var app = angular.module('myApp', ["ngRoute"]); 

// factory
app.factory('GetData', function ($http) {
  return {
    movieData: function (type,passdata, response) {
        var urlLink = "https://api.cinemalytics.com/v1/movie/" + type + "/" + passdata + "/?auth_token=1EFAE82FE7F4F8E6813FD4FA429E5170";
        $http.get(urlLink).success(response);
    }
  }
});

// controller
app.controller('allMovie', function($scope, GetData, $routeParams, $route, $location) {

    $scope.year = $routeParams.year ;

    GetData.movieData('year',$routeParams.year,function(response) {
      $scope.movie = response;      
    });

    // redirect to page
    $scope.gotoMovie = function(id){
        $location.path( "/id/" + id );
    }; 

    // redirect to page
    $scope.gotoMovieYear = function(year){
        $location.path( "/year/" + year );
    }; 

    
}); 

// controller
app.controller('singleMovie', function($scope, GetData, $routeParams) {
    GetData.movieData('id', $routeParams.ID,function(response) {
        $scope.movie = response;
    });

});

// routes
app.config(function($routeProvider) {
    $routeProvider
    .when("/year/:year", {
        templateUrl : "template/main.html",
        controller : "allMovie"
    })
    .when("/id/:ID", {
        templateUrl : "template/single.html", 
        controller : "singleMovie"
    })
    .otherwise( { redirectTo: '/year/2016' } );
});