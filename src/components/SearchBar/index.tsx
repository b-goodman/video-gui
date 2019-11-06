import React, {FunctionComponent, useState, useRef} from "react";
import VideoSearchResult from "../../interfaces/VideoSearchResult"
import VideoThumb from "../VideoThumb";
import {searchVideos} from "../../services";
import pThrottle from "p-throttle";
import "./index.css";


interface Props {

}

const SearchBar: FunctionComponent<Props> = (props) => {

    const [searchResults, updateSearchResults] = useState<VideoSearchResult[]>([]);
    // const [isLoading, setLoadingStatus] = useState<boolean>(false);

    const searchResultsThrottled = pThrottle( (query:string) => searchVideos(query), 1, 500 );

    const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        if (searchTerm.length > 0) {
            const searchResults = await searchResultsThrottled(searchTerm);
            updateSearchResults(searchResults);
        } else {
            updateSearchResults([]);
        }
    }

    return (
        <div>
            <input className="search-field" type="text" onChange={handleInput}></input>
            <div className="suggestions" data-open="false">
                <li>
                    {searchResults.map( result => <VideoThumb key={result.videoID} video={result} size="small"/> )}
                </li>
            </div>
        </div>
    );
}

export default SearchBar;
