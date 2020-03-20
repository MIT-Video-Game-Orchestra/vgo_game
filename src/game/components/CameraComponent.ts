import {Component} from "ecsy";

export class CameraComponent extends Component{

    handleResize: boolean = true;
    isOrthographic: boolean = false;
    aspect: number;

    //perspective fields
    fov: number;
    near: number;
    far: number;
    layers: number;

    //ortho fields
    worldHeight: number;


    reset(){
        this.fov = 45;
        this.aspect = 1;
        this.near = 0.1;
        this.far = 1000;
        this.layers = 0;
        this.handleResize = true;
    }
}