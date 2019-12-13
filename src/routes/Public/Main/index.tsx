import React, {FunctionComponent, useState, useEffect} from "react";
import {Link} from "react-router-dom";

import VideoPreview from "../../../components/VideoPreview";

import {getLatestUploads} from "../../../services";
import VideoDocument from "../../../interfaces/VideoDocument";
import "./index.scss";

interface Props {}

const Main: FunctionComponent<Props> = (props) => {

    const [latestUploads, setLatestUploads] = useState<VideoDocument[]>([]);
    const [selectedVideoPreviewId, setSelectedVideoPreviewId] = useState<string>();

    useEffect(() => {
        getLatestUploads()
            .then( (latestUploads) => {
                setLatestUploads(latestUploads)
            })
    }, []);

    return (
        <div className="section-wrapper">
            <section>
                <h2>Latest Uploads</h2>
                    <div className="video-grid">
                        {latestUploads.map( (upload) => {
                            return (
                                <Link
                                    to={`/video/${upload.videoID}`}
                                    key={upload.videoID}
                                    className="video-link"
                                    onMouseEnter={() => setSelectedVideoPreviewId(upload.videoID)}
                                    onMouseLeave={() => setSelectedVideoPreviewId(undefined)}
                                >
                                    <VideoPreview video={upload} size="regular" isSelected={selectedVideoPreviewId === upload.videoID}/>
                                </Link>
                            )
                        })}
                    </div>
            </section>
        </div>
    )
}

export default Main;
