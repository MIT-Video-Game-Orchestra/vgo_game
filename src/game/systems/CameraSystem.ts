import {Camera, OrthographicCamera, PerspectiveCamera, Scene} from "three";
import {Not, System} from "ecsy";
import {SceneComponent} from "../components/SceneComponent";
import {CameraComponent} from "../components/CameraComponent";
import {SceneGraphObject3DComponent} from "./SceneGraphSystem";

export class SceneGraphCameraComponent{
    camera: Camera;
    reset(){
        this.camera = null;
    }
}


export class CameraSystem extends System{

    init(){
        window.addEventListener(
            "resize",
            () => {
                this.queries.cameras.results.forEach(camera => {
                    let component = camera.getComponent(CameraComponent);
                    if (component.handleResize) {
                        camera.getMutableComponent(CameraComponent).aspect =
                            window.innerWidth / window.innerHeight;
                    }
                });
            },
            false
        );
    }


    createCamera(cameraComponent: CameraComponent){
        if(cameraComponent.isOrthographic){
            return new OrthographicCamera(0, cameraComponent.worldHeight * cameraComponent.aspect, cameraComponent.worldHeight, 0, 0, 100);
        }else{
            return new PerspectiveCamera(cameraComponent.fov, cameraComponent.aspect, cameraComponent.near, cameraComponent.far);
        }
    }

    execute(delta: number, time: number): void {
        this.queries.uninitializedScenes.added.forEach(entity => {
            let cameraComponent = entity.getComponent(CameraComponent);
            let camera = this.createCamera(cameraComponent);
            entity.addComponent(SceneGraphCameraComponent, {camera: camera})
            entity.addComponent(SceneGraphObject3DComponent, {object3d: camera})
        });


        let changed = this.queries.cameras.changed;
        for (let i = 0; i < changed.length; i++) {
            let entity = changed[i];

            let component = entity.getComponent(CameraComponent);
            let camera3d = entity.getMutableComponent(SceneGraphCameraComponent).camera;

            if(camera3d instanceof PerspectiveCamera){
                if (camera3d.aspect !== component.aspect) {
                    camera3d.aspect = component.aspect;
                    camera3d.updateProjectionMatrix();
                }
            }
            else if(camera3d instanceof OrthographicCamera){
                camera3d.right = camera3d.bottom * component.aspect;
                camera3d.updateProjectionMatrix();
            }
            // @todo Do it for the rest of the values
        }

    }
}

CameraSystem.queries = {

    uninitializedScenes: {
        components: [CameraComponent, Not(SceneGraphCameraComponent)],
        listen: {
            added: true
        }
    },
    cameras: {
        components: [CameraComponent, SceneGraphCameraComponent],
        listen: {
            changed: [CameraComponent]
        }
    }
}