import {Component} from "ecsy";
import {Vector3} from "three";

export class BasicPhysicsMovementComponent extends Component{
    position: Vector3 = new Vector3();
    velocity: Vector3 = new Vector3();

    friction: number = 0;


    reset(){
        this.velocity.set(0, 0, 0);
        this.position.set(0, 0, 0);
    }
}