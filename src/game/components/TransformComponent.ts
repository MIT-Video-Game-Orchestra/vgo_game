import {Color, Euler, Vector3} from "three";

export class TransformComponent{
    position: Vector3 = new Vector3();
    rotation: Euler = new Euler();
    scale: Vector3 = new Vector3(1, 1, 1);
}