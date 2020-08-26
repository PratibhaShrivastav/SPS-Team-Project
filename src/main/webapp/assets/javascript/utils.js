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
      if (data.status_code == 201) {
        window.location.reload();
      } else {
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