import {HTTPClient} from "@bgoodman/http-client";
import VideoSearchResult from "../interfaces/VideoSearchResult"

const searchVideos = async (query: string) => {
    const resp = await HTTPClient.get(`http://localhost:3000/search?q=${query}`);
    return HTTPClient.json<VideoSearchResult[]>(resp);
}

export default searchVideos;
