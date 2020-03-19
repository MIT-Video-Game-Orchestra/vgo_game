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

export class CubeControllerSystem extends System{



    objectIdMap = new Map<string, Object3D>();

    execute(delta: number, time: number): void {



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