import {Component} from "ecsy";

export enum Geometries {
    CUBE,
    SPHERE
}

export class GeometryComponent extends Component{
    geometry: Geometries = Geometries.CUBE
}