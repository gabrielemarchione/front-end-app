import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tokenReducer from '../reducers/token'
import {persistStore, persistReducer} from 'redux-persist'
import localStorage from 'redux-persist/lib/storage'
import eventiReducer from '../reducers/eventi'

const persistConfig = {
    storage:localStorage,
    key:'root'
}

const bigReducer = combineReducers({
    token: tokenReducer,
    eventi: eventiReducer,
})

const persistedReducer = persistReducer(persistConfig, bigReducer)

const store = configureStore({
    reducer: persistedReducer,
})
const persistedStore = persistStore(store)

export {store, persistedStore} 