import * as React from "react";
import {createRef, useEffect, useState} from "react";
import {GameEntry} from "../game/GameEntry";

export function Game() {
    let canvasRef = createRef<HTMLCanvasElement>();
    let [gameEntry, setGameEntry] = useState<GameEntry>(() => {
        return new GameEntry();
    });

    useEffect(() => {

        let canvas = canvasRef.current;

        gameEntry.init(canvas);

        return () => { //onDestroy
            gameEntry.dispose();
        }
    }, []); //runs on init only

    return (
        <canvas ref={canvasRef} id="game-container" className="full-screen-game"/>
    )
}