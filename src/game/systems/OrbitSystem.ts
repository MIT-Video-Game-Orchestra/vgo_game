import {Entity, System} from "ecsy";
import {TransformComponent} from "../components/TransformComponent";
import {SceneGraphObject3DComponent} from "./SceneGraphSystem";
import {OrbitComponent} from "../components/OrbitComponent";

export class OrbitSystem extends System{


    execute(delta: number, time: number): void {

        this.queries.orbit.results.forEach(entity => {
            let transform = entity.getMutableComponent(TransformComponent);


            transform.position.x += Math.sin(time + transform.position.y);

            transform.position.y += Math.cos(time * 1.7)/20;

            // transform.position.y += Math.cos(time /100 + transform.position.x/2);

        });
    }
}
OrbitSystem.queries = {
    orbit: {
        components: [TransformComponent, OrbitComponent],
        listen: {
        }
    }
};