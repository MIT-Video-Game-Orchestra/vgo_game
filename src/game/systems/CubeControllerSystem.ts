import {Entity, System} from "ecsy";
import {Object3DComponent} from "../components/Object3DComponent";
import {Geometries, GeometryComponent} from "../components/GeometryComponent";
import {TransformComponent} from "../components/TransformComponent";
import {MaterialComponent} from "../components/MaterialComponent";
import {
    BoxBufferGeometry,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    PerspectiveCamera,
    Scene,
    SphereBufferGeometry, WebGLRenderer
} from "three";
import {CubeControllerComponent} from "../components/CubeControllerComponent";
import {KeyboardInputManager} from "../input/KeyboardInputManager";

export class CubeControllerSystem extends System{

    private inputManager: KeyboardInputManager = new KeyboardInputManager();

    execute(delta: number, time: number): void {

        this.queries.controlled.added.forEach(entity => {


            let keyboardInputManager = new KeyboardInputManager();


            let cubeControllerComponent = entity.getComponent(CubeControllerComponent);


            let velocity = 0.04;

            keyboardInputManager.registerKeyDown(cubeControllerComponent.keybindings.right, () => {
                let transformComponent = entity.getMutableComponent(TransformComponent);
                transformComponent.position.x += delta * velocity;
            });

            keyboardInputManager.registerKeyDown(cubeControllerComponent.keybindings.up, () => {
                let transformComponent = entity.getMutableComponent(TransformComponent);
                transformComponent.position.y += delta * velocity;
            });

            keyboardInputManager.registerKeyDown(cubeControllerComponent.keybindings.down, () => {
                let transformComponent = entity.getMutableComponent(TransformComponent);
                transformComponent.position.y -= delta * velocity;
            });

            keyboardInputManager.registerKeyDown(cubeControllerComponent.keybindings.left, () => {
                let transformComponent = entity.getMutableComponent(TransformComponent);
                transformComponent.position.x -= delta * velocity;
            });
        });
    }

    static queries = {
        controlled: {
            components: [CubeControllerComponent, TransformComponent],
            listen: {
                added: true,
                removed: true,
            }
        },
    }

}