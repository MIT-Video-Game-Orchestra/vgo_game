import {Scene} from "three";
import {Entity} from "ecsy";

export class RenderPassComponent {
    scene: Entity;
    camera: Entity;
    constructor() {
        this.scene = null;
        this.camera = null;
    }

    reset() {
        this.scene = null;
        this.camera = null;
    }
}