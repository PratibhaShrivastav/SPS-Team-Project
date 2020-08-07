$(document).ready(function() {
  //base URL for all entities of to do list
  //later to be replaced with our API
  var apiBaseURL = 'https://api.themoviedb.org/3/';
  var apiKey = "28e7691b28199415eec6fd8d3e1ffd18"

  // URL in Authentication. Base URL of image
  var imageBaseUrl = 'https://image.tmdb.org/t/p/';

  const nowPlayingURL = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;


  //  Get "now playing" data on default.
  //  Change results when a genre is clicked on.

  function getToDoData() {
    $.getJSON(nowPlayingURL, function(nowPlayingData) {
      for (let i = 0; i < nowPlayingData.results.length; i++) {
        var dataRes = nowPlayingData.results[i].id;
        // dataRes = movie ID
        var thisMovieUrl = apiBaseURL + 'movie/' + dataRes + '/videos?api_key=' + apiKey;
        // console.log(i)

        $.getJSON(thisMovieUrl, function(movieKey) {
          // console.log(i);
          // console.log(thisMovieUrl)
          // console.log(movieKey)
          var poster = imageBaseUrl + 'w300' + nowPlayingData.results[i].poster_path;

          var title = nowPlayingData.results[i].original_title;

          var releaseDate = nowPlayingData.results[i].release_date;

          var overview = nowPlayingData.results[i].overview;

          var voteAverage = nowPlayingData.results[i].vote_average;

          var youtubeKey = movieKey.results[0].key;

          var youtubeLink = 'https://www.youtube.com/watch?v=' + youtubeKey;
          // console.log(youtubeLink)
          var nowPlayingHTML = '';
          // added in i (looping through the results) to nowPlayingHTML. Without it, only the details for the first movie in the results display in the modal no matter which movie poster you click on.
          nowPlayingHTML += '<div class="col-sm-3 eachMovie">';
          nowPlayingHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' + i + '" data-whatever="@' + i + '">' + '<img src="' + poster + '"></button>';
          nowPlayingHTML += '<div class="modal fade" id="exampleModal' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
          nowPlayingHTML += '<div class="modal-dialog" role="document">';
          nowPlayingHTML += '<div class="modal-content col-sm-12">';
          nowPlayingHTML += '<div class="col-sm-6 moviePosterInModal">';
          nowPlayingHTML += '<a href="' + youtubeLink + '"><img src="' + poster + '"></a>';
          nowPlayingHTML += '</div><br>'; //close trailerLink
          nowPlayingHTML += '<div class="col-sm-6 movieDetails">';
          nowPlayingHTML += '<div class="movieName">' + title + '</div><br>';
          nowPlayingHTML += '<div class="linkToTrailer"><a href="' + youtubeLink + '"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';
          nowPlayingHTML += '<div class="release">Release Date: ' + releaseDate + '</div><br>';
          // nowPlayingHTML += '<div class="genre">Genre: '+genre+'</div><br>';
          nowPlayingHTML += '<div class="overview">' + overview + '</div><br>'; // Put overview in a separate div to make it easier to style
          nowPlayingHTML += '<div class="rating">Rating: ' + voteAverage + '/10</div><br>';
          nowPlayingHTML += '<button type="button" onclick="alert(\'You have binged it!\')">Binged It!</button>';
          nowPlayingHTML += '</div>'; //close movieDetails
          nowPlayingHTML += '</div>'; //close modal-content
          nowPlayingHTML += '</div>'; //close modal-dialog
          nowPlayingHTML += '</div>'; //close modal
          nowPlayingHTML += '</div>'; //close off each div

          $('#movie-grid').append(nowPlayingHTML);
          //Without this line, there is nowhere for the posters and overviews to display so it doesn't show up
        })
      }
    })
  }


  
  // call getMoviesByGenre using click function but call getNowPlayingData on default.
  getToDoData();
});
