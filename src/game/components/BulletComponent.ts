import {Component} from "ecsy";

export class BulletComponent extends Component{

    damage: number;
    lifeTime: number;

    timeActive: number = 0;

    reset(){
        this.damage = 0;
        this.lifeTime = 0;
        this.timeActive = 0;
    }
}