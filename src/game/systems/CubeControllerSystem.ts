import {Entity, System} from "ecsy";
import {Object3DComponent} from "../components/Object3DComponent";
import {Geometries, GeometryComponent} from "../components/GeometryComponent";
import {TransformComponent} from "../components/TransformComponent";
import {MaterialComponent} from "../components/MaterialComponent";
import {
    BoxBufferGeometry, Color,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    PerspectiveCamera,
    Scene,
    SphereBufferGeometry, Vector3, WebGLRenderer
} from "three";
import {CubeControllerComponent} from "../components/CubeControllerComponent";
import {KeyboardInputManager} from "../input/KeyboardInputManager";
import {BasicPhysicsMovementComponent} from "../components/BasicPhysicsMovementComponent";
import {ParentComponent} from "../components/ParentComponent";
import {BoundingBoxComponent} from "../components/BoundingBoxComponent";
import {CollisionComponent} from "../components/CollisionComponent";
import {BulletComponent} from "../components/BulletComponent";

export class CubeControllerSystem extends System{


    _inputManagerMap = new Map<Entity, KeyboardInputManager>();


    execute(delta: number, time: number): void {

        this.queries.controlled.added.forEach(entity => {

            let keyboardInputManager = new KeyboardInputManager();
            this._inputManagerMap.set(entity, keyboardInputManager);

            let cubeControllerComponent = entity.getComponent(CubeControllerComponent);
            let impulseForce = 40;

            keyboardInputManager.registerKeyDown(cubeControllerComponent.keybindings.up, () => {
                let movementComponent = entity.getMutableComponent(BasicPhysicsMovementComponent);
                movementComponent.velocity.y = impulseForce;
            });

            keyboardInputManager.registerKeyDown(cubeControllerComponent.keybindings.fire, () => {

                console.log("CREATING ENTITY");

                let parent = entity.getComponent(ParentComponent);
                let transform = entity.getComponent(TransformComponent);

                let bulletDirection = [
                    [1, 1],
                    [-1, 1],
                ];

                bulletDirection.forEach(([x, y]) => {
                    this.world.createEntity()
                        .addComponent(Object3DComponent)
                        .addComponent(MaterialComponent, {
                            color: new Color(0.9, 0.4, 0.4)
                        })
                        .addComponent(GeometryComponent)
                        .addComponent(TransformComponent, {
                            scale: new Vector3(2, 2, 2)
                        })
                        .addComponent(ParentComponent, {
                            parentObject: parent.parentObject
                        })
                        .addComponent(BoundingBoxComponent, {
                            width: 2,
                            height: 2,
                        })
                        .addComponent(BulletComponent, {
                            damage: 10,
                            lifeTime: 2,
                            timeActive: 0
                        })
                        .addComponent(BasicPhysicsMovementComponent, {
                            position: new Vector3(transform.position.x + 10*x, transform.position.y + 10*y, transform.position.z),
                            velocity: new Vector3(x * 100, y * 100 , 0),
                            friction: 0.3
                        })
                        .addComponent(CollisionComponent)
                })
            });
        });

        this.queries.controlled.removed.forEach(entity => {
            let inputManager = this._inputManagerMap.get(entity);
            inputManager.destroy();
            this._inputManagerMap.delete(entity);
        });

        //Left/right movement
        this.queries.controlled.results.forEach(entity => {
            let cubeControllerComponent = entity.getComponent(CubeControllerComponent);
            let impulseForce = 40;

            if(KeyboardInputManager.isKeyPressed(cubeControllerComponent.keybindings.left)) {
                let movementComponent = entity.getMutableComponent(BasicPhysicsMovementComponent);
                movementComponent.velocity.x = -impulseForce;
            }
            if(KeyboardInputManager.isKeyPressed(cubeControllerComponent.keybindings.right)) {
                let movementComponent = entity.getMutableComponent(BasicPhysicsMovementComponent);
                movementComponent.velocity.x = impulseForce;
            };
        });
    }

    static queries = {
        controlled: {
            components: [CubeControllerComponent, TransformComponent, BasicPhysicsMovementComponent, ParentComponent],
            listen: {
                added: true,
                removed: true,
            }
        },
    }
}