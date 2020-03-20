import {Component, Entity, Not, System} from "ecsy";
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
import {ParentComponent} from "../components/ParentComponent";

export class SceneGraphObject3DComponent extends Component{

    object3d: Object3D;


    reset(){
        this.object3d = null;
    }

}


export class SceneGraphSystem extends System{

    static CANVAS: HTMLCanvasElement;


    execute(delta: number, time: number): void {
        this.queries.uninstantiatedMeshes.added.forEach(entity => {
            let object3dComponent = entity.getComponent(Object3DComponent);
            let id = object3dComponent.id;

            let geometryComponent = entity.getComponent(GeometryComponent);
            let materialComponent = entity.getComponent(MaterialComponent);
            let transformComponent = entity.getComponent(TransformComponent);
            //TODO: share materials/geometry/etc
            let material = new MeshBasicMaterial({
                color: materialComponent.color
            });
            //

            let geometry;
            switch (geometryComponent.geometry) {
                case Geometries.CUBE:
                    geometry =  new BoxBufferGeometry();
                    break;
                default:
                    geometry = new SphereBufferGeometry();
            }

            let object3d = new Mesh(geometry, material);

            object3d.position.copy(transformComponent.position);
            object3d.rotation.copy(transformComponent.rotation);
            object3d.scale.copy(transformComponent.scale);

            entity.addComponent(SceneGraphObject3DComponent, {
                object3d: object3d
            });
        });

        this.queries.meshes.removed.forEach(entity => {
            let object3dComponent = entity.getComponent(SceneGraphObject3DComponent).object3d;
        });


        this.queries.meshesNeedToBeParented.added.forEach(entity => {
           let obj3d = entity.getComponent(SceneGraphObject3DComponent).object3d;
           let parentObject = entity.getComponent(ParentComponent).parentObject.getComponent(SceneGraphObject3DComponent);
           console.assert(parentObject, "parent object is null");

           parentObject.object3d.add(obj3d);
        });

    }


    static queries = {
        uninstantiatedMeshes: {
            components: [Object3DComponent, Not(SceneGraphObject3DComponent), GeometryComponent, MaterialComponent, TransformComponent],
            listen: {
                added: true,
                removed: true,
            }
        },

        meshesNeedToBeParented: {
            components: [Object3DComponent, SceneGraphObject3DComponent, ParentComponent],
            listen: {
                added: true,
                removed: true
            }
        },
        meshes: {
            components: [Object3DComponent, SceneGraphObject3DComponent, GeometryComponent, MaterialComponent, TransformComponent],
            listen: {
                removed: true,
            }
        },
    }

}