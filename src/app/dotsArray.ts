import { Dot } from './dot';
import { IDot, IDotArray } from './interfaces';

export class DotsArray implements IDotArray{
  xArray: number[] = []
  yArray: number[] = []

  constructor(coord: string[]){
    this.convertCoordinates(coord)
  }

  convertCoordinates(coord: string[]) {
    let dotsArray = coord.map(Number);
    console.log(dotsArray.length)
    dotsArray.forEach((value, index) => {
      if(index % 2 == 0) {this.xArray.push(value)}
      else {this.yArray.push(value)}
    });
    console.log("x : " + this.xArray)
    console.log("y : " + this.yArray)
  }

}
