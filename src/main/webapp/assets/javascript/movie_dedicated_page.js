const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '28e7691b28199415eec6fd8d3e1ffd18';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const YOUTUBE_WATCH_URL = 'https://www.youtube.com/watch?v='
const ENTITY_TYPE = 1;

let movieId = $('#movie-details').data('movie-id');
axios.get(`${API_BASE_URL}/movie/${movieId}`, {
  params: {
    api_key: API_KEY
  }
}).then(async (response) => {
  console.log('Movie details: ', response);

  $('#poster').html(`
    <img src="${IMAGE_BASE_URL}/w300/${response.data.poster_path}">
  `);

  $('#movieName').html(`
    <center>
      <h1 class="orangeHeading">${response.data.title}</h3>
    </center>
  `);

  let youtubeUrlKey = await getYoutubeUrl("movie", movieId);
  let youtubeUrl = `${YOUTUBE_WATCH_URL}${youtubeUrlKey}`;
  $('#linkToTrailer').html(`
    <button id="btn btn-primary" type="button" onclick="location.href='${youtubeUrl}'">
      <span class="glyphicon glyphicon-play"></span>
      &nbspPlay trailer
    </button>
  `);

  $('#changeTodoStatus').html(`
    <button id="btn btn-primary" type="button" onclick="addToDo(1, ${movieId})">
      <span class="glyphicon glyphicon-plus"></span>
      Add to todo list
    </button>
  `);

  $('#release').html(`
    <h4 class="inline">Release: </h4>${response.data.release_date}
  `);

  $('#rating').html(`
    <h4 class="inline">Rating: </h4>${response.data.vote_average}
  `);

  $('#language').html(`
    <h4 class="inline">Language: </h4>${response.data.original_language}
  `);

  $('#genre').html(`
    <h4 class="inline">Genre: </h4>${response.data.genres.map(e => e.name).join(", ")}
  `);
  
  $('#synopsis').append(`
    ${response.data.overview}<br><br>
  `);
});

axios.get("/add_review")
    .then((response) => {
      for (let review of response.data) {
        if ((review.id === movieId) && (review.type === ENTITY_TYPE)) {
          $('#reviewList').append(`
            <li class="review"><h4 class="inline">${review.user}: </h4>${review.comment}<br>
          `);
        }
      }
    });