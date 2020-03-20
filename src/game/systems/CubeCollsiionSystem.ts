import {System} from "ecsy";
import {BoundingBoxComponent} from "../components/BoundingBoxComponent";
import {CubeControllerComponent} from "../components/CubeControllerComponent";
import {PlatformComponent} from "../components/PlatformComponent";
import {TransformComponent} from "../components/TransformComponent";
import {BasicPhysicsMovementComponent} from "../components/BasicPhysicsMovementComponent";

export class CubeCollsiionSystem extends System{

    execute(delta: number, time: number): void {
        this.queries.cubes.results.forEach(cubeEntity => {

            let transform = cubeEntity.getComponent(TransformComponent);
            let boundingBox = cubeEntity.getComponent(BoundingBoxComponent);
            let movement = cubeEntity.getComponent(BasicPhysicsMovementComponent);


            //TODO: modularize, cleanup this code

            let cubeRect = {
                x: movement.position.x - boundingBox.width/2,
                y: movement.position.y - boundingBox.height/2,
                width: boundingBox.width,
                height: boundingBox.height,
            };

            // let movement = cubeEntity.getMutableComponent(BasicPhysicsMovementComponent);

            this.queries.platforms.results.forEach(platformEntity => {
                let platformTransform = platformEntity.getComponent(TransformComponent);
                let platformBoundingBox = platformEntity.getComponent(BoundingBoxComponent);

                let platformRect = {
                    x: platformTransform.position.x - platformBoundingBox.width/2,
                    y: platformTransform.position.y - platformBoundingBox.height/2,
                    width: platformBoundingBox.width,
                    height: platformBoundingBox.height,
                };

                //collision detection

                let rect1 = cubeRect;
                let rect2 = platformRect;

                if (rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height > rect2.y) {
                    // collision detected!


                    console.log("COLLISION")

                    if(movement.velocity.y < 0){ //cube is falling, redirect up
                        //make sure no longer inside platform
                        movement.position.y = platformRect.y + platformRect.height/2 + cubeRect.height/2 + 5; //wiggle room
                        movement.velocity.y *= -0.8; //lose some energy
                    }
                    else{
                        movement.position.y = platformRect.y - platformRect.height/2 - cubeRect.height/2 - 5; //wiggle room
                        movement.velocity.y *= -0.8; //lose some energy
                    }


                }

            })

        })
    }

    static queries = {
        cubes: {
            components: [CubeControllerComponent, BoundingBoxComponent, TransformComponent, BasicPhysicsMovementComponent],
        },
        platforms: {
            components: [PlatformComponent, BoundingBoxComponent, TransformComponent],
        },
    }

}