import {Scene} from "three";
import {Not, System} from "ecsy";
import {SceneComponent} from "../components/SceneComponent";
import {Object3DComponent} from "../components/Object3DComponent";
import {SceneGraphObject3DComponent} from "./SceneGraphSystem";

export class SceneGraphSceneComponent{
    scene: Scene;
    reset(){
        this.scene = null;
    }
}

export class SceneSystem extends System{
    execute(delta: number, time: number): void {
        this.queries.uninitializedScenes.added.forEach(entity => {
            let scene = new Scene();
            entity.addComponent(SceneGraphSceneComponent, {scene: scene});
            entity.addComponent(SceneGraphObject3DComponent, {object3d: scene});
        })
    }
}

SceneSystem.queries = {

    uninitializedScenes: {
        components: [SceneComponent, Not(SceneGraphSceneComponent)],
        listen: {
            added: true
        }
    }
}