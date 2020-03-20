import {Component} from "ecsy";

export class CameraComponent extends Component{
    fov: number;
    aspect: number;
    near: number;
    far: number;
    layers: number;
    handleResize: boolean;
    reset(){
        this.fov = 45;
        this.aspect = 1;
        this.near = 0.1;
        this.far = 1000;
        this.layers = 0;
        this.handleResize = true;
    }
}