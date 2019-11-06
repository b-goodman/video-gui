import React, {FunctionComponent} from "react";

import SearchBar from "./components/SearchBar";

// import VideoThumb from "./components/VideoThumb";
// import VideoSearchResult from "./interfaces/VideoSearchResult";

// const video: VideoSearchResult = {
//     videoID: "8lhqPA7j",
//     title: "Test Video 5",
//     duration: 10,
// }

const App: FunctionComponent<{}> = () => {

    const handleChange = (file?:File) => {
        console.log(file);
    }

    return (
        <SearchBar />

    )
}

export default App;

