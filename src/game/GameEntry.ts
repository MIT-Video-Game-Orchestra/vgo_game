import {
    BoxGeometry,
    Clock,
    Color,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer
} from "three";
import {System, World} from "ecsy";
import {SceneGraphSystem} from "./systems/SceneGraphSystem";
import {GeometryComponent} from "./components/GeometryComponent";
import {MaterialComponent} from "./components/MaterialComponent";
import {Object3DComponent} from "./components/Object3DComponent";
import {TransformComponent} from "./components/TransformComponent";

export class GameEntry {

    init(canvas: HTMLCanvasElement){

        console.log("INIT GAME");
        //hack, fix later
        SceneGraphSystem.CANVAS = canvas;

        var world = new World();
        world.registerSystem(SceneGraphSystem);
        world
            .registerComponent(GeometryComponent)
            .registerComponent(MaterialComponent)
            .registerComponent(Object3DComponent)
            .registerComponent(TransformComponent);


        let p1 = world.createEntity()
            .addComponent(Object3DComponent)
            .addComponent(MaterialComponent, {
                color: new Color(0.8, 0.6, 0.1)
            })
            .addComponent(GeometryComponent)
            .addComponent(TransformComponent, {
                position: new Vector3(2, 0, 0)
            });

        let p2 = world.createEntity()
            .addComponent(Object3DComponent)
            .addComponent(MaterialComponent, {
                color: new Color(0.2, 0.6, 0.6)
            })
            .addComponent(GeometryComponent)
            .addComponent(TransformComponent, {
                position: new Vector3(-2, 0, 0)
            });

        // p2.getComponent(TransformComponent).position.set(0, 2, 0);


        let clock = new Clock();

        //setup main loop
        let animate = function () {
            requestAnimationFrame( animate );

            var delta = clock.getDelta();
            var elapsedTime = clock.elapsedTime;

            world.execute(delta, elapsedTime);

        };
        animate();

    }

    dispose(){
        //TODO
    }

}