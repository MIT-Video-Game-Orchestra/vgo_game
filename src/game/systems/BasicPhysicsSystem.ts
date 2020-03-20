import {System} from "ecsy";
import {BasicPhysicsMovementComponent} from "../components/BasicPhysicsMovementComponent";
import {TransformComponent} from "../components/TransformComponent";
import {Vector3} from "three";

export class BasicPhysicsSystem extends System{
    execute(delta: number, time: number): void {


        this.queries.movingObjects.results.forEach(entity => {
            let basicPhysicsComponent = entity.getComponent(BasicPhysicsMovementComponent);
            let transformComponent = entity.getMutableComponent(TransformComponent);

            let dt = delta;

            //for some reason initial dt is huge...
            if(dt > 10){
                return;
            }

           //one forward euler physics sim

            //dv = -v*b*dt
            //dx = v*dt
            let gravity = 150;
            // //TODO: this generates a ton of garbage, cache the object
            let dV =  basicPhysicsComponent.velocity.clone().multiplyScalar(-basicPhysicsComponent.friction * delta);
            // let dV =  new Vector3();
            dV.y = -gravity * delta;
            let dX =  basicPhysicsComponent.velocity.clone().multiplyScalar(delta);

            basicPhysicsComponent.velocity.add(dV);
            basicPhysicsComponent.position.add(dX);

            // let a = -gravity;
            // console.log(dt);
            //
            // let v_y = basicPhysicsComponent.velocity.y + dt * a;
            // let y = basicPhysicsComponent.position.y + dt * basicPhysicsComponent.velocity.y;
            //
            // console.log(v_y);
            //
            // basicPhysicsComponent.velocity.y = v_y;
            // basicPhysicsComponent.position.y = y;

            transformComponent.position.copy(basicPhysicsComponent.position);
        });

    }
}

BasicPhysicsSystem.queries = {

    movingObjects: {
        components: [BasicPhysicsMovementComponent, TransformComponent]
    }

};