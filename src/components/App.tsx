import * as React from "react";
import { hot } from "react-hot-loader";

const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";
import {Game} from "./Game";

class App extends React.Component<{}, undefined> {
    public render() {
        return (
            <Game/>
        );
    }
}

declare let module: object;

export default hot(module)(App);
