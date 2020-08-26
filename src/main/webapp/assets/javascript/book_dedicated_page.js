const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const ENTITY_TYPE = 3;

var todoListData;

let bookId = $('#book-details').data('book-id');
console.log("Book id:", bookId);
axios.get(`${API_BASE_URL}/${bookId}`)
    .then(async (response) => {
      await getToDo();
      console.log('Book details: ', response);

      $('#poster').html(`
        <img src="${response.data.volumeInfo.imageLinks.thumbnail}">
      `);
      
      let bookName = response.data.volumeInfo.title;
      if (response.data.volumeInfo.subtitle) {
        bookName += `: ${response.data.volumeInfo.subtitle}`
      }
      $('#bookName').html(`
        <center>
          <h1 class="orangeHeading">${bookName}</h3>
        </center>
      `);

      $('#previewLink').html(`
        <button id="btn btn-primary" type="button" onclick="location.href='${response.data.volumeInfo.previewLink}'">
          <span class="glyphicon glyphicon-book"></span>
          Preview
        </button>
      `);

			if (inToDoList(3, bookId)) {
				$('#changeTodoStatus').html(`
					<button id="btn btn-primary" type="button" onclick="alert("Already added to your to-do list");">
						<span class="glyphicon glyphicon-plus"></span>
						Add to todo list
					</button>
				`);
			} else {
				$('#changeTodoStatus').html(`
					<button id="btn btn-primary" type="button" onclick="addToDo(3, '${bookId}')">
						<span class="glyphicon glyphicon-plus"></span>
						Add to todo list
					</button>
				`);
			}

      $('#authors').html(`
        <h4 class="inline">Authors: </h4>${response.data.volumeInfo.authors.join(", ")}
      `);

      $('#publisher').html(`
        <h4 class="inline">Publisher: </h4>${response.data.volumeInfo.publisher}
      `);

      $('#isbn').html(`
        <h4 class="inline">ISBN: </h4>${response.data.volumeInfo.industryIdentifiers.map(e => e.identifier).join(", ")}
      `);

      $('#length').html(`
        <h4 class="inline">Length: </h4>${response.data.volumeInfo.pageCount} pages
      `);

      $('#language').html(`
        <h4 class="inline">Langauge: </h4>${response.data.volumeInfo.language}
      `);

      $('#categories').html(`
        <h4 class="inline">Categories: </h4>${response.data.volumeInfo.categories.join(", ")}
      `);

      $('#description').append(`
        ${response.data.volumeInfo.description}<br><br>
      `);
    });

axios.get("/add_review")
    .then((response) => {
      console.log("Reviews: ", response);
      for (let review of response.data) {
        if ((review.id == bookId) && (review.type == ENTITY_TYPE)) {
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
