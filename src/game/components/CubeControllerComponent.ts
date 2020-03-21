import {Component} from "ecsy";
import {Geometries} from "./GeometryComponent";
import {KeyboardInputManager} from "../input/KeyboardInputManager";
import {Color} from "three";

export interface Keybindings {
    fire: string,
    left: string,
    up: string,
    right: string,
}

export class CubeControllerComponent extends Component{

    keybindings: Keybindings = {
        fire: 's',
        left: 'a',
        up: 'w',
        right: 'd',
    }
}