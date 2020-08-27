$(document).ready(function() {
    // The base url for all API calls
    var apiBaseURL = 'https://api.themoviedb.org/3/';
    //   var apiKey = "28e7691b28199415eec6fd8d3e1ffd18"
    var apiKey = "aa646ce85e6dc313d0a091f90ffff9c4";

    // URL in Authentication. Base URL of image
    var imageBaseUrl = 'https://image.tmdb.org/t/p/';

    const movieUrl = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;
    const showUrl = apiBaseURL + 'tv/top_rated?api_key=' + apiKey;
    const bookUrl = "https://www.googleapis.com/books/v1/volumes?q=subject:fiction";
    const URL_PARAMS = new URLSearchParams(window.location.search);

    var todoListData;

    function getToDo() {
        const request = async () => {
            const response = await fetch("/todo_list");
            const json = response.json();
            //   console.log(json);
            return json;
        }
        todoListData = request();
    }

    // getToDo();

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

    function min(a, b) {
        if( a < b )
            return a;
        return b;
    }
    function inToDoList(EntityType, EntityID) {
        //console.log(EntityType + " " + EntityID);
        for (let i = 0; i < todoListData.length; i++) {
            //   console.log(EntityID + " " + todoListData[i].id);
            if (todoListData[i].id == EntityID && todoListData[i].type == EntityType) {
                return true;
            }
        }

        return false;
    }

    function getModalCode(obj, i, entityType) {
        var id = obj.results[i].id;
        var poster = imageBaseUrl + 'w300' + obj.results[i].poster_path;
        var title;
        if(entityType==1)
            title = obj.results[i].original_title;
        else if(entityType==2)
            title = obj.results[i].name;
        var releaseDate;
        if(entityType==1)
            releaseDate = obj.results[i].release_date;
        else if(entityType==2)
            releaseDate = obj.results[i].first_air_date;
        var overview = obj.results[i].overview;
        var voteAverage = obj.results[i].vote_average;
        var codeHTML = '';

        codeHTML += `<div class="col-sm-3 eachMovie"><button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal${id}" data-whatever="@${id}"><img src="${poster}"></button><div class="modal fade" id="exampleModal${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document">`;
        codeHTML += `<div class="modal-content col-sm-12"><div class="col-sm-6 moviePosterInModal"><img src="${poster}"></div><br><div class="col-sm-6 movieDetails"><div class="movieName">${title}</div><br><div class="release">Release Date: ${releaseDate}</div><br><div class="overview">${overview}</div><br><div class="rating">Rating: ${voteAverage}/10</div><br>`;
        if (inToDoList(entityType, id)) {
            console.log("in to do");
            codeHTML += `<button id = "btn ${entityType} ${id}" type="button" onclick="alert("Already added to your to-do list");">Add to binge list</button>`;
        } else {
            // console.log("not in to do");
            codeHTML += `<button id = "btn ${entityType} ${id}" type="button" onclick="addToDo(${entityType}, ${id});">Add to binge list</button>`;
        }
        if (entityType == 1) {
          codeHTML += `<button id = "btn 1 ${obj.results[i].id}" onclick="location.href='/movies/${obj.results[i].id}'" type="button">Show more details</button>`;
        } else if (entityType == 2) {
          codeHTML += `<button id = "btn 1 ${obj.results[i].id}" onclick="location.href='/tv_shows/${obj.results[i].id}'" type="button">Show more details</button>`;
        }
        codeHTML += '</div></div></div></div></div>';
        return codeHTML;
    }

    function getDataFromJson(url, title, entity, divGrid, entityType) {
        fetch(url).then(response => response.json()).then((data) => {
            $(divGrid).append(title);
            var codeHTML = '';
            for (let i = 0; i < data.results.length; i++) {
                console.log("inside loop");
                var dataRes = data.results[i].id;
                var thisMovieUrl = apiBaseURL + entity + dataRes + '/videos?api_key=' + apiKey;
                if(data.results[i].poster_path != null) {
                    codeHTML = getModalCode(data, i, entityType);
                    $(divGrid).append(codeHTML);
                }
            }
            if(codeHTML == ''){
                codeHTML += `<h3 style="text-align:center"> No results found </h3>`;
                $(divGrid).append(codeHTML);
            }
        });
    }

    function getBookModalCode (obj, entityType) {
        var id = obj.id;
        var poster = obj.volumeInfo.imageLinks.thumbnail;
        var title = obj.volumeInfo.title;
        var releaseDate = obj.volumeInfo.publishedDate;
        var overview = obj.volumeInfo.description;
        var codeHTML = '';

        var codeHTML = '';

        codeHTML += `<div class="col-sm-3 eachMovie"><button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal${id}" data-whatever="@${id}"><img src="${poster}"></button><div class="modal fade" id="exampleModal${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document">`;
        codeHTML += `<div class="modal-content col-sm-12"><div class="col-sm-6 moviePosterInModal"><img src="${poster}"></div><br><div class="col-sm-6 movieDetails"><div class="movieName">${title}</div><br><div class="release">Release Date: ${releaseDate}</div><br><div class="overview">${overview}</div><br>`;
        if (inToDoList(3, id)) {
            console.log("in to do");
            codeHTML += `<button id = "btn ${entityType} ${id}" type="button" onclick="alert("Already added to your to-do list");">Add to binge list</button>`;
        } else {
            console.log("not in to do");
            codeHTML += `<button id = "btn ${entityType} ${id}" type="button" onclick="addToDo(${entityType},\'`+ `${id}` + `\');">Add to binge list</button>`;
        }
        codeHTML += `<button id = "btn 1 ${entityType} ${id}" onclick="location.href='/books/${id}'" type="button">Show more details</button>`;
        codeHTML += '</div></div></div></div></div>';
        return codeHTML;


    }
    function getBookDataFromJson (url, title, divGrid, entityType) {
        fetch(url).then(response => response.json()).then((data) => {
            $(divGrid).append(title);
            var codeHTML = '';
            if (data.totalItems == 0){
                codeHTML += `<h3 style="text-align:center"> No results found </h3>`;
                $(divGrid).append(codeHTML);
            }
            else{
                for (let i = 0; i < data.items.length; i++) {
                    codeHTML = getBookModalCode(data.items[i], entityType);
                    $(divGrid).append(codeHTML);
                }
            }
        });
    }
    function getTrendingMovieData(divGrid) {
        var titleTrending = '<h1 class="movieGenreLabel">Trending Movies</h1>';
        getDataFromJson(movieUrl, titleTrending, "movie/", divGrid, 1);
    }

    function getTrendingShowData(divGrid) {
        var titleTrending = '<h1 class="movieGenreLabel">Trending Shows</h1>';
        getDataFromJson(showUrl, titleTrending, "tv/", divGrid, 2);
    }

    function getTrendingBookData (divGrid) {
        var titleTrending =  '<h1 class="movieGenreLabel">Trending Books</h1>';
        getBookDataFromJson(bookUrl, titleTrending, divGrid, 3);
    }

    async function getByGenre(genre_id, genre) {
        await getToDo();
        clearPage();
        getMoviesByGenre(genre_id, genre);
        getShowsByGenre(genre_id, genre);
        getBooksByGenre(genre);
    }

    function getMoviesByGenre(genre_id, genre) {
        const getMoviesByGenreURL = apiBaseURL + 'genre/' + genre_id + '/movies?api_key=' + apiKey + '&language=en-US&include_adult=false&sort_by=created_at.asc';
        const titleGenre = '<h1 class="movieGenreLabel">"' + genre + '" in Movies</h1>';
        getDataFromJson(getMoviesByGenreURL, titleGenre, "/movie", "#search-movie-grid", 1);
    }

    function getShowsByGenre(genre_id, genre) {
        const getShowsByGenreURL = apiBaseURL + 'discover/tv?api_key=' + apiKey + '&language=en-US&sort_by=first_air_date.asc&with_genres=' + genre_id;
        const titleGenre = '<h1 class="movieGenreLabel">"' + genre + '" in Shows</h1>';
        getDataFromJson(getShowsByGenreURL, titleGenre, "/tv", "#search-show-grid", 2);
    }
    
    function getBooksByGenre(genre) {
        const titleGenre = '<h1 class="movieGenreLabel">"' + genre + '" in Books</h1>';
        const getBooksByGenreUrl = "https://www.googleapis.com/books/v1/volumes?q=subject:"+genre;
        getBookDataFromJson(getBooksByGenreUrl, titleGenre, "#search-book-grid", 3);
    }

    async function getHomePage() {
        clearPage();
        await getToDo();
        getTrendingMovieData("#movie-grid");
        getTrendingShowData("#show-grid");
        getTrendingBookData("#book-grid");
    }

    function clearPage() {
        $('#movie-grid').html('');
        $('#show-grid').html('');
        $('#book-grid').html('');
        $('#search-movie-grid').html('');
        $('#search-show-grid').html('');
        $('#search-book-grid').html('');
    }
  
    if (URL_PARAMS.toString() === "") {
        getHomePage();
    }

    //Reset HTML strings to empty to overwrite with new one!
    var nowPlayingHTML = '';
    var genreHTML = '';

    $('#action').click(function() {
        getByGenre(28, "Action");
    });

    if (URL_PARAMS.get('genre-action') === '1') {
        console.log("Found genre-action query parameter");
        getByGenre(28, "Action");
    }

    $('#adventure').click(function() {
        getByGenre(12, "Adventure");
    });
    if (URL_PARAMS.get('genre-adventure') === '1') {
        getByGenre(12, "Adventure");
    }

    $('#animation').click(function() {
        getByGenre(16, "Animation");
    });
    if (URL_PARAMS.get('genre-animation') === '1') {
        getByGenre(16, "Animation");
    }

    $('#comedy').click(function() {
        getByGenre(35, "Comedy");
    });
    if (URL_PARAMS.get('genre-comedy') === '1') {
        getByGenre(35, "Comedy");
    }

    $('#drama').click(function() {
        getByGenre(18, "Drama");
    });
    if (URL_PARAMS.get('genre-drama') === '1') {
        getByGenre(18, "Drama");
    }
    
    $('#family').click(function() {
        getByGenre(10751, "Family");
    });
    if (URL_PARAMS.get('genre-family') === '1') {
        getByGenre(10751, "Family");
    }

    $('#fantasy').click(function() {
        getByGenre(14, "Fantasy");
    });
    if (URL_PARAMS.get('genre-fantasy') === '1') {
        getByGenre(14, "Fantasy");
    }

    $('#horror').click(function() {
        getByGenre(27, "Horror");
    });
    if (URL_PARAMS.get('genre-horror') === '1') {
        getByGenre(27, "Horror");
    }

    $('#music').click(function() {
        getByGenre(10402, "Music");
    });
    if (URL_PARAMS.get('genre-music') === '1') {
        getByGenre(10402, "Music");
    }

    $('#romance').click(function() {
        getByGenre(10749, "Romance");
    });
    if (URL_PARAMS.get('genre-romance') === '1') {
        getByGenre(10749, "Romance");
    }

    $('#scifi').click(function() {
        getByGenre(878, "Sci-Fi");
    });
    if (URL_PARAMS.get('genre-scifi') === '1') {
        getByGenre(878, "Sci-Fi");
    }

    $('#thriller').click(function() {
        getByGenre(53, "Thriller");
    });
    if (URL_PARAMS.get('genre-thriller') === '1') {
        getByGenre(53, "Thriller");
    }

    // Search Function
    //Run function searchMovies AFTER an input has been submitted. Submit form first.
    //Run searchMovies once to add an empty html to movie-grid using .html(). Then, overwrite it with the new html using .append(). Need to use .append() to overwrite or all the images will display on top of each other.
    var searchTerm = '';
    //reference entire search form
    $('.searchForm').submit(function(event) {
        event.preventDefault();
        search($('.form-control').val());
    });

    if (URL_PARAMS.get('search-item') != null) {
        search(URL_PARAMS.get('search-item'));
    }

    async function search(searchQuery) {
        console.log('Search query', searchQuery);
        await getToDo();
        searchTerm = searchQuery;
        clearPage();
        //search term is only concerned with what the user inputted
        //Get input with .val();
        searchMovies();
        searchShows();
        searchBooks();
    }

    function searchMovies() {
        const searchMovieURL = apiBaseURL + 'search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=' + searchTerm;
        var searchedTerm = '<h1 class="movieGenreLabel" >"' + searchTerm + '" in Movies.</h1>'
        getDataFromJson(searchMovieURL, searchedTerm, "/movie", "#search-movie-grid");
    }

    function searchShows() {
        const searchShowURL = apiBaseURL + 'search/tv?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=' + searchTerm;
        var searchedTerm = '<h1 class="movieGenreLabel" >"' + searchTerm + '" in TV shows.</h1>'
        getDataFromJson(searchShowURL, searchedTerm, "/tv", "#search-show-grid");
    }

    function searchBooks() {
        const searchBookURL = "https://www.googleapis.com/books/v1/volumes?q=intitle:"+searchTerm;
        var searchedTerm = '<h1 class="movieGenreLabel" >"' + searchTerm + '" in Books</h1>'
        getBookDataFromJson(searchBookURL, searchedTerm, "#search-book-grid", 3);
    }
});


//.append(nowPlayingHTML) adds nowPlayingHTML to the present HTML
//.html(nowPlayingHTML) ovwrwrites the HTML present with nowPlayingHTML.
//.html() is faster than DOM creation
//.html() is good for when the element is empty.
//.append() is better when you want to add something dynamically, like adding a list item dynamically. (You would be adding a new string of HTML to the element.)

function addToDo(entityType, entityID) {
  $.ajax({
      url: '/mark_todo',
      type: 'POST',
      data: {EntityType: entityType, EntityID: entityID},
      success: function(data){
        if (data.status_code != 201){
            alert("Item already present in bingelist!");
        } else {
            window.location.reload();
        }
      }
  });
  document.getElementById("btn "+ entityType + " " + entityID).disabled = true;
}
