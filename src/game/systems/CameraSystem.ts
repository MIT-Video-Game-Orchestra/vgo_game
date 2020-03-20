import {Camera, PerspectiveCamera, Scene} from "three";
import {Not, System} from "ecsy";
import {SceneComponent} from "../components/SceneComponent";
import {CameraComponent} from "../components/CameraComponent";

export class SceneGraphCameraComponent{
    camera: PerspectiveCamera;
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


    execute(delta: number, time: number): void {
        this.queries.uninitializedScenes.added.forEach(entity => {
            let cameraComponent = entity.getComponent(CameraComponent);
            let camera = new PerspectiveCamera(cameraComponent.fov, cameraComponent.aspect, cameraComponent.near, cameraComponent.far);

            //hack
            camera.position.z = 10;

            entity.addComponent(SceneGraphCameraComponent, {camera: camera})
        });


        let changed = this.queries.cameras.changed;
        for (let i = 0; i < changed.length; i++) {
            let entity = changed[i];

            let component = entity.getComponent(CameraComponent);
            let camera3d = entity.getMutableComponent(SceneGraphCameraComponent).camera;
            camera3d.aspect = component.aspect;
            camera3d.updateProjectionMatrix();

            if (camera3d.aspect !== component.aspect) {
                camera3d.aspect = component.aspect;
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