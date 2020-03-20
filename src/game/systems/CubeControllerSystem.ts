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
import {BasicPhysicsMovementComponent} from "../components/BasicPhysicsMovementComponent";

export class CubeControllerSystem extends System{

    execute(delta: number, time: number): void {

        this.queries.controlled.added.forEach(entity => {


            let keyboardInputManager = new KeyboardInputManager();
            let cubeControllerComponent = entity.getComponent(CubeControllerComponent);
            let impulseForce = 40;

            keyboardInputManager.registerKeyDown(cubeControllerComponent.keybindings.right, () => {
                let movementComponent = entity.getMutableComponent(BasicPhysicsMovementComponent);
                movementComponent.velocity.x = impulseForce
            });

            keyboardInputManager.registerKeyDown(cubeControllerComponent.keybindings.up, () => {
                let movementComponent = entity.getMutableComponent(BasicPhysicsMovementComponent);
                movementComponent.velocity.y = impulseForce;
            });

            keyboardInputManager.registerKeyDown(cubeControllerComponent.keybindings.down, () => {
                let movementComponent = entity.getMutableComponent(BasicPhysicsMovementComponent);
                // movementComponent.velocity.y = impulseForce;
            });

            keyboardInputManager.registerKeyDown(cubeControllerComponent.keybindings.left, () => {
                let movementComponent = entity.getMutableComponent(BasicPhysicsMovementComponent);
                movementComponent.velocity.x = -impulseForce;
            });
        });
    }

    static queries = {
        controlled: {
            components: [CubeControllerComponent, BasicPhysicsMovementComponent],
            listen: {
                added: true,
                removed: true,
            }
        },
    }

}