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

  function getModalCode(obj, i, movieKey) {
        var id = obj.results[i].id;
        var poster = imageBaseUrl + 'w300' + obj.results[i].poster_path;
        var title = obj.results[i].original_title;
        var youtubeKey = movieKey.results[0].key;
        var youtubeLink = 'https://www.youtube.com/watch?v=' + youtubeKey;
        var releaseDate = obj.results[i].release_date;
        var overview = obj.results[i].overview;
        var voteAverage = obj.results[i].vote_average;
        var codeHTML = '';
        codeHTML += '<div class="col-sm-3 eachMovie">';
        codeHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' + obj.results[i].id + '" data-whatever="@' + obj.results[i].id + '">' + '<img src="' + poster + '"></button>';
        codeHTML += '<div class="modal fade" id="exampleModal' + obj.results[i].id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
        codeHTML += '<div class="modal-dialog" role="document">';
        codeHTML += '<div class="modal-content col-sm-12">';
        codeHTML += '<div class="col-sm-6 moviePosterInModal">';
        codeHTML += '<a href="' + youtubeLink + '"><img src="' + poster + '"></a>';
        codeHTML += '</div><br>'; //close trailerLink
        codeHTML += '<div class="col-sm-6 movieDetails">';
        codeHTML += '<div class="movieName">' + title + '</div><br>';
        codeHTML += '<div class="linkToTrailer"><a href="' + youtubeLink + '"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';
        codeHTML += '<div class="release">Release Date: ' + releaseDate + '</div><br>';
        codeHTML += '<div class="overview">' + overview + '</div><br>'; // Put overview in a separate div to make it easier to style
        codeHTML += '<div class="rating">Rating: ' + voteAverage + '/10</div><br>';
        codeHTML += '<button id = "btn 1 ' + obj.results[i].id + '" type="button" onclick="addToDo(0,' + id + '); return false;">Add to binge list</button>';
        codeHTML += '</div>'; //close movieDetails
        codeHTML += '</div>'; //close modal-content
        codeHTML += '</div>'; //close modal-dialog
        codeHTML += '</div>'; //close modal
        codeHTML += '</div>'; //close off each div
        return codeHTML;
  }

  function getDataFromJson(url, title, divGrid) {
    fetch(url).then(response => response.json()).then((data) => {
        console.log(data);
        $(divGrid).append(title);
        for (let i = 0; i < data.results.length; i++) {
            var dataRes = data.results[i].id;
            var thisMovieUrl = apiBaseURL + 'movie/' + dataRes + '/videos?api_key=' + apiKey;
            fetch(thisMovieUrl).then(response => response.json()).then((movieKey) => {
                var codeHTML = getModalCode(data, i, movieKey);
                $(divGrid).append(codeHTML);
            })
        }
    });
  }


  function getTrendingData(divGrid) {
    var titleTrending = '<h1 class="movieGenreLabel">Trending Movies</h1>';
    getDataFromJson(nowPlayingURL, titleTrending, divGrid);
  }

  function getPopularData(divGrid) {
    var titlePopular = '<h1 class="movieGenreLabel">Popular Movies</h1>';
    getDataFromJson(popularURL, titlePopular, divGrid);
  }


  function getMoviesByGenre(genre_id, genre) {
    clearPage();
    const getMoviesByGenreURL = apiBaseURL + 'genre/' + genre_id + '/movies?api_key=' + apiKey + '&language=en-US&include_adult=false&sort_by=created_at.asc';
    const titleGenre = '<h1 class="movieGenreLabel">' + genre + '</h1>';
    getDataFromJson(getMoviesByGenreURL, titleGenre, "#search-grid");
  }

  function getHomePage() {
    clearPage();
    getTrendingData("#trend-grid");
    getPopularData("#movie-grid");
  }

  function clearPage() {
    $('#trend-grid').html('');
    $('#movie-grid').html('');
    $('#search-grid').html('');
  }
  getHomePage();

  //Reset HTML strings to empty to overwrite with new one!
  var nowPlayingHTML = '';
  var genreHTML = '';

  $('#action').click(function() {
    getMoviesByGenre(28,"Action");
  });
  $('#adventure').click(function() {
    getMoviesByGenre(12,"Adventure");
  });
  $('#animation').click(function() {
    getMoviesByGenre(16,"Animation");
  });
  $('#comedy').click(function() {
    getMoviesByGenre(35,"Comedy");
  });
  $('#drama').click(function() {
    getMoviesByGenre(18,"Drama");
  });
  $('#family').click(function() {
    getMoviesByGenre(10751,"Family");
  });
  $('#fantasy').click(function() {
    getMoviesByGenre(14,"Fantasy");
  });
  $('#horror').click(function() {
    getMoviesByGenre(27,"Horror");
  });
  $('#music').click(function() {
    getMoviesByGenre(10402,"Music");
  });
  $('#romance').click(function() {
    getMoviesByGenre(10749,"Romance");
  });
  $('#scifi').click(function() {
    getMoviesByGenre(878,"Sci-Fi");
  });
  $('#thriller').click(function() {
    getMoviesByGenre(53,"Thriller");
  });

  // Search Function
  //Run function searchMovies AFTER an input has been submitted. Submit form first.
  //Run searchMovies once to add an empty html to movie-grid using .html(). Then, overwrite it with the new html using .append(). Need to use .append() to overwrite or all the images will display on top of each other.
  var searchTerm = '';
  //reference entire search form
  $('.searchForm').submit(function(event) {
    event.preventDefault();
    clearPage();
    //search term is only concerned with what the user inputted
    //Get input with .val();
    searchTerm = $('.form-control').val();
    searchMovies();
  });

  function searchMovies() {
      const searchMovieURL = apiBaseURL + 'search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=' + searchTerm;
      var searchedTerm = '<h1 class="movieGenreLabel" >You searched for "' + searchTerm + '".</h1>'
      getDataFromJson(searchMovieURL, searchedTerm, "#search-grid" );
  }

});

//.append(nowPlayingHTML) adds nowPlayingHTML to the present HTML
//.html(nowPlayingHTML) ovwrwrites the HTML present with nowPlayingHTML.
//.html() is faster than DOM creation
//.html() is good for when the element is empty.
//.append() is better when you want to add something dynamically, like adding a list item dynamically. (You would be adding a new string of HTML to the element.)

function addToDo(entityType, entityID){
    var auth2 = gapi.auth2.getAuthInstance();
    console.log(entityType, entityID, auth2.isSignedIn.get());
    
    if (auth2.isSignedIn.get() == false) {
        alert("Sign in to use todo list.");
        return;
    }

    var googleUser = auth2.currentUser.get();
    var profile = googleUser.getBasicProfile();
    var emailID = profile.getEmail();

    var form = $('<form></form>');
    form.attr("method", "post");
    form.attr("action", "/mark_todo");

    var field0 = $('<input></input>');
    field0.attr("type", "hidden");
    field0.attr("name", "EmailID");
    field0.attr("value", emailID);
    form.append(field0);
    var field1 = $('<input></input>');
    field1.attr("type", "hidden");
    field1.attr("name", "EntityType");
    field1.attr("value", entityType);
    form.append(field1);
    var field2 = $('<input></input>');
    field2.attr("type", "hidden");
    field2.attr("name", "EntityID");
    field2.attr("value", entityID);
    form.append(field2);
    console.log(form);

    $(document.body).append(form);
    form.submit();
    document.getElementById("btn "+ entityType + " " + entityID).disabled = true;
}
