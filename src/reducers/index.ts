import { createReducer } from 'redux-starter-kit';
import defaultState from "../store/defaultState";
import ReduxStore from "../interfaces/ReduxStore";
import {SET_JWT, SetJwtAction} from "../actions/setJWT"

export const rootReducer = createReducer( defaultState, {

    [SET_JWT]: (state: ReduxStore, action: SetJwtAction) => {
        console.log("action", action.payload.jwt)
        state.jwt = action.payload.jwt;
    },

});