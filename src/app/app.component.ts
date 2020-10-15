import { async } from '@angular/core/testing';
import { DotsArray } from './dotsArray';
import { ILevel, IDot, IDotContainer, IDotArray } from './interfaces';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Level } from './level';
import * as data from "./levels.json"
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('canvas', { static: true })

  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  circle: Path2D

  levels: ILevel
  levelDots: IDotArray
  currentLevel:number;
  dotsInLevel: number;
  nextDot: number;
  currentX: number;
  currentY: number;

  // startPosition = {x: 0, y: 0};
  // lineCoordinates = {x: 0, y: 0};
  isDrawStart : boolean;
  isPlaying = false;
  nextLevel = false;

  //private constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.clearCanvas();
    this.currentLevel=0;
  }

  initBackgroundImage(){
    var image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    }
    image.src = "../assets/background.jpg";
  }

  initParams() {
    this.levels = new Level(data.levels)
    this.levelDots = new DotsArray(this.levels.levels[this.currentLevel].level_data);
    this.isDrawStart = false;
    this.dotsInLevel = this.levelDots.count;
    this.nextDot = 0;
    this.setNextPoints();
  }

  setNextPoints(){
    this.currentX = this.levelDots.xArray[this.nextDot]*10
    this.currentY = this.levelDots.yArray[this.nextDot]*10
    if(this.nextDot == this.dotsInLevel && this.currentLevel!=3){
      this.nextLevel = true
    }
    else if (this.nextDot == this.dotsInLevel) console.log("Congradulations!!!")
    if(this.isPlaying) this.initCircle();
  }

  gameOver() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(200, 200, 300, 300);
    this.ctx.font = "1px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("GAME OVER", 200, 200);
  }

  clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    //this.ngZone.run(() => this.initBackgroundImage());
    this.initBackgroundImage();
  }

  async next() {
    this.currentLevel++;
    this.clearCanvas();
    setTimeout(() => {this.play()}, 300);
  }

  play() {
    this.initParams()
    this.nextLevel = false
    this.isPlaying = true;
    this.initCircle();
    this.draw();
  }

  quit() {
    this.clearCanvas()
    this.currentLevel = 0;
    this.isPlaying=false;
  }

  initCircle(){
    this.circle = new Path2D();
    this.circle.arc(this.currentX, this.currentY, 10, 0, 2 * Math.PI);
  }

  setDotImage(x: number, y:number, imgName: string){
    var image = new Image();
    image.src = "../assets/" + imgName;
    image.onload = () => {this.ctx.drawImage(image, x-10, y-10);}
  }

  setColor(color: string) {
    this.ctx.fillStyle = color
  }

  draw() {
    this.ctx.fill(this.circle);
    this.ctx.fillText((this.nextDot+1).toString(), this.currentX, this.currentY+30)
    this.setDotImage(this.currentX, this.currentY, "button_magenta.png")
    for (let i = 1; i<this.levelDots.xArray.length; i++)
    {
      this.setDotImage(this.levelDots.xArray[i]*10, this.levelDots.yArray[i]*10, "button_magenta.png")
      this.ctx.fillText((i+1).toString(), this.levelDots.xArray[i]*10, this.levelDots.yArray[i]*10+30)
    }
  }

  mouseDownListener(event) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top

    if (this.ctx.isPointInPath(this.circle, x, y)) {

      this.setDotImage(this.currentX, this.currentY, "button_blue.png")
      this.nextDot++;
      this.setNextPoints();

      if(!this.isDrawStart){
        this.startLine(x, y)
      }
      else {
        this.endLine(x, y)
      }

    }
  }

  startLine(x, y){
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.isDrawStart = !this.isDrawStart;
  }

  endLine(x, y){
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
