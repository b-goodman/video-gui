import React, {FunctionComponent, useRef, useState, useEffect} from "react";
import VideoSerachResult from "../../interfaces/VideoDocument";
import {printTime} from "../../util";
import "./index.scss";

interface Props {
    video: VideoSerachResult;
    size?: "small" | "regular";
    static?: boolean;
    isSelected?: boolean;
}

const VideoPreview: FunctionComponent<Props> = (props) => {

    const [hasFocus, setFocus] = useState<boolean>(false);

    useEffect(() => {
        if (props.isSelected) {
            beginPreviewPlayback()
        } else {
            stopPreviewPlayback()
        }
    }, [props.isSelected])

    // const size = props.size || "small";
    const videoEl = useRef<HTMLVideoElement>(null);

    const beginPreviewPlayback = () => {
        setFocus(true);
        videoEl.current!.play();
    }

    const stopPreviewPlayback = () => {
        setFocus(false);
        videoEl.current!.pause();
        videoEl.current!.currentTime = 0;
    }

    return (
        <div
            onMouseEnter={beginPreviewPlayback}
            onMouseLeave={stopPreviewPlayback}
        >

            <div
                className="thumb-container"
                data-size={props.size}
            >

                <img
                    alt=""
                    data-visible={!hasFocus}
                    src={`${process.env.REACT_APP_API_ROOT}${process.env.REACT_APP_SERVE_THUMBNAIL}/${props.video.videoID}`}>
                </img>

                {props.size !== "small" ? <p data-visible={!hasFocus}>{printTime(props.video.duration)}</p> : ""}

                <video
                    ref={videoEl}
                    data-visible={hasFocus}
                    controls={false}
                    muted
                    id={`preview-${props.video.videoID}`}
                >

                    <source
                        src={`${process.env.REACT_APP_API_ROOT}${process.env.REACT_APP_SERVE_VIDEO}/${props.video.videoID}?preview=true`}
                        type="video/mp4"
                    />

                    Sorry, your browser doesn't support embedded videos.
                </video>
            </div>

            {props.size !== "small" ? <h3>{props.video.title}</h3> : ""}

        </div>
    );
}

export default VideoPreview;

