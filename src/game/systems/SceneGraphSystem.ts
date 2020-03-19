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

export class SceneGraphSystem extends System{


    scene = new Scene();

    static CANVAS: HTMLCanvasElement;

    //TODO: extract these out into their own systems
    camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer: WebGLRenderer;
    init(){
        this.renderer = new WebGLRenderer({
            canvas: SceneGraphSystem.CANVAS, //HACK: remove later
            antialias: true
        });
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.camera.position.z = 5;
    }

    objectIdMap = new Map<string, Object3D>();

    execute(delta: number, time: number): void {
        let meshesQuery = this.queries.meshes;

        meshesQuery.added.forEach(entity => {
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

            this.objectIdMap.set(id, object3d);
            this.scene.add(object3d);
        });

        meshesQuery.removed.forEach(entity => {
            let object3dComponent = entity.getComponent(Object3DComponent);
            let id = object3dComponent.id;
            let object3d = this.objectIdMap.get(id);
            this.objectIdMap.delete(id);
            this.scene.remove(object3d);
        });

        //TODO: separate
        this.renderer.render(this.scene, this.camera);


    }

    static queries = {
        meshes: {
            components: [Object3DComponent, GeometryComponent, MaterialComponent, TransformComponent],
            listen: {
                added: true,
                removed: true,
            }
        },
    }

}