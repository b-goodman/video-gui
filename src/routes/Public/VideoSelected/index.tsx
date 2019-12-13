import React, {FunctionComponent, useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import urljoin from "url-join";
import  queryVideo from "../../../services/queryVideo";
import VideoDocument from "../../../interfaces/VideoDocument"
import "./index.scss";

interface Props {}

interface RouteParams {
    videoID: string;
}

const Video: FunctionComponent<{videoID: string}> = ({videoID}) => {
    return (
        <video
            controls={true}
        >
            <source
                src={`${process.env.REACT_APP_API_ROOT}${process.env.REACT_APP_SERVE_VIDEO}/${videoID}`}
                type="video/mp4"
            />
            Sorry, your browser doesn't support embedded videos.
        </video>
    )
};

const VideoTags: FunctionComponent<any> = (props) => {
    return (
        props.tags.map( (tag: string) => {
            return (
                <Link key={`tag-link-${tag}`} className="tag" to={ urljoin(process.env.REACT_APP_ROUTE_SEARCH_VIDEO, tag)}>
                    {tag}
                </Link>
            )
        })
    )
};

const VideoSelected: FunctionComponent<Props> = (props) => {
    const {videoID} = useParams<RouteParams>();
    const [videoData, setVideoData] = useState<VideoDocument>();

    useEffect( () => {
        queryVideo(videoID)
            .then( (data) => {
                setVideoData(data)
            })
    }, [videoID])

    return (
        <div>
            <section>
                {videoData ? <h1>{videoData.title}</h1> : null}
                <Video videoID={videoID}/>
                <div className="video-tags">
                    {videoData ? <VideoTags tags={videoData.tags}/> : null}
                </div>
                {videoData ? <p>{videoData.description}</p> : null}
            </section>
        </div>
    );
}

export default VideoSelected;
