import {System} from "ecsy";
import {BoundingBoxComponent} from "../components/BoundingBoxComponent";
import {CubeControllerComponent} from "../components/CubeControllerComponent";
import {PlatformComponent} from "../components/PlatformComponent";
import {TransformComponent} from "../components/TransformComponent";
import {BasicPhysicsMovementComponent} from "../components/BasicPhysicsMovementComponent";
import {CollisionComponent} from "../components/CollisionComponent";

export class CubeCollsiionSystem extends System{

    execute(delta: number, time: number): void {

        this.queries.collided.results.forEach(cubeEntity => {

            let transform = cubeEntity.getComponent(TransformComponent);
            let boundingBox = cubeEntity.getComponent(BoundingBoxComponent);
            let movement = cubeEntity.getComponent(BasicPhysicsMovementComponent);
            let collision = cubeEntity.getComponent(CollisionComponent);

            let cubeRect = {
                x: movement.position.x - boundingBox.width/2,
                y: movement.position.y - boundingBox.height/2,
                width: boundingBox.width,
                height: boundingBox.height,
            };

            collision.collideEntities.forEach(otherEntity => {
                let platform = otherEntity.getComponent(PlatformComponent);

                if(platform){
                    let platformTransform = otherEntity.getComponent(TransformComponent);
                    let platformBoundingBox = otherEntity.getComponent(BoundingBoxComponent);

                    let platformRect = {
                        x: platformTransform.position.x - platformBoundingBox.width/2,
                        y: platformTransform.position.y - platformBoundingBox.height/2,
                        width: platformBoundingBox.width,
                        height: platformBoundingBox.height,
                    };

                    if(movement.position.y > platformRect.y){ //cube is falling, redirect up
                        //make sure no longer inside platform
                        movement.position.y = platformRect.y + platformRect.height/2 + cubeRect.height/2 + 5; //wiggle room
                        movement.velocity.y *= -0.8; //lose some energy
                    }
                    else{

                        movement.position.y = platformRect.y - platformRect.height/2 - cubeRect.height/2 - 5; //wiggle room
                        movement.velocity.y *= -0.8; //lose some energy

                    }
                }
            });


        })
    }

    static queries = {
        collided: {
            components: [CubeControllerComponent, CollisionComponent, BasicPhysicsMovementComponent],
        }
    }

}