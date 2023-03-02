import { EmojiType } from "./Emoji";

export type GameType = { mode: "default" | "on" | "over", emoji: EmojiType, flags: number };