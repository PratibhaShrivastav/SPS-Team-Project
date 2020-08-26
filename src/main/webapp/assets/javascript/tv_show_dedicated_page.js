const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '28e7691b28199415eec6fd8d3e1ffd18';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const YOUTUBE_WATCH_URL = 'https://www.youtube.com/watch?v='
const ENTITY_TYPE = 2;

var todoListData;

let tvShowId = $('#tv-show-details').data('tv-show-id');
axios.get(`${API_BASE_URL}/tv/${tvShowId}`, {
  params: {
    api_key: API_KEY
  }
}).then(async (response) => {
  await getToDo();
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
    <button id="btn btn-primary" type="button" onclick="location.href='${youtubeUrl}'">
      <span class="glyphicon glyphicon-play"></span>
      &nbspPlay trailer
    </button>
  `);
  
	if (inToDoList(2, tvShowId)) {
		$('#changeTodoStatus').html(`
			<button id="btn btn-primary" type="button" onclick="alert("Already added to your to-do list");">
				<span class="glyphicon glyphicon-plus"></span>
				Add to todo list
			</button>
		`);
	} else {
		$('#changeTodoStatus').html(`
			<button id="btn btn-primary" type="button" onclick="addToDo(2, ${tvShowId})">
				<span class="glyphicon glyphicon-plus"></span>
				Add to todo list
			</button>
		`);
	}

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

axios.get("/add_review")
    .then((response) => {
      console.log("Reviews: ", response);
      for (let review of response.data) {
        if ((review.id == tvShowId) && (review.type == ENTITY_TYPE)) {
          $('#reviewList').append(`
            <li class="review"><h4 class="inline">${review.name}: </h4>${review.comment}<br>
          `);
        }
      }
    });

function getToDo() {
  const request = async () => {
    const response = await fetch("/todo_list");
    const json = response.json();
    return json;
  }
  todoListData = request();
}

function inToDoList(EntityType, EntityID) {
  for (let i = 0; i < todoListData.length; i++) {
    if (todoListData[i].id == EntityID && todoListData[i].type == EntityType) {
      return true;
    }
  }
  return false;
}
