import urljoin from "url-join";
import {HTTPClient} from "@bgoodman/http-client";

const isAuth = async (token: string) => {
    try{
        const requestHeaders = new Map([
            ["Authorization", `Bearer ${token}`]
        ]);
        const opts = {requestHeaders};
        const resp = await HTTPClient.get( urljoin(process.env.REACT_APP_API_ROOT, process.env.REACT_APP_IS_AUTH), opts );
        console.log("is auth status:" ,resp.status)
        return resp.status === 200;
    } catch (err) {
        console.error(new Error(err))
        return false;
    }
}

export default isAuth;
