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

export class GameEntry {
    _disposed = false;
    init(canvas: HTMLCanvasElement){

        console.log("INIT GAME");
        //hack, fix later
        SceneGraphSystem.CANVAS = canvas;
        WebGLRendererSystem.CANVAS = canvas;

        var world = new World();
        world
            .registerSystem(CameraSystem)
            .registerSystem(SceneSystem)
            .registerSystem(SceneGraphSystem)
            .registerSystem(WebGLRendererSystem)
        world
            .registerComponent(RendererComponent)
            .registerComponent(WebGLRendererContextComponent)
            .registerComponent(RenderPassComponent)
            .registerComponent(SceneGraphObject3DComponent)
            .registerComponent(Object3DComponent)
            .registerComponent(MaterialComponent)
            .registerComponent(GeometryComponent)
            .registerComponent(TransformComponent)
            .registerComponent(CameraComponent)
            .registerComponent(CubeControllerComponent)
            .registerComponent(ParentComponent)


        let renderer = world.createEntity()
            .addComponent(RendererComponent)

        let camera = world.createEntity()
            .addComponent(CameraComponent, {
                fov: 75,
                aspect: window.innerWidth / window.innerHeight,
                near: 0.1,
                far: 1000
            })
            .addComponent(ActiveComponent);

        let scene = world.createEntity()
            .addComponent(SceneComponent)

        let renderPass = world.createEntity()
            .addComponent(RenderPassComponent, {
                scene,
                camera
            });

        let p1 = world.createEntity()
            .addComponent(Object3DComponent)
            .addComponent(MaterialComponent, {
                color: new Color(0.8, 0.6, 0.1)
            })
            .addComponent(GeometryComponent)
            .addComponent(TransformComponent, {
                position: new Vector3(2, 0, 0)
            })
            .addComponent(ParentComponent, {
                parentObject: scene
            });

        let p2 = world.createEntity()
            .addComponent(Object3DComponent)
            .addComponent(MaterialComponent, {
                color: new Color(0.2, 0.6, 0.6)
            })
            .addComponent(GeometryComponent)
            .addComponent(TransformComponent, {
                position: new Vector3(-2, 0, 0)
            })
            .addComponent(ParentComponent, {
                parentObject: scene
            });

        // p2.getComponent(TransformComponent).position.set(0, 2, 0);


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