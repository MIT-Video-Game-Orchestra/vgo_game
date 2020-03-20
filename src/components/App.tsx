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
import {CubeWorld} from "../game/worlds/CubeWorld";
import {CustomExampleWorld} from "../game/worlds/CustomWorldExample";



class App extends React.Component<{}, undefined> {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route path={"/characterSelect"}>
                        <CharacterSelect/>
                    </Route>

                    <Route path={"/customExampleWorld"}>
                        <Game worldFunction={CustomExampleWorld}/>
                    </Route>

                    <Route path={"/"}>
                        <Game worldFunction={CubeWorld}/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

declare let module: object;

export default hot(module)(App);
