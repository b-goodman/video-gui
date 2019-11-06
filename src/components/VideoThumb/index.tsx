import React, {FunctionComponent, useRef, useState} from "react";
import VideoSerachResult from "../../interfaces/VideoSearchResult";
import {printTime} from "../../util";
import "./index.css";

interface Props {
    size?: "small" | "regular";
    video: VideoSerachResult;
}

const VideoThumb: FunctionComponent<Props> = (props) => {

    const [hasFocus, setFocus] = useState<boolean>(false);

    // const size = props.size || "small";
    const videoEl = useRef<HTMLVideoElement>(null);

    const handleMouseEntry = () => {
        setFocus(true);
        videoEl.current!.play();
    }

    const handleMouseExit = () => {
        setFocus(false);
        videoEl.current!.pause();
        videoEl.current!.currentTime = 0;
    }

    return (
        <div>

            <div
                className="thumb-container"
                onMouseEnter={handleMouseEntry}
                onMouseLeave={handleMouseExit}
            >

                <img
                    data-visible={!hasFocus}
                    src={`${process.env.REACT_APP_API_ROOT}/video/thumbnail?videoID=${props.video.videoID}`}>
                </img>

                <p data-visible={!hasFocus}>{printTime(props.video.duration)}</p>

                <video
                    ref={videoEl}
                    data-visible={hasFocus}
                    controls={false}
                    muted
                    id={`preview-${props.video.videoID}`}
                >

                    <source
                        src={`${process.env.REACT_APP_API_ROOT}/video?videoID=${props.video.videoID}&preview=true`}
                        type="video/mp4"
                    />

                    Sorry, your browser doesn't support embedded videos.
                </video>
            </div>

            <h3>{props.video.title}</h3>

        </div>
    );
}

export default VideoThumb;

