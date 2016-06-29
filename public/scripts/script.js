var myApp = angular.module( 'myApp', [] );

myApp.controller( 'wednesdayController',[ '$scope', '$http', function( $scope, $http ){
  // global list of movie searches
  $scope.everySearch=[];
  // global list of watchlist
  $scope.allWatchlist=[];
  // header shown
  $scope.currentHeader='';

  // add a movie to favorites in db
  $scope.addFavorite = function( index ){
    console.log( 'in addFavorite: ' + $scope.everySearch[ index ].title );
    // add to favorites db
    var objectToSend ={
      title: $scope.everySearch[ index ].title,
      year: $scope.everySearch[ index ].year,
      director: $scope.everySearch[ index ].director,
      poster_url: $scope.everySearch[ index ].poster_url,
    };
    $http({
      method: 'POST',
      url: '/addFavorite',
      data: objectToSend
    }).then( function(response){
      console.log( 'back from adding: ' +  objectToSend.title );
    }); //end http, then
    // remove from current searches list
    $scope.everySearch.splice( index );
  };

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
        poster_url: response.data.Poster
      }; // end object

      $scope.allWatchlist=[];
      $scope.currentHeader='Your Searches:';
      $scope.everySearch.push( objectToDisplay );

      console.log( 'objectToDisplay: ' + objectToDisplay.title + " " + objectToDisplay.year + " " + objectToDisplay.director + " " + objectToDisplay.posterURL);
      console.log( 'everySearch: ' + $scope.everySearch );
    }); // end http, then

    // clear input field
    $scope.movieIn='';
  };

  // remove from displayed searches
  $scope.removeFromSearches = function( index ){
    console.log( 'in removeFromSearches: ' +  index );
    $scope.everySearch.splice( index );
  }; // end remove from searches

  // remove from watch list
  $scope.removeFromWatchlist = function( index ){
    console.log( 'in removeFromWatchlist: ' + index );
  }; // end remove from watchlist

  // set as watched
  $scope.setAsWatched = function( index ){
    console.log( 'in setAsWatched: ' + index );
  };

  $scope.viewWatchlist = function(){
    $http({
      method:'GET',
      url:'/getWatchlist'
    }).then( function( response ){
      console.dir( 'back from HTTP post: ' + response.data );
      $scope.allWatchlist = response.data;
    }); // end http, then

    $scope.everySearch=[];
    // header shown
    $scope.currentHeader='Your Watchlist:';

  };

}]);
