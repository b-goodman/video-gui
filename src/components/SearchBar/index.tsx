import React, {FunctionComponent, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import pThrottle from "p-throttle";
import VideoPreview from "../VideoPreview";
import VideoDocument from "../../interfaces/VideoDocument"
import {searchVideos} from "../../services";

import { MdSearch } from "react-icons/md";

import "./index.scss";


const searchEntry = (result: VideoDocument, isSelected: boolean, onClick: (videoID: VideoDocument["videoID"]) => void) => {
    return (
        <li key={`result-${result.videoID}`} onClick={() => onClick(result.videoID)}>
            <Link to={`/video/${result.videoID}`}>
                <div className="search-result" data-hover={isSelected}>
                    <div>{result.title}</div>
                    <VideoPreview key={result.videoID} isSelected={isSelected} video={result} size="small"/>
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

    const history = useHistory();

    const maxResults = props.maxResults || 4;

    const [searchResults, updateSearchResults] = useState<VideoDocument[]>([]);
    const [suggestionsIsOpen, setSuggestionsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [keyboardSelection, setKeyboardSelection] = useState<number>(0);

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
        setKeyboardSelection(0);
    }

    const handleSearchResultClick = (videoID: VideoDocument["videoID"]) => {
        console.log("search ",videoID)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key)
        switch (event.key) {
            case "ArrowDown": //move selection down list
                if (keyboardSelection < searchResults.length - 1) {
                    setKeyboardSelection(keyboardSelection + 1)
                } else {
                    setKeyboardSelection(0)
                }
                break;
            case "ArrowUp":
                    if (keyboardSelection > 0) {
                        setKeyboardSelection(keyboardSelection - 1)
                    } else {
                        setKeyboardSelection(searchResults.length - 1)
                    }
                break;
            case "Escape":
                hideSuggestions();
                break;
            case "Enter":
                history.push(`/video/${searchResults[keyboardSelection].videoID}`);
                hideSuggestions();
                break;
            default:
                break;
        }
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
                        onBlur={hideSuggestions}
                        onKeyDown={handleKeyDown}
                    >
                    </input>
                </div>
            </div>
            <div className="suggestions" data-isopen={suggestionsIsOpen && searchResults.length > 0}>
                <ul>
                    {[
                        //search results
                        ...searchResults.slice(0, maxResults).map( (result, index) => {
                            return searchEntry(result, index === keyboardSelection, handleSearchResultClick)
                        }),
                        // optional 'see all' btn
                        searchResults.length > maxResults ? viewAllSearch(searchTerm) : []
                    ]}
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;
