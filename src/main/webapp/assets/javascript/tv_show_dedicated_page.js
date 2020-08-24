const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '28e7691b28199415eec6fd8d3e1ffd18';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const YOUTUBE_WATCH_URL = 'https://www.youtube.com/watch?v='

async function getYoutubeUrl(entityType, entityId) {
  let response = await axios.get(`${API_BASE_URL}/${entityType}/${entityId}/videos`, {
    params: {
      api_key: API_KEY
    }
  });
  console.log('Got Youtube Url for ', entityId, 'response: ', response);
  return response.data.results[0].key;
}

function addToDo(entityType, entityID){
  var form = $("<form></form>");
  form.attr('method', 'post');
  form.attr('action', '/mark_todo');
  var field1 = $('<input></input>');
  field1.attr('type', 'hidden');
  field1.attr('name', 'EntityType');
  field1.attr('value', entityType);
  form.append(field1);
  var field2 = $('<input></input>');
  field2.attr('type', 'hidden');
  field2.attr('name', 'EntityID');
  field2.attr('value', entityID);
  form.append(field2);
  console.log(form);
  $(document.body).append(form);
  form.submit();
}

let tvShowId = $('#tv-show-details').data('tv-show-id');
axios.get(`${API_BASE_URL}/tv/${tvShowId}`, {
  params: {
    api_key: API_KEY
  }
}).then(async (response) => {
  console.log('Tv Show details: ', response);

  $('#poster').html(`
    <img src="${IMAGE_BASE_URL}/w300/${response.data.poster_path}">
  `);

  $('#tvShowName').html(`
    <center>
      <h1 class="orangeHeading">${response.data.name}</h3>
    </center>
  `);

  let youtubeUrlKey = await getYoutubeUrl("tv", tvShowId);
  let youtubeUrl = `${YOUTUBE_WATCH_URL}${youtubeUrlKey}`;
  $('#linkToTrailer').html(`
    <button id = "btn btn-primary" type="button" onclick="location.href='${youtubeUrl}'">
      <span class="glyphicon glyphicon-play"></span>
      &nbspPlay trailer
    </button>
  `);

  $('#changeTodoStatus').html(`
    <button id="btn btn-primary" type="button" onclick="addToDo(1, ${tvShowId})">
      <span class="glyphicon glyphicon-plus"></span>
      Add to todo list
    </button>
  `);

  $('#firstAirDate').html(`
    <h4 class="inline">First air date: </h4>${response.data.first_air_date}
  `);

  $('#status').html(`
    <h4 class="inline">Status: </h4>${response.data.status}
  `);

  $('#networks').html(`
    <h4 class="inline">Networks: </h4>${response.data.networks.map(e => e.name).join(", ")}
  `);

  $('#numberOfSeasons').html(`
    <h4 class="inline">Number of seasons: </h4>${response.data.number_of_seasons}
  `);

  $('#numberOfEpisodes').html(`
    <h4 class="inline">Number of episodes: </h4>${response.data.number_of_episodes}
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

let response = [
  "Very good.",
  "I like this movie"
];
for (let review of response) {
  $('#reviewList').append(`
    <li class="review">${review}<br>
  `);
}