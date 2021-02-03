import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// Imports: Dependencies

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['temp', 'loading'],
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(store);
export {store, persistor};
