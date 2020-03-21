import {Entity} from "ecsy";

export class CollisionComponent{
    collideEntities: Entity[] = [];

    reset(){
        this.collideEntities.length = 0;
    }
}