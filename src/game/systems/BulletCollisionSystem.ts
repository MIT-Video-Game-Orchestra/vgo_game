import {System} from "ecsy";
import {BoundingBoxComponent} from "../components/BoundingBoxComponent";
import {CubeControllerComponent} from "../components/CubeControllerComponent";
import {PlatformComponent} from "../components/PlatformComponent";
import {TransformComponent} from "../components/TransformComponent";
import {BasicPhysicsMovementComponent} from "../components/BasicPhysicsMovementComponent";
import {CollisionComponent} from "../components/CollisionComponent";
import {BulletComponent} from "../components/BulletComponent";
import {HPComponent} from "../components/HPComponent";

export class BulletCollisionSystem extends System{

    execute(delta: number, time: number): void {

        this.queries.collided.results.forEach(bulletEntity => {

            let transform = bulletEntity.getComponent(TransformComponent);
            let boundingBox = bulletEntity.getComponent(BoundingBoxComponent);
            let movement = bulletEntity.getComponent(BasicPhysicsMovementComponent);
            let collision = bulletEntity.getComponent(CollisionComponent);
            let bullet = bulletEntity.getComponent(BulletComponent);

            //TODO: should take into account normal of surface hit to determine reflection direction
            if(collision.collideEntities.length > 0){
                movement.velocity.y *= -0.8; //lose some energy
                // movement.velocity.x *= -0.8; //lose some energy
            }

            collision.collideEntities.forEach(entity => {
                if(entity.hasComponent(HPComponent)){
                    entity.getMutableComponent(HPComponent).currentHP -= bullet.damage;
                    bulletEntity.remove();
                }
            })
        })
    }

    static queries = {
        collided: {
            components: [BulletComponent, CollisionComponent, BasicPhysicsMovementComponent],
        }
    }

}