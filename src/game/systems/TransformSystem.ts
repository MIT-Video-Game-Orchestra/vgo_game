import {Entity, System} from "ecsy";
import {TransformComponent} from "../components/TransformComponent";
import {SceneGraphObject3DComponent} from "./SceneGraphSystem";

export class TransformSystem extends System{


    applyTransform(entity: Entity){
        let object3d = entity.getComponent(SceneGraphObject3DComponent).object3d;
        let transformComponent = entity.getComponent(TransformComponent);

        //optimize later
        object3d.position.copy(transformComponent.position);
        object3d.rotation.copy(transformComponent.rotation);
        object3d.scale.copy(transformComponent.scale);
    }

    execute(delta: number, time: number): void {
        this.queries.transforms.changed.forEach(entity => {
            this.applyTransform(entity);
        });
        this.queries.transforms.added.forEach(entity => {
            this.applyTransform(entity);
        });
    }
}
TransformSystem.queries = {
    transforms: {
        components: [TransformComponent, SceneGraphObject3DComponent],
        listen: {
            changed: true,
            added: true
        }
    }
};