import {World} from "ecsy";
import {CameraSystem} from "../systems/CameraSystem";
import {SceneSystem} from "../systems/SceneSystem";
import {SceneGraphObject3DComponent, SceneGraphSystem} from "../systems/SceneGraphSystem";
import {TransformSystem} from "../systems/TransformSystem";
import {WebGLRendererContextComponent, WebGLRendererSystem} from "../systems/WebGLRendererSystem";
import {CubeControllerSystem} from "../systems/CubeControllerSystem";
import {RendererComponent} from "../components/RendererComponent";
import {RenderPassComponent} from "../components/RenderPassComponent";
import {Object3DComponent} from "../components/Object3DComponent";
import {MaterialComponent} from "../components/MaterialComponent";
import {GeometryComponent} from "../components/GeometryComponent";
import {TransformComponent} from "../components/TransformComponent";
import {CameraComponent} from "../components/CameraComponent";
import {CubeControllerComponent} from "../components/CubeControllerComponent";
import {ParentComponent} from "../components/ParentComponent";
import {Color, Vector3} from "three";
import {ActiveComponent} from "../components/ActiveComponent";
import {SceneComponent} from "../components/SceneComponent";

export function CubeWorld() {
    var world = new World();
    world
        .registerSystem(CameraSystem)
        .registerSystem(SceneSystem)
        .registerSystem(SceneGraphSystem)
        .registerSystem(TransformSystem)
        .registerSystem(WebGLRendererSystem)
        .registerSystem(CubeControllerSystem)
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
        .addComponent(TransformComponent, {
            position: new Vector3(0, 0, 10)
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
    return world;
}