import {System} from "ecsy";
import {BoundingBoxComponent} from "../components/BoundingBoxComponent";
import {CubeControllerComponent} from "../components/CubeControllerComponent";
import {PlatformComponent} from "../components/PlatformComponent";
import {TransformComponent} from "../components/TransformComponent";
import {BasicPhysicsMovementComponent} from "../components/BasicPhysicsMovementComponent";
import {CollisionComponent} from "../components/CollisionComponent";
import {BulletComponent} from "../components/BulletComponent";

export class BulletSystem extends System{

    execute(delta: number, time: number): void {

        this.queries.bullets.results.forEach(bulletEntity => {
            let bullet = bulletEntity.getComponent(BulletComponent);
            bullet.timeActive += delta;
            if(bullet.timeActive > bullet.lifeTime){
                bulletEntity.remove();
            }
        })
    }

    static queries = {
        bullets: {
            components: [BulletComponent],
        }
    }

}