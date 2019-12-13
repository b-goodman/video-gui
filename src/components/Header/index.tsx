import React, {FunctionComponent, } from "react";
import {Link} from "react-router-dom";
import SearchBar from "../SearchBar";
import {MdHome} from "react-icons/md";
import "./index.scss";

interface Props {

}

const Header: FunctionComponent<Props> = (props) => {

    return (
        <header>
            <nav>
                <Link className="home-link" to={"/"}>
                    <MdHome />
                </Link>
                <SearchBar />
            </nav>
        </header>
    )
}

export default Header;
