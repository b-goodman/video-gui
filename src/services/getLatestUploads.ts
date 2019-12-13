import urljoin from "url-join";
import {HTTPClient} from "@bgoodman/http-client";
import VideoDocument from "../interfaces/VideoDocument"

const getLatestUploads = async () => {
    try{
        const resp = await HTTPClient.get( urljoin(process.env.REACT_APP_API_ROOT, process.env.REACT_APP_GET_LATEST_UPLOADS) );
        return HTTPClient.json<VideoDocument[]>(resp)
    } catch (err) {
        throw new Error(err)
    }
}

export default getLatestUploads;
