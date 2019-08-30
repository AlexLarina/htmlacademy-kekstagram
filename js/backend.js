const loadData = (url, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === 200) {
      onLoad(xhr.response);
    } else {
      onError(xhr.status, xhr.statusText);
    }
  });

  xhr.open(`GET`, url);
  xhr.send();
};

const uploadData = (url, data, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === 200) {
      onLoad(xhr.response);
    } else {
      onError(xhr.status, xhr.statusText);
    }
  });

  xhr.open(`POST`, url);
  xhr.send(data);
};

export {loadData, uploadData};
