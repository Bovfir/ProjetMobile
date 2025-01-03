import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../reducers/eventReducer';
import thunk from 'redux-thunk';  

const store = configureStore({
    reducer: {
        event: eventReducer,  
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: true }), 
});

export default store;
