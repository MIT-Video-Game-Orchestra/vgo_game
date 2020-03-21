import {Entity, System} from "ecsy";
import {BoundingBoxComponent} from "../components/BoundingBoxComponent";
import {CubeControllerComponent} from "../components/CubeControllerComponent";
import {PlatformComponent} from "../components/PlatformComponent";
import {TransformComponent} from "../components/TransformComponent";
import {BasicPhysicsMovementComponent} from "../components/BasicPhysicsMovementComponent";
import {CollisionComponent} from "../components/CollisionComponent";

export class BoxCollisionSystem extends System{


    process(entityA: Entity, entityB: Entity){
        let rect1 = this.getBoundingRect(entityA);
        let rect2 = this.getBoundingRect(entityB);



        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y) {

            if(entityA.hasComponent(CollisionComponent)){
                entityA.getComponent(CollisionComponent).collideEntities.push(entityB)
            }
            if(entityB.hasComponent(CollisionComponent)){
                entityB.getComponent(CollisionComponent).collideEntities.push(entityA)
            }
        }
    }


    getBoundingRect(entity: Entity){
        let transform = entity.getComponent(TransformComponent);
        let boundingBox = entity.getComponent(BoundingBoxComponent);

        return {
            x: transform.position.x - boundingBox.width/2,
            y: transform.position.y - boundingBox.height/2,
            width: boundingBox.width,
            height: boundingBox.height,
        };
    }


    execute(delta: number, time: number): void {
        let boxes = this.queries.boundingBoxes.results;
        //test every pair
        //TODO: different collision layers
        for(let i = 0; i < boxes.length; i++){
            for(let j = i + 1; j < boxes.length; j++){
                this.process(boxes[i], boxes[j])
            }
        }
    }

    static queries = {
        boundingBoxes: {
            components: [BoundingBoxComponent, TransformComponent],
        },
    }

}