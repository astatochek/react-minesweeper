import { createContext } from "react";

import { ClickInfoType } from "../Types/ClickContext";

export class ClickContextType {
    clickInfo: ClickInfoType = { id: 0, index: -1, type: "left" };
    setClickInfo: React.Dispatch<React.SetStateAction<ClickInfoType>> = () => {};
}

const ClickContext = createContext<ClickContextType>(new ClickContextType());

export default ClickContext;