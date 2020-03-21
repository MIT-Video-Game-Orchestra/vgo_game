import {System} from "ecsy";
import {BoundingBoxComponent} from "../components/BoundingBoxComponent";
import {CubeControllerComponent} from "../components/CubeControllerComponent";
import {PlatformComponent} from "../components/PlatformComponent";
import {TransformComponent} from "../components/TransformComponent";
import {BasicPhysicsMovementComponent} from "../components/BasicPhysicsMovementComponent";
import {CollisionComponent} from "../components/CollisionComponent";
import {BulletComponent} from "../components/BulletComponent";

export class BulletCollisionSystem extends System{

    execute(delta: number, time: number): void {

        this.queries.collided.results.forEach(cubeEntity => {

            let transform = cubeEntity.getComponent(TransformComponent);
            let boundingBox = cubeEntity.getComponent(BoundingBoxComponent);
            let movement = cubeEntity.getComponent(BasicPhysicsMovementComponent);
            let collision = cubeEntity.getComponent(CollisionComponent);


            //TODO: should take into account normal of surface hit to determine reflection direction
            if(collision.collideEntities.length > 0){
                movement.velocity.y *= -0.8; //lose some energy
                // movement.velocity.x *= -0.8; //lose some energy
            }
        })
    }

    static queries = {
        collided: {
            components: [BulletComponent, CollisionComponent, BasicPhysicsMovementComponent],
        }
    }

}