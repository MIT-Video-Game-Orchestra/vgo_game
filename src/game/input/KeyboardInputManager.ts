import {Simulate} from "react-dom/test-utils";
import keyDown = Simulate.keyDown;

export class KeyboardInputManager {

    keydowns: Map<string, () => any>;
    keyups: Map<string, () => any>;


    constructor(){
        document.addEventListener('keydown', (e) => {
            this.onKeyDown(e);
        });

        document.addEventListener('keyup', (e) => {
            this.onKeyUp(e);
        })
    }

    onKeyDown(e: KeyboardEvent){
        console.log(e);
    }

    onKeyUp(e: KeyboardEvent){
        console.log(e);
    }

    registerKeyDown( key: string, f: () => any){
        this.keydowns.set(key, f);
    }
    registerKeyUp( key: string, f: () => any){
        this.keyups.set(key, f);
    }




}