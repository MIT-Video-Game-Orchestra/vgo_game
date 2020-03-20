import {
    BoxGeometry, Camera,
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
import {SceneGraphObject3DComponent, SceneGraphSystem} from "./systems/SceneGraphSystem";
import {GeometryComponent} from "./components/GeometryComponent";
import {MaterialComponent} from "./components/MaterialComponent";
import {Object3DComponent} from "./components/Object3DComponent";
import {TransformComponent} from "./components/TransformComponent";
import {RendererComponent} from "./components/RendererComponent";
import {RenderPassComponent} from "./components/RenderPassComponent";
import {CameraComponent} from "./components/CameraComponent";
import {WebGLRendererContextComponent, WebGLRendererSystem} from "./systems/WebGLRendererSystem";
import {CubeControllerComponent} from "./components/CubeControllerComponent";
import {CameraSystem} from "./systems/CameraSystem";
import {SceneSystem} from "./systems/SceneSystem";
import {SceneComponent} from "./components/SceneComponent";
import {ActiveComponent} from "./components/ActiveComponent";
import {ParentComponent} from "./components/ParentComponent";
import {TransformSystem} from "./systems/TransformSystem";
import {CubeControllerSystem} from "./systems/CubeControllerSystem";

export class GameEntry {
    _disposed = false;
    init(canvas: HTMLCanvasElement, worldFunction: () => World){

        console.log("INIT GAME");
        //hack, fix later
        WebGLRendererSystem.CANVAS = canvas;

        let world = worldFunction();
        let clock = new Clock();

        //setup main loop
        let animate = () => {
            if(this._disposed) return;

            requestAnimationFrame( animate );

            var delta = clock.getDelta();
            var elapsedTime = clock.elapsedTime;

            world.execute(delta, elapsedTime);

        };
        animate();

    }

    dispose(){
        console.log("DISPOSING GAME");
        this._disposed = true;
    }

}