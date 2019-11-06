interface VideoSearchResult {
    videoID: string,
    dateUploaded?: string,
    tags?: string[],
    _id?: string,
    filesize?: number,
    duration?: number,
    title?: string,
    description?: string,
    __v?: 0
}

export default VideoSearchResult;