export interface ILevel {
  levels: ILevelData[];
}

export interface ILevelData {
  level_data: string[];
}

export interface IDotContainer {
  dotsContainer: IDotArray[];
}

export interface IDotArray {
  count: number;
  xArray: number[]
  yArray: number[]
}

export interface IDot {
  x: number;
  y: number;
}
