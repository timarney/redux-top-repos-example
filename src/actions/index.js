function countRepos(jsonResult) {
  return { type: 'COUNT_REPOS', repos: jsonResult };
}

function loadingChanged(isLoading) {
  return { type: 'IS_LOADING', isLoading };
}

export function loadRepo(urlParam) {
  return (dispatch, getState) => {
    dispatch(loadingChanged(true));
    const user = getState().repos.user;
    const url = `https://api.github.com/users/${user}/repos`;
    return fetch(url)
      .then((response) => {
        const json = response.json();
        if (!response.ok) return {};
        return json;
      })
      .then((json) => {
        dispatch(loadingChanged(false));
        console.log(json);
        dispatch(countRepos(json));
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
