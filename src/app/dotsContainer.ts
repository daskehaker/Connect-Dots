import { Dot } from './dot';
import { IDotContainer, IDotArray } from './interfaces';

export class DotsContainer implements IDotContainer {
  dotsContainer: IDotArray[]

  constructor(private ctx: CanvasRenderingContext2D) {}

  addArray(arr: IDotArray){
    this.dotsContainer.push(arr);
  }

  draw(x: number, y: number) {
    this.ctx.fillRect(x*10, 10 * y, 10, 10);
    console.log("Coordinatess");
    console.log("x: " + x + " y: " +y)
  }
}
