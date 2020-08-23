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
        var id = data.id;
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
		var codeHTML = '';

        codeHTML += `<div class="col-sm-3 eachMovie"><button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal${id}" data-whatever="@${id}"><img src="${poster}"></button><div class="modal fade" id="exampleModal${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document">`;
        codeHTML += `<div class="modal-content col-sm-12"><div class="col-sm-6 moviePosterInModal"><img src="${poster}"></div><br><div class="col-sm-6 movieDetails"><div class="movieName">${title}</div><br><div class="release">Release Date: ${releaseDate}</div><br><div class="overview">${overview}</div><br><div class="rating">Rating: ${voteAverage}/10</div><br>`;
        codeHTML += `<button  id = "btn ${entityType} ${id}" type="button" onclick="return markCompleted(${entityType},${id})">Binged It!</button></div></div></div></div></div>`;
        return codeHTML;
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
        codeHTML += `<button id = "btn ${entityType} ${id}" type="button" onclick="return markCompleted(${entityType},\'`+ `${id}` + `\');">Add to binge list</button>`;
        codeHTML += '</div></div></div></div></div>';
        return codeHTML;


    }

	function getEntity(entityType, entityID) {
		var url;
        switch (entityType) {
			case 1:
				url = apiBaseURL + 'movie/' + entityID + '?api_key=' + apiKey;
                fetch(url).then(response => response.json()).then((data) => {
			        var codeHTML = getDataFromJson(data, entityType);
			        $('#movie-grid').append(codeHTML);
		        });
				break;
			case 2:
				url = apiBaseURL + 'tv/' + entityID + '?api_key=' + apiKey;
                fetch(url).then(response => response.json()).then((data) => {
			        var codeHTML = getDataFromJson(data, entityType);
			        $('#movie-grid').append(codeHTML);
		        });
				break;
			case 3:
                url = "https://www.googleapis.com/books/v1/volumes/"+entityID;
                fetch(url).then(response => response.json()).then((data) => {
                        var codeHTML = getBookModalCode(data, entityType);
                        $('#movie-grid').append(codeHTML);
                });
                break;
        }
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