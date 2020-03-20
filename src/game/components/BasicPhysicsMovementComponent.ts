import {Component} from "ecsy";
import {Vector3} from "three";

export class BasicPhysicsMovementComponent extends Component{
    position: Vector3 = new Vector3();
    velocity: Vector3 = new Vector3();

    friction: number;
}