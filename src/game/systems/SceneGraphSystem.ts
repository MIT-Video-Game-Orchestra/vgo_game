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
    execute(delta: number, time: number): void {
        this.queries.uninstantiatedMeshes.added.forEach(entity => {


            //TODO: BUG sometimes entities are not alive, should that happen?
            //@ts-ignore
            if(!entity.alive){
                console.warn("WHY IS THIS HAPPENING", entity);
                return;
            }


            let object3dComponent = entity.getComponent(Object3DComponent);
            let id = object3dComponent.id;

            let geometryComponent = entity.getComponent(GeometryComponent);
            let materialComponent = entity.getComponent(MaterialComponent);
            let transformComponent = entity.getComponent(TransformComponent);
            //TODO: share materials/geometry/etc
            let material = new MeshBasicMaterial({
                color: materialComponent.color,
                opacity: materialComponent.opacity,
                transparent: true
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
            entity.addComponent(SceneGraphObject3DComponent, {
                object3d: object3d
            });
        });

        this.queries.meshes.removed.forEach(entity => {
            let component = entity.getRemovedComponent(SceneGraphObject3DComponent);
            let object3d = component.object3d;
            if(object3d.parent){
                object3d.parent.remove(object3d);
            }
        });


        this.queries.meshesNeedToBeParented.added.forEach(entity => {
           let obj3d = entity.getComponent(SceneGraphObject3DComponent).object3d;
           let parentObject = entity.getComponent(ParentComponent).parentObject.getComponent(SceneGraphObject3DComponent);
           console.assert(parentObject, "parent object is null");

           parentObject.object3d.add(obj3d);
        });
        this.queries.materialChanged.changed.forEach(entity => {
            let obj3d = <Mesh> entity.getComponent(SceneGraphObject3DComponent).object3d;
            let mat = <MeshBasicMaterial> obj3d.material;
            mat.color.copy(entity.getComponent(MaterialComponent).color);
            mat.opacity = entity.getComponent(MaterialComponent).opacity;
        })

    }


    static queries = {
        uninstantiatedMeshes: {
            components: [Object3DComponent, GeometryComponent, MaterialComponent, TransformComponent],
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
        materialChanged: {
            components: [SceneGraphObject3DComponent, MaterialComponent],
            listen: {
                changed: [MaterialComponent],
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