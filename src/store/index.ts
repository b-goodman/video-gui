import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import {rootReducer} from '../reducers/index';
import defaultState from "./defaultState";

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(),],
    preloadedState: defaultState,
    // enhancers: [monitorReducersEnhancer]
})

if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    (module as any).hot.accept('../reducers/index', () => store.replaceReducer(rootReducer))
}

export default store;