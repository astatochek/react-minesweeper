import { CellType } from "./Cell";

export type FieldType = { type: CellType, hasMine: boolean, minesNear: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, closed: boolean }[]