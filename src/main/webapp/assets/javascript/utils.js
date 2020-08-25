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
        alert("Item added to bingelist!");
      } else {
        alert("Item already present in bingelist!");
      }
    }
  });
  document.getElementById("btn "+ entityType + " " + entityID).disabled = true;
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