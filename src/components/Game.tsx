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

        if(gameEntry){
            gameEntry.dispose();
        }

        let newGameEntry = new GameEntry();

        let canvas = canvasRef.current;
        newGameEntry.init(canvas, props.worldFunction);
        setGameEntry(newGameEntry);

        return () => { //onDestroy
            gameEntry.dispose();
        }
    }, [props.worldFunction]); //runs on init only

    return (
        <canvas ref={canvasRef} id="game-container" className="full-screen-game"/>
    )
}