import urljoin from "url-join";
import {HTTPClient} from "@bgoodman/http-client";
import VideoDocument from "../interfaces/VideoDocument"

const queryVideos = async (videoID: string) => {
    try{
        const resp = await HTTPClient.get( urljoin(process.env.REACT_APP_API_ROOT, process.env.REACT_APP_QUERY_VIDEO, videoID) );
        return HTTPClient.json<VideoDocument>(resp)
    } catch (err) {
        throw new Error(err)
    }
}

export default queryVideos;
