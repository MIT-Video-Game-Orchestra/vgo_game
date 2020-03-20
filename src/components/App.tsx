import * as React from "react";
import { hot } from "react-hot-loader";

const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";
import {Game} from "./Game";

import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {CharacterSelect} from "./CharacterSelect";



class App extends React.Component<{}, undefined> {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route path={"/characterSelect"}>
                        <CharacterSelect/>
                    </Route>
                    <Route path={"/"}>
                        <Game/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

declare let module: object;

export default hot(module)(App);
