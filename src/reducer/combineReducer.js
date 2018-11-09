import counterReducer  from './counterReducer';
import listReducer  from './listReducer'
import { combineReducers} from 'redux';

export const rootReducer = combineReducers({
    counterReducer,
    listReducer
  });