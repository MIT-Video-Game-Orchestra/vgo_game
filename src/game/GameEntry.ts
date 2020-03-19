import {BoxGeometry, Clock, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from "three";
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


        world.createEntity()
            .addComponent(Object3DComponent)
            .addComponent(MaterialComponent)
            .addComponent(GeometryComponent)
            .addComponent(TransformComponent)


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