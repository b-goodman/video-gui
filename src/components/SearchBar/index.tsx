import React, {FunctionComponent, useState, } from "react";
import {Link} from "react-router-dom";
import pThrottle from "p-throttle";
import VideoPreview from "../VideoPreview";
import VideoDocument from "../../interfaces/VideoDocument"
import {searchVideos} from "../../services";

import { MdSearch } from "react-icons/md";

import "./index.scss";


const searchEntry = (result: VideoDocument, onClick: (videoID: VideoDocument["videoID"]) => void) => {
    return (
        <li key={`result-${result.videoID}`} onClick={() => onClick(result.videoID)}>
            <Link to={`/video/${result.videoID}`}>
                <div className="search-result">
                    <div>{result.title}</div>
                    <VideoPreview key={result.videoID} video={result} size="small"/>
                </div>
            </Link>
        </li>
    )
}

const viewAllSearch = (searchTerm: string) => {
    return (
        <li key="see-all">
            <Link to={`/search/${searchTerm}`}>
                <div className="search-result">
                    <h3>See All...</h3>
                </div>
            </Link>
        </li>
    )
}


interface Props {
    maxResults?: number;
}

const SearchBar: FunctionComponent<Props> = (props) => {

    const maxResults = props.maxResults || 4;

    const [searchResults, updateSearchResults] = useState<VideoDocument[]>([]);
    const [suggestionsIsOpen, setSuggestionsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("")

    const searchResultsThrottled = pThrottle( (query:string) => searchVideos(query), 1, 500 );

    const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        if (searchTerm.length > 0) {
            const searchResults = await searchResultsThrottled(searchTerm);
            updateSearchResults(searchResults);
        } else {
            updateSearchResults([]);
        }
    }

    const showSuggestions = () => {
        setSuggestionsOpen(true)
    }

    const hideSuggestions = () => {
        window.setTimeout( () => setSuggestionsOpen(false), 500);
    }

    const handleSearchResultClick = (videoID: VideoDocument["videoID"]) => {
        console.log("search ",videoID)
    }


    return (
        <div>

            <div className="input-wrapper">
                <div className="icon"><MdSearch /></div>
                <div>
                    <input
                        className="search-field"
                        type="text"
                        placeholder="Search Videos..."
                        value={searchTerm}
                        onChange={handleInput}
                        onFocus={showSuggestions}
                        onBlur={hideSuggestions}>
                    </input>
                </div>
            </div>
            <div className="suggestions" data-isopen={suggestionsIsOpen && searchResults.length > 0}>
                <ul>
                    {[
                        //search results
                        ...searchResults.slice(0, maxResults).map( (result) => searchEntry(result, handleSearchResultClick) ),
                        // optional 'see all' btn
                        searchResults.length > maxResults ? viewAllSearch(searchTerm) : []
                    ]}
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;
