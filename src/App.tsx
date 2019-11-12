import React, {FunctionComponent} from "react";
import { Provider } from "react-redux";
import { BrowserRouter, } from "react-router-dom";
import store from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer"

import Routes from "./routes";

interface Props {};

const App: FunctionComponent<Props> = () => {

    return(
        <Provider store={store}>
            <BrowserRouter>

                <div>
                    <Header/>

                        <Routes />

                    <Footer/>
                </div>
            </BrowserRouter>
        </Provider>
    )
}

export default App;

