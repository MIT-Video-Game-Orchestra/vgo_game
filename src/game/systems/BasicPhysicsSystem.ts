import {System} from "ecsy";
import {BasicPhysicsMovementComponent} from "../components/BasicPhysicsMovementComponent";
import {TransformComponent} from "../components/TransformComponent";

export class BasicPhysicsSystem extends System{
    execute(delta: number, time: number): void {


        this.queries.movingObjects.results.forEach(entity => {
            let basicPhysicsComponent = entity.getComponent(BasicPhysicsMovementComponent);
            let transformComponent = entity.getMutableComponent(TransformComponent);



           //one forward euler physics sim

            //dv = -v*b*dt
            //dx = v*dt

            //TODO: this generates a ton of garbage, cache the object
            let dV =  basicPhysicsComponent.velocity.clone().multiplyScalar(-basicPhysicsComponent.friction * delta);
            let dX =  basicPhysicsComponent.velocity.clone().multiplyScalar(delta);

            basicPhysicsComponent.velocity.add(dV);
            basicPhysicsComponent.position.add(dX);
            transformComponent.position.copy(basicPhysicsComponent.position);
        });

    }
}

BasicPhysicsSystem.queries = {

    movingObjects: {
        components: [BasicPhysicsMovementComponent, TransformComponent]
    }

};