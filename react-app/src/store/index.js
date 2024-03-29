import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import userPostsReducer from './post'
import userCommentsReducer from './comment';
import usersReducer from './user';
import likeReducer from './like';
import searchReducer from './search';
import followsReducer from './follow';
import followingReducer from './following';

const rootReducer = combineReducers({
  session,
  posts: userPostsReducer,
  comments: userCommentsReducer,
  users: usersReducer,
  likes: likeReducer,
  search: searchReducer,
  follows: followsReducer,
  following: followingReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
