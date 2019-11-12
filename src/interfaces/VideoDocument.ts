interface VideoDocument {
        dateUploaded: string;
        tags: string[];
        _id: string;
        videoID: string;
        filesize: number;
        previewFilesize: number;
        duration: number;
        title: string;
        description: string;
        __v: number;
}

export default VideoDocument;