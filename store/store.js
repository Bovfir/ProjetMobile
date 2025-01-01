import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../reducers/eventReducer';
import thunk from 'redux-thunk';  // Importer redux-thunk

const store = configureStore({
    reducer: {
        event: eventReducer,  // Ton réducteur
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: true }), // Ajouter thunk au middleware par défaut
});

export default store;
