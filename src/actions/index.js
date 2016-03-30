function repoJson(jsonResult) {
  return { type: 'REPO_JSON', json: jsonResult };
}

function loadingChanged(isLoading) {
  return { type: 'IS_LOADING', isLoading };
}

export function loadRepo() {
  return (dispatch, getState) => {
    dispatch(loadingChanged(true));

    const items = getState().items;
    const repo = items.data[items.num].text;
    const url = `https://api.github.com/repos/${repo}`;
    console.log(url);

    return fetch(url)
        .then((response) => {
          const json = response.json();
          if (!response.ok) return {};
          return json;
        })
        .then((json) => {
          dispatch(loadingChanged(false));
          console.log(json);
          dispatch(repoJson(json));
        });

  };

}

function doIncrement() {
  return { type: 'INCREMENT' };
}

function doDecrement() {
  return { type: 'DECREMENT' };
}

export function increment() {
  return (dispatch, getState) => {
    if (getState().items.num === getState().items.data.length - 1) {
      return;
    }

    dispatch(doIncrement());
  };
}

export function decrement() {
  return (dispatch, getState) => {
    if (getState().items.num === 0) {
      return;
    }

    dispatch(doDecrement());
  };
}
