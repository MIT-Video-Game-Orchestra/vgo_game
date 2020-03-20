import * as React from "react";
import {createRef, useEffect, useState} from "react";
import {GameEntry} from "../game/GameEntry";
import {CubeWorld} from "../game/worlds/CubeWorld";
import {WorldDirectory} from "../game/worlds/WorldDirectory";
import {World} from "ecsy";

export interface GameProps {
    worldFunction: () => World
}

export function Game(props: GameProps) {
    let canvasRef = createRef<HTMLCanvasElement>();
    let [gameEntry, setGameEntry] = useState<GameEntry>(() => {
        return new GameEntry();
    });

    useEffect(() => {
        let canvas = canvasRef.current;
        gameEntry.init(canvas, props.worldFunction);

        return () => { //onDestroy
            gameEntry.dispose();
        }
    }, []); //runs on init only

    return (
        <canvas ref={canvasRef} id="game-container" className="full-screen-game"/>
    )
}