import {Simulate} from "react-dom/test-utils";
import keyDown = Simulate.keyDown;

export class KeyboardInputManager {
    static pressedKeys: Set<string> = new Set();
    keydowns: Map<string, () => any> = new Map();
    keyups: Map<string, () => any> = new Map();

    static isKeyPressed(key: string){
        return this.pressedKeys.has(key);
    }

    private _keydownCallback = (e) => {
        this.onKeyDown(e);
    };
    private _keyupCallback = (e) => {
        this.onKeyUp(e);
    };

    constructor(){
        document.addEventListener('keydown', this._keydownCallback);
        document.addEventListener('keyup', this._keyupCallback)
    }

    onKeyDown(e: KeyboardEvent){
        let f = this.keydowns.get(e.key);
        if(f){
            if(!e.repeat){
                f();
            }
        }
    }

    onKeyUp(e: KeyboardEvent){
        let f = this.keyups.get(e.key);
        if(f){
            f();
        }
    }

    registerKeyDown( key: string, f: () => any){
        this.keydowns.set(key, f);
    }
    registerKeyUp( key: string, f: () => any){
        this.keyups.set(key, f);
    }

    destroy(){
        document.removeEventListener('keydown', this._keydownCallback);
        document.removeEventListener('keyup', this._keyupCallback);
    }

}

document.addEventListener('keydown', (e) => {if(!e.repeat){
    KeyboardInputManager.pressedKeys.add(e.key);}
});
document.addEventListener('keyup', (e) => KeyboardInputManager.pressedKeys.delete(e.key));