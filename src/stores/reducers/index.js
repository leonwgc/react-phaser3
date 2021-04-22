import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
export const Update = 'Update';

const initstate = {};

const app = (state = initstate, action) => {
  let payload = action.payload;
  switch (action.type) {
    case Update: {
      return { ...state, ...payload };
    }
    default:
      return { ...state };
  }
};

export default (history) => combineReducers({ router: connectRouter(history), app });
