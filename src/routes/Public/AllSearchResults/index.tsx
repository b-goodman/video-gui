import React, {FunctionComponent, useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import VideoPreview from "../../../components/VideoPreview"
import VideoDocument from "../../../interfaces/VideoDocument";
import {searchVideos} from "../../../services";

import "./index.scss";

const renderVideoThumb = (result: VideoDocument) => {
    return (
        <Link to={`/video/${result.videoID}`}>
            <VideoPreview video={result}/>
        </Link>
        )
    };

interface Props {}

interface RouteParams {
    searchTerm: string;
}

const AllSearchResults: FunctionComponent<Props> = (props) => {

    const {searchTerm} = useParams<RouteParams>();
    const [searchResults, updateSearchResults] = useState<VideoDocument[]>([]);

    useEffect(() => {
        searchVideos(searchTerm).then(updateSearchResults)
        return () => {
        };
    }, [searchTerm])

    return (
        <section>
            <h2>Search: {searchTerm}</h2>
            <div className="video-grid">
                {searchResults.map(renderVideoThumb)}
            </div>
        </section>
    )
}

export default AllSearchResults;
