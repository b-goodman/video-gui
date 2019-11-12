import urljoin from "url-join";
import {HTTPClient} from "@bgoodman/http-client";
import AuthTokenResponse from "../interfaces/AuthTokenResponse"

const requestToken = async (data: FormData) => {
    try{
        const resp = await HTTPClient.post( urljoin(process.env.REACT_APP_API_ROOT, process.env.REACT_APP_LOGIN), data );
        if (resp.status === 200) {
            return HTTPClient.json<AuthTokenResponse>(resp);
        } else {
            throw new Error(resp.statusText);
        }
    } catch (err) {
        throw new Error(err)
    }
}

export default requestToken;
