import { System, Not } from "ecsy";
import {RendererComponent} from "../components/RendererComponent";
import {WebGLRenderer} from "three";
import {CameraComponent} from "../components/CameraComponent";
import {ActiveComponent} from "../components/ActiveComponent";
import {SceneGraphObject3DComponent} from "./SceneGraphSystem";
import {SceneGraphSceneComponent} from "./SceneSystem";
import {SceneGraphCameraComponent} from "./CameraSystem";
import {RenderPassComponent} from "../components/RenderPassComponent";


export class WebGLRendererContextComponent {
  value: WebGLRenderer;
  constructor() {
    this.value = null;
  }
  reset() {
    this.value = null;
  }
}

export class WebGLRendererSystem extends System {

  static CANVAS: HTMLCanvasElement


  init() {
    window.addEventListener(
      "resize",
      () => {
        this.queries.renderers.results.forEach(entity => {
          let component = entity.getMutableComponent(RendererComponent);
          component.width = window.innerWidth;
          component.height = window.innerHeight;
        });
      },
      false
    );
  }

  execute() {

    let renderers = this.queries.renderers.results;
    renderers.forEach(rendererEntity => {
      let renderer = rendererEntity.getComponent(WebGLRendererContextComponent).value;
      this.queries.renderPasses.results.forEach(entity => {
        let pass = entity.getComponent(RenderPassComponent);


        let scene = pass.scene.getComponent(SceneGraphSceneComponent).scene;

        if(scene){
            this.queries.activeCameras.results.forEach(cameraEntity => {
                let camera = cameraEntity.getComponent(SceneGraphCameraComponent).camera;
                renderer.render(scene, camera);
            });
        }
      });
    });

    // Uninitialized renderers
    this.queries.uninitializedRenderers.results.forEach(entity => {
      let component = entity.getComponent(RendererComponent);

      let renderer = new WebGLRenderer({
        antialias: component.antialias,
        canvas: WebGLRendererSystem.CANVAS
      });

      // if (component.animationLoop) {
      //   renderer.setAnimationLoop(component.animationLoop);
      // }
      //
      // renderer.setPixelRatio(window.devicePixelRatio);


      if (component.handleResize) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      // renderer.shadowMap.enabled = component.shadowMap;

      entity.addComponent(WebGLRendererContextComponent, { value: renderer });
    });

    this.queries.renderers.changed.forEach(entity => {
      let component = entity.getComponent(RendererComponent);
      let renderer = entity.getComponent(WebGLRendererContextComponent).value;
      renderer.setSize(component.width, component.height);
    });
  }
}

WebGLRendererSystem.queries = {
  uninitializedRenderers: {
    components: [RendererComponent, Not(WebGLRendererContextComponent)]
  },
  renderers: {
    components: [RendererComponent, WebGLRendererContextComponent],
    listen: {
      changed: [RendererComponent]
    }
  },
  renderPasses: {
    components: [RenderPassComponent]
  },
  activeCameras: {
    components: [CameraComponent, ActiveComponent],
    listen: {
      added: true
    }
  }
};
