import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router";
import AllSearchResults from "./Public/AllSearchResults";
import VideoSelected from "./Public/VideoSelected";
import Login from "./Public/Login";
import { PrivateRoute } from "../util";
import Admin from "./Private/Admin";
import NotFound from "./Public/NotFound";
import Main from "./Public/Main";

interface Props {}

const Routes: FunctionComponent<Props> = (props) => {
    return (
        <Switch>
            <Route path="/search/:searchTerm" component={AllSearchResults}/>
            <Route path="/video/:videoID" component={VideoSelected} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/admin" component={Admin} />
            <Route exact path="/" component={Main} />
            <Route path="/*" component={NotFound} />
        </Switch>
    )
}

export default Routes;
