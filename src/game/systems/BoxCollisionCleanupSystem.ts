import {Entity, System} from "ecsy";
import {BoundingBoxComponent} from "../components/BoundingBoxComponent";
import {CubeControllerComponent} from "../components/CubeControllerComponent";
import {PlatformComponent} from "../components/PlatformComponent";
import {TransformComponent} from "../components/TransformComponent";
import {BasicPhysicsMovementComponent} from "../components/BasicPhysicsMovementComponent";
import {CollisionComponent} from "../components/CollisionComponent";


//make sure this system is placed after all systems that use collision
export class BoxCollisionCleanupSystem extends System{
    execute(delta: number, time: number): void {
        this.queries.colllisions.results.forEach(entity => {
            entity.getComponent(CollisionComponent).collideEntities.length = 0;
        })
    }

    static queries = {
        colllisions: {
            components: [CollisionComponent],
        },
    }

}