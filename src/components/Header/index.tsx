import React, {FunctionComponent, } from "react";
import SearchBar from "../SearchBar";
import "./index.scss";

interface Props {

}

const Header: FunctionComponent<Props> = (props) => {

    return (
        <header>
            <nav>
                <SearchBar />
            </nav>
        </header>
    )
}

export default Header;
