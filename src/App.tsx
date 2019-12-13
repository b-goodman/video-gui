import React, {FunctionComponent} from "react";
import { Provider } from "react-redux";
import { BrowserRouter, } from "react-router-dom";
import store from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer"

import Routes from "./routes";
import "./App.scss";

interface Props {};

const App: FunctionComponent<Props> = () => {

    return(
        <Provider store={store}>
            <BrowserRouter>
                    <Header/>
                        <div className="main">
                            <Routes />
                        </div>
                    <Footer/>
            </BrowserRouter>
        </Provider>
    )
}

export default App;

