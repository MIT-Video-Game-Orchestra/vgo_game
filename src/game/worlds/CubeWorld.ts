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
import {Geometries, GeometryComponent} from "../components/GeometryComponent";
import {TransformComponent} from "../components/TransformComponent";
import {CameraComponent} from "../components/CameraComponent";
import {CubeControllerComponent, Keybindings} from "../components/CubeControllerComponent";
import {ParentComponent} from "../components/ParentComponent";
import {Color, Geometry, Vector3} from "three";
import {ActiveComponent} from "../components/ActiveComponent";
import {SceneComponent} from "../components/SceneComponent";
import {BasicPhysicsMovementComponent} from "../components/BasicPhysicsMovementComponent";
import {BasicPhysicsSystem} from "../systems/BasicPhysicsSystem";
import {OrbitComponent} from "../components/OrbitComponent";
import {OrbitSystem} from "../systems/OrbitSystem";
import {PlatformComponent} from "../components/PlatformComponent";
import {BoundingBoxComponent} from "../components/BoundingBoxComponent";
import {CubeCollsiionSystem} from "../systems/CubeCollsiionSystem";

export function CubeWorld() {
    var world = new World();
    world
        .registerSystem(CameraSystem)
        .registerSystem(SceneSystem)
        .registerSystem(SceneGraphSystem)
        .registerSystem(CubeControllerSystem)
        .registerSystem(TransformSystem)
        .registerSystem(BasicPhysicsSystem)
        .registerSystem(OrbitSystem)
        .registerSystem(CubeCollsiionSystem)
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
        .registerComponent(BasicPhysicsMovementComponent)
        .registerComponent(OrbitComponent)
        .registerComponent(PlatformComponent)
        .registerComponent(BoundingBoxComponent)


    let renderer = world.createEntity()
        .addComponent(RendererComponent)

    const WORLD_HEIGHT = 100;

    let camera = world.createEntity()
        .addComponent(CameraComponent, {
            aspect: window.innerWidth / window.innerHeight,
            worldHeight: WORLD_HEIGHT,
            isOrthographic: true
        })
        .addComponent(ActiveComponent);

    let scene = world.createEntity()
        .addComponent(SceneComponent)

    let renderPass = world.createEntity()
        .addComponent(RenderPassComponent, {
            scene,
            camera
        });

    let FRICTION = 10;
    let p1 = world.createEntity()
        .addComponent(Object3DComponent)
        .addComponent(MaterialComponent, {
            color: new Color(0.8, 0.9, 0.1)
        })
        .addComponent(GeometryComponent)
        .addComponent(TransformComponent, {
            scale: new Vector3(10, 10, 10)
        })
        .addComponent(ParentComponent, {
            parentObject: scene
        })
        .addComponent(CubeControllerComponent, {
            keybindings: {
                down: 'ArrowDown',
                left: 'ArrowLeft',
                up: 'ArrowUp',
                right: 'ArrowRight',
            }
        })
        .addComponent(BoundingBoxComponent, {
            width: 10,
            height: 10,
        })
        .addComponent(BasicPhysicsMovementComponent, {
            position: new Vector3(80, 50, -10),
            friction: FRICTION
        })
    ;

    let p2 = world.createEntity()
        .addComponent(Object3DComponent)
        .addComponent(MaterialComponent, {
            color: new Color(0.1, 0.9, 0.2)
        })
        .addComponent(GeometryComponent)
        .addComponent(TransformComponent, {
            scale: new Vector3(10, 10, 10)
        })
        .addComponent(ParentComponent, {
            parentObject: scene
        })
        .addComponent(CubeControllerComponent, {
            keybindings: {
                down: 's',
                left: 'a',
                up: 'w',
                right: 'd',
            }
        })
        .addComponent(BoundingBoxComponent, {
            width: 10,
            height: 10,
        })
        .addComponent(BasicPhysicsMovementComponent, {
            position: new Vector3(20, 50, -10),
            friction: FRICTION
        })


    let floor = world.createEntity()
        .addComponent(Object3DComponent)
        .addComponent(MaterialComponent, {
            color: new Color(0.9, 0.9, 0.9)
        })
        .addComponent(GeometryComponent)
        .addComponent(TransformComponent, {
            position: new Vector3(0, 0, -10),
            scale: new Vector3(1000, 10, 10)
        })
        .addComponent(BoundingBoxComponent, {
            width: 1000,
            height: 10,
        })
        .addComponent(ParentComponent, {
            parentObject: scene
        })
        .addComponent(PlatformComponent)


    let platform1 = world.createEntity()
        .addComponent(Object3DComponent)
        .addComponent(MaterialComponent, {
            color: new Color(0.9, 0.9, 0.9)
        })
        .addComponent(GeometryComponent)
        .addComponent(TransformComponent, {
            position: new Vector3(100, 60, -10),
            scale: new Vector3(40, 10, 10)
        })
        .addComponent(BoundingBoxComponent, {
            width: 40,
            height: 10,
        })
        .addComponent(ParentComponent, {
            parentObject: scene
        })
        .addComponent(PlatformComponent)



    for(let i = 0; i < 300; i++){
        let sparkle = world.createEntity()
            .addComponent(Object3DComponent)
            .addComponent(MaterialComponent, {
                color: new Color(Math.random(), 0.6, 0.6)
            })
            .addComponent(GeometryComponent,{
                geometry: Geometries.SPHERE
            })
            .addComponent(TransformComponent, {
                position: new Vector3((Math.random()) * 100 + 50, (Math.random()) * 100, Math.random() * 20 + -50),
                scale: new Vector3(2, 2, 2)
            })
            .addComponent(ParentComponent, {
                parentObject: scene
            })
            .addComponent(OrbitComponent)
            .addComponent(CubeControllerComponent, {
                keybindings: {
                    down: 's',
                    left: 'a',
                    up: 'w',
                    right: 'd',
                }
            })

    }



    return world;
}