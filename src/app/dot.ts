import { IDot } from './interfaces';

export class Dot implements IDot {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
