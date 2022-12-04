import { configureStore } from '@reduxjs/toolkit';
import logger from '../middlewares/logger';
import monitorReducerEnhancer from '../middlewares/reducerEnhancer';
import rootReducer from './rootReducer';

function configureReduxStore(preloadedState) {
    const store = configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
        preloadedState,
        enhancers: [monitorReducerEnhancer],
    });

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
    }

    return store;
}

export default configureReduxStore;