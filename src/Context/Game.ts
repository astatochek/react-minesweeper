import { createContext } from "react";
import { GameType } from "../Types/Game";

export class GameContextType {
    gameMode: GameType = { mode: "default", emoji: "active", flags: 0 };
    setGameMode: React.Dispatch<React.SetStateAction<GameType>> = () => {};
}

const GameContext = createContext<GameContextType>(new GameContextType());

export default GameContext;