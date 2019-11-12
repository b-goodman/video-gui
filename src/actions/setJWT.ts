import AuthTokenResponse from "../interfaces/AuthTokenResponse";

export const SET_JWT = "SET_JWT";

export interface SetJwtAction {
    type: typeof SET_JWT;
    payload: {
        jwt: AuthTokenResponse["token"];
    }
}