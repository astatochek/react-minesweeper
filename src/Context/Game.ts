import { createContext } from "react";
import { GameType } from "../Types/Game";

export class GameContextType {
    gameMode: GameType = { mode: "default", emoji: "active", flags: 0 };
    setGameMode: React.Dispatch<React.SetStateAction<GameType>> = function() {
        // will be overridden using useState hook
    };
}

const GameContext = createContext<GameContextType>(new GameContextType());

export default GameContext;