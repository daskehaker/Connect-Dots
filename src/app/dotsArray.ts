import { Dot } from './dot';
import { IDot, IDotArray } from './interfaces';

export class DotsArray implements IDotArray{
  xArray: number[] = []
  yArray: number[] = []
  count: number;


  constructor(coord: string[]){
    this.convertCoordinates(coord)
  }

  convertCoordinates(coord: string[]) {
    let dotsArray = coord.map(Number);
    this.count = Math.floor(dotsArray.length/2);
    dotsArray.forEach((value, index) => {
      if(index % 2 == 0) {this.xArray.push(value)}
      else {this.yArray.push(value)}
    });
  }

}
