import { rootReducer } from '../service/reducer';
import { createStore } from 'redux';

const configureStore = () => {
return createStore(rootReducer);
}

export default configureStore;