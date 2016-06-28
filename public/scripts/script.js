var myApp = angular.module( 'myApp', [] );


myApp.controller( 'tuesdayController',[ '$scope', '$http', function( $scope, $http ){
  // global list of movie searches
  $scope.everySearch=[];

  // test get user input
  $scope.movieSearch = function(){

    console.log( 'in movieSearch: ' + $scope.movieIn );
    // assemble API URL
    var apiURL = 'https://www.omdbapi.com/?t=' + $scope.movieIn + '&type=movie&tomatoes=true%27';
    console.log( "apiURL: " + apiURL );

    // make an http call to the API url
    $http({
      method: 'GET',
      url: apiURL
    }).then( function( response ){
      // log the response from the http call
      console.log( 'retrieved info for ' + response.data.Title );
      var objectToDisplay={
        title: response.data.Title,
        year: response.data.Year,
        director: response.data.Director,
        posterURL: response.data.Poster
      }; // end object

      $scope.everySearch.push( objectToDisplay );

      console.log( 'objectToDisplay: ' + objectToDisplay.title + " " + objectToDisplay.year + " " + objectToDisplay.director + " " + objectToDisplay.posterURL);
      console.log( 'everySearch: ' + $scope.everySearch );
    }); // end http, then

    // clear input field
    $scope.movieIn='';
  };
}]);
