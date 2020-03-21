import {System} from "ecsy";
import {CubeControllerComponent} from "../components/CubeControllerComponent";
import {HPComponent} from "../components/HPComponent";
import {MaterialComponent} from "../components/MaterialComponent";

export class PlayerHealthSystem extends System{

    execute(delta: number, time: number): void {

        this.queries.hp.results.forEach(playerEntity => {

            let hp = playerEntity.getComponent(HPComponent);

            if(hp.currentHP <= 0){
                playerEntity.remove();
            }else{
                let material = playerEntity.getMutableComponent(MaterialComponent);
                let hpPercent = hp.currentHP/hp.maxHP;
                material.opacity = hpPercent;
            }

        })
    }

    static queries = {
        hp: {
            components: [HPComponent, CubeControllerComponent, MaterialComponent],
        }
    }

}