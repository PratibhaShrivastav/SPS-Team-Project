$(document).ready(function() {
	//base URL for all entities of to do list
	//later to be replaced with our API
	var apiBaseURL = 'https://api.themoviedb.org/3/';
	var apiKey = "aa646ce85e6dc313d0a091f90ffff9c4";

	// URL in Authentication. Base URL of image
	var imageBaseUrl = 'https://image.tmdb.org/t/p/';

	const nowPlayingURL = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;


	//  Get "now playing" data on default.
	//  Change results when a genre is clicked on.

	function getDataFromJson(data, entityType) {
		// console.log(i);
		// console.log(thisMovieUrl)
		// console.log(movieKey)
		var poster = imageBaseUrl + 'w300' + data.poster_path;
		var title;
        if(entityType==1)
            title = data.original_title;
        else if(entityType==2)
            title = data.name;
        var releaseDate;
        if(entityType==1)
            releaseDate = data.release_date;
        else if(entityType==2)
            releaseDate = data.first_air_date;
		var overview = data.overview;
		var voteAverage = data.vote_average;		
		// console.log(youtubeLink)
		var nowPlayingHTML = '';
		// added in i (looping through the results) to nowPlayingHTML. Without it, only the details for the first movie in the results display in the modal no matter which movie poster you click on.
		nowPlayingHTML += '<div class="col-sm-3 eachMovie">';
		nowPlayingHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' + data.id + '" data-whatever="@' + data.id + '">' + '<img src="' + poster + '"></button>';
		nowPlayingHTML += '<div class="modal fade" id="exampleModal' + data.id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
		nowPlayingHTML += '<div class="modal-dialog" role="document">';
		nowPlayingHTML += '<div class="modal-content col-sm-12">';
		nowPlayingHTML += '<div class="col-sm-6 moviePosterInModal">';
		nowPlayingHTML += '<img src="' + poster + '">';
		nowPlayingHTML += '</div><br>'; //close trailerLink
		nowPlayingHTML += '<div class="col-sm-6 movieDetails">';
		nowPlayingHTML += '<div class="movieName">' + title + '</div><br>';
		nowPlayingHTML += '<div class="release">Release Date: ' + releaseDate + '</div><br>';
		// nowPlayingHTML += '<div class="genre">Genre: '+genre+'</div><br>';
		nowPlayingHTML += '<div class="overview">' + overview + '</div><br>'; // Put overview in a separate div to make it easier to style
		nowPlayingHTML += '<div class="rating">Rating: ' + voteAverage + '/10</div><br>';
		nowPlayingHTML += '<button  id = "btn 1 ' + data.id + '" type="button" onclick="return markCompleted('+ entityType + ',' + data.id + ')">Binged It!</button>';
		nowPlayingHTML += '</div>'; //close movieDetails
		nowPlayingHTML += '</div>'; //close modal-content
		nowPlayingHTML += '</div>'; //close modal-dialog
		nowPlayingHTML += '</div>'; //close modal
		nowPlayingHTML += '</div>'; //close off each div

		return nowPlayingHTML;
	}

	// function getMovie(entityID) {
	// 	var thisMovieUrl = apiBaseURL + 'movie/' + entityID + '/videos?api_key=' + apiKey;
	// 	var movieKeyID;
	// 	fetch(thisMovieUrl).then(response => response.json()).then((movieKey) => {
	// 		movieKeyID = movieKey.results[0].key;
	// 	})
	// 	var movieLink = apiBaseURL + 'movie/' + entityID + '?api_key=' + apiKey;
	// 	fetch(movieLink).then(response => response.json()).then((data) => {
	// 		var codeHTML = getDataFromJson(data, movieKeyID, 1);
	// 		$('#movie-grid').append(codeHTML);
	// 	})
	// }

    // function getShow(entityID){
        
    // }

	function getEntity(entityType, entityID) {
		var url;
        switch (entityType) {
			case 1:
				url = apiBaseURL + 'movie/' + entityID + '?api_key=' + apiKey;
				break;
			case 2:
				url = url = apiBaseURL + 'tv/' + entityID + '?api_key=' + apiKey;
				break;
			case 3:
				break;
		}

        fetch(url).then(response => response.json()).then((data) => {
			var codeHTML = getDataFromJson(data, entityType);
			$('#movie-grid').append(codeHTML);
		})
        
	}


	function getToDoPage() {
		fetch("/todo_list").then(response => response.json()).then((data) => {
			console.log(data);
			for (let i = 0; i < data.length; i++) {
				var dataRes = data[i].id;
				getEntity(data[i].type, data[i].id);
			}
		});
	}
	getToDoPage();
});

function markCompleted(entityType, entityID) {
	$.ajax({
		url: '/unmark_todo',
		type: 'POST',
		data: {
			EntityType: entityType,
			EntityID: entityID
		},
		success: function(data) {
			if (data.status_code == 200) {
				alert("Item removed from bingelist!");
			} else {
				alert("Item couldn't be removed from bingelist!");
			}
		}
	});

	document.getElementById("btn " + entityType + " " + entityID).disabled = true;
}