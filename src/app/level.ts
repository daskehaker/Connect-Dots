import { ILevel, ILevelData } from './interfaces';

export class Level implements ILevel {
  levels:ILevelData[] = []

  constructor(objArr: any[]){
    objArr.forEach((value) => {
      this.levels.push(new LevelData(value));
    })
    // this.levels.push
  }
}

export class LevelData implements ILevelData {
  level_data: string[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
    //console.log(this.level_data)
  }
}
