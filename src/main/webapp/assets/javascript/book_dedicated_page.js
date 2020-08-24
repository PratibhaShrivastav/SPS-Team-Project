const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

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

let bookId = $('#book-details').data('book-id');
console.log("Book id:", bookId);
axios.get(`${API_BASE_URL}/${bookId}`)
    .then(async (response) => {
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
        <button id = "btn btn-primary" type="button" onclick="location.href='${response.data.volumeInfo.previewLink}'">
          <span class="glyphicon glyphicon-book"></span>
          Preview
        </button>
      `);

      $('#changeTodoStatus').html(`
        <button id="btn btn-primary" type="button" onclick="addToDo(1, ${bookId})">
          <span class="glyphicon glyphicon-plus"></span>
          Add to todo list
        </button>
      `);

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

let response = [
  "Very good.",
  "I like this book."
];
for (let review of response) {
  $('#reviewList').append(`
    <li class="review">${review}<br>
  `);
}