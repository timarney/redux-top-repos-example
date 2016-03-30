import { combineReducers } from 'redux';

function items(state = { num: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, { num: state.num + 1, action: 'increment' });
    case 'DECREMENT':
      return Object.assign({}, state, { num: state.num - 1, action: 'decrement' });
    default:
      return state;
  }
}

function repo(state = {}, action) {
  switch (action.type) {
    case 'REPO_JSON':
      return Object.assign({}, state, { json: action.json });
    case 'IS_LOADING':
      return Object.assign({}, state, { isLoading: action.isLoading });
    default:
      return state;
  }
}

const rootReducer = combineReducers({ items, repo});

export default rootReducer;
