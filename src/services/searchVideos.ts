import urljoin from "url-join";
import {HTTPClient} from "@bgoodman/http-client";
import VideoDocument from "../interfaces/VideoDocument"

const searchVideos = async (query: string) => {
    try{
        const resp = await HTTPClient.get( urljoin(process.env.REACT_APP_API_ROOT, process.env.REACT_APP_SEARCH_VIDEO, `?query=${query}`) );
        return resp.status === 200
            ? HTTPClient.json<VideoDocument[]>(resp)
            : []
    } catch (err) {
        console.warn(err);
        return [];
    }
}

export default searchVideos;
