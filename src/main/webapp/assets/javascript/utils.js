function addToDo(entityType, entityID) {
  console.log(`Adding ${entityID} of ${entityType} to todo list.`);
  $.ajax({
    url: '/mark_todo',
    type: 'POST',
    data: {
      EntityType: entityType, 
      EntityID: entityID
    },
    success: (data) => {
      if (data.status_code != 201) {
        alert("Item already present in bingelist!");
      }
    }
  });
  document.getElementById("btn btn-primary btn-todo").disabled = true;
}

function addReview(form, entityType, entityID) {
  let comment = form.Comment.value;
  // alert(`Adding comment: ${comment}, rating: ${rating} for ${entityID} of ${entityType}`);
  $.ajax({
    url: '/add_review',
    type: 'POST',
    data: {
      EntityID: entityID,
      EntityType: entityType,
      Rating: 0,
      Comment: comment
    },
    success: (data) => {
      // if (data.status_code == 201) {
      //   alert("Review added");
      // } else {
      //   alert("Review not added");
      // }
    }
  });
  return false;
}

async function getYoutubeUrl(entityType, entityId) {
  let response = await axios.get(`${API_BASE_URL}/${entityType}/${entityId}/videos`, {
    params: {
      api_key: API_KEY
    }
  });
  console.log('Got Youtube Url for ', entityId, 'response: ', response);
  return response.data.results[0].key;
}

function clearPage() {
  $('#movie-grid').html('');
  $('#show-grid').html('');
  $('#book-grid').html('');
  $('#search-movie-grid').html('');
  $('#search-show-grid').html('');
  $('#search-book-grid').html('');
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

var searchTerm = '';
$('.searchForm').submit(function(event) {
  event.preventDefault();
  clearPage();
  //search term is only concerned with what the user inputted
  //Get input with .val();
  searchTerm = $('.form-control').val();
  searchMovies();
  searchShows();
  searchBooks();
});