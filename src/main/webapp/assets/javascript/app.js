$(document).ready(function() {
  // The base url for all API calls
  var apiBaseURL = 'https://api.themoviedb.org/3/';
  var apiKey = "28e7691b28199415eec6fd8d3e1ffd18"

  // URL in Authentication. Base URL of image
  var imageBaseUrl = 'https://image.tmdb.org/t/p/';

  const nowPlayingURL = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;
  const popularURL = apiBaseURL + 'movie/popular?api_key=' + apiKey;

  // Check genreIDs and genre names:
  // http://api.themoviedb.org/3/movie/:movieID?api_key=<<>>
  //28 = action
  //12 = adventure
  //16 = animation
  //35 = comedy
  //80 = crime
  //18 = drama
  //10751 = family
  //14 = fantasy
  //36 = history
  //27 = horror
  //10402 = music
  //10749 = romance
  //878 = science fiction
  //53 = thriller
  //  Get "now playing" data on default.
  //  Change results when a genre is clicked on.
  function getModalCode(obj, i) {
    var poster = imageBaseUrl + 'w300' + obj.results[i].poster_path;
    var title = obj.results[i].original_title;
    var releaseDate = obj.results[i].release_date;
    var overview = obj.results[i].overview;
    var voteAverage = obj.results[i].vote_average;
    var codeHTML = '';
    codeHTML += '<div class="col-sm-3 col-md-3 col-lg-3 eachMovie">';
    codeHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' + i + '" data-whatever="@' + i + '">' + '<img src="' + poster + '"></button>';
    codeHTML += '<div class="modal fade" id="exampleModal' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
    codeHTML += '<div class="modal-dialog" role="document">';
    codeHTML += '<div class="modal-content col-sm-12 col-lg-12">';
    codeHTML += '<div class="col-sm-6 moviePosterInModal">';
    codeHTML += '<img src="' + poster + '">';
    codeHTML += '</div><br>'; //close trailerLink
    codeHTML += '<div class="col-sm-6 movieDetails">';
    codeHTML += '<div class="movieName">' + title + '</div><br>';
    codeHTML += '<div class="release">Release Date: ' + releaseDate + '</div><br>';
    codeHTML += '<div class="overview">' + overview + '</div><br>';
    codeHTML += '<div class="rating">Rating: ' + voteAverage + '/10</div><br>';
    codeHTML += '<button type="button" onclick="alert(\'Added to your binge list!\')">Add to Binge-List!</button>';
    codeHTML += '</div>'; //close movieDetails
    codeHTML += '</div>'; //close modal-content
    codeHTML += '</div>'; //close modal-dialog
    codeHTML += '</div>'; //close modal
    codeHTML += '</div>'; //close off each div
    return codeHTML;
  }

  function getDataFromJson(url, title) {
    // $.getJSON(url,
    // function(data) {
    //   // console.log(genreData)
    //   for (let i = 0; i < data.results.length; i++) {
    //     var dataRes = data.results[i].id;
    //     var thisMovieUrl = apiBaseURL + 'movie/' + dataRes + '/videos?api_key=' + apiKey;

    //     $.getJSON(url,
    //     function(movieKey) {
    //       var codeHTML = getModalCode(data, i, movieKey);
    //       $('#movie-grid').append(codeHTML);
    //       //Without this line, there is nowhere for the posters and overviews to display so it doesn't show up
    //       // $('#movieGenreLabel').html("Now Playing");
    //       //h1 will change depending on what is clicked. Will display "Now Playing" in this case.
    //     })
    //   }
    // })
    // $('#movie-grid').append(title);
   
    fetch(url).then(response => response.json()).then((data) => {
        console.log(data);
         $('#movie-grid').append(title);
        for (let i = 0; i < data.results.length; i++) {
            var dataRes = data.results[i].id;
            var thisMovieUrl = apiBaseURL + 'movie/' + dataRes + '/videos?api_key=' + apiKey;
            var codeHTML = getModalCode(data, i);
            $('#movie-grid').append(codeHTML);
      }
      $('#movie-grid').append('<div id ="divider"></div>');
    });
    
  }

  

  function getTrendingData() {
    var titleTrending = '<h1 class="movieGenreLabel">Trending Movies</h1>';
    getDataFromJson(nowPlayingURL, titleTrending);
  }

  function getPopularData() {
    var titlePopular = '<h1 class="movieGenreLabel">Popular Movies</h1>';
    getDataFromJson(popularURL, titlePopular);
  }


  function getMoviesByGenre(genre_id) {
    const getMoviesByGenreURL = apiBaseURL + 'genre/' + genre_id + '/movies?api_key=' + apiKey + '&language=en-US&include_adult=false&sort_by=created_at.asc';
    getDataFromJson(getMoviesByGenreURL);
  }

  function getHomePage() {
    getTrendingData();
    getPopularData();
  }
  getHomePage();

  //Reset HTML strings to empty to overwrite with new one!
  var nowPlayingHTML = '';
  var genreHTML = '';

  $('.navbar-brand').click(function() {
    getNowPlayingData();
    $('#movie-grid').html(nowPlayingHTML);
    $('#movieGenreLabel').html("Now Playing");
  });
  $('.nowPlaying').click(function() {
    getNowPlayingData();
    $('#movie-grid').html(nowPlayingHTML);
    $('#movieGenreLabel').html("Now Playing");
  });
  $('#action').click(function() {
    getMoviesByGenre(28);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Action");
  });
  $('#adventure').click(function() {
    getMoviesByGenre(12);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Adventure");
  });
  $('#animation').click(function() {
    getMoviesByGenre(16);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Animation");
  });
  $('#comedy').click(function() {
    getMoviesByGenre(35);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Comedy");
  });
  $('#drama').click(function() {
    getMoviesByGenre(18);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Drama");
  });
  $('#family').click(function() {
    getMoviesByGenre(10751);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Family");
  });
  $('#fantasy').click(function() {
    getMoviesByGenre(14);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Fantasy");
  });
  $('#horror').click(function() {
    getMoviesByGenre(27);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Horror");
  });
  $('#music').click(function() {
    getMoviesByGenre(10402);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Music");
  });
  $('#romance').click(function() {
    getMoviesByGenre(10749);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Romance");
  });
  $('#scifi').click(function() {
    getMoviesByGenre(878);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Science Fiction");
  });
  $('#thriller').click(function() {
    getMoviesByGenre(53);
    $('#movie-grid').html(genreHTML);
    $('#movieGenreLabel').html("Thriller");
  });

  // Search Function
  //Run function searchMovies AFTER an input has been submitted. Submit form first.
  //Run searchMovies once to add an empty html to movie-grid using .html(). Then, overwrite it with the new html using .append(). Need to use .append() to overwrite or all the images will display on top of each other.
  var searchTerm = '';
  //reference entire search form
  $('.searchForm').submit(function(event) {
    $('#movie-grid').html('');
    event.preventDefault();
    //search term is only concerned with what the user inputted
    //Get input with .val();
    searchTerm = $('.form-control').val();
    console.log("the search term is" + searchTerm);
    $('#movieGenreLabel').html('You searched for "' + searchTerm + '"');
    searchMovies();
  });

  function searchMovies() {
    //need to include query in url. (ex: &query=boss+baby)
    const searchMovieURL = apiBaseURL + 'search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=' + searchTerm;
    getDataFromJson(searchMovieURL);
    console.log("the url is " + searchMovieURL);
  }

});

//.append(nowPlayingHTML) adds nowPlayingHTML to the present HTML
//.html(nowPlayingHTML) ovwrwrites the HTML present with nowPlayingHTML.
//.html() is faster than DOM creation
//.html() is good for when the element is empty.
//.append() is better when you want to add something dynamically, like adding a list item dynamically. (You would be adding a new string of HTML to the element.)
