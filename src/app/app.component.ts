import { async } from '@angular/core/testing';
import { DotsArray } from './dotsArray';
import { ILevel, IDot, IDotContainer, IDotArray } from './interfaces';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Level } from './level';
import * as data from "./levels.json"

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
  currentDots: IDotArray
  currentLevel = 0;
  currentDot = 0;
  currentX = 0;
  currentY = 0;

  startPosition = {x: 0, y: 0};
  lineCoordinates = {x: 0, y: 0};
  isDrawStart = false;
  isPlaying = false;
  nextLevel = false;

  //private constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    //this.ctx2 = this.background.nativeElement.getContext('2d');
    this.clearCanvas();
    //this.initBackgroundImage();
    //this.next();
  }

  initBackgroundImage(){
    var image = new Image();
    image.src = "../assets/background.jpg";
    image.onload = () => {
        this.ctx.drawImage(image, 0, 0);
      }
    // return await new Promise ((resolve, reject) => {
    //   image.onload = async () => {
    //     this.ctx.drawImage(image, 0, 0);
    //     resolve(true)
    //   }
    // })
  }

  initParams() {
    this.levels = new Level(data.levels)
    this.currentDots = new DotsArray(this.levels.levels[this.currentLevel].level_data);
    this.startPosition = {x: 0, y: 0};
    this.lineCoordinates = {x: 0, y: 0};
    this.setCurrentPoints();
  }

  setCurrentPoints(){
    this.currentX = this.currentDots.xArray[this.currentDot]*10
    this.currentY = this.currentDots.yArray[this.currentDot]*10
    if(!this.currentX) this.nextLevel = true;
    if(this.isPlaying) this.initCircle();
  }

  clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    //this.ngZone.run(() => this.initBackgroundImage());
    this.initBackgroundImage();
  }

  next() {
    this.currentLevel++
    // var Zone
    // this.ngZone.run(() => this.clearCanvas())
    // Zone.AfterTask = () => { this.play();}

    // console.log("labas")
    // this.pl
    () => {
      this.clearCanvas();
      this.play();
    }
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
    this.ctx.fillText((this.currentDot+1).toString(), this.currentX, this.currentY+30)
    this.setDotImage(this.currentX, this.currentY, "button_magenta.png")
    for (let i = 1; i<this.currentDots.xArray.length; i++)
    {
      // let crk = new Path2D();
      // crk.arc(this.currentDots.xArray[i]*10,
      //    this.currentDots.yArray[i]*10, 10, 0, 2 * Math.PI)
      // this.ctx.fill(crk);
      this.setDotImage(this.currentDots.xArray[i]*10, this.currentDots.yArray[i]*10, "button_magenta.png")
      this.ctx.fillText((i+1).toString(), this.currentDots.xArray[i]*10, this.currentDots.yArray[i]*10+30)
    }
  }

  mouseDownListener(event) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top

    if (this.ctx.isPointInPath(this.circle, x, y)) {

      this.setDotImage(this.currentX, this.currentY, "button_blue.png")

      this.currentDot++;
      this.setCurrentPoints();
      this.startPosition.x = x;
      this.startPosition.y= y;
      this.isDrawStart = true;
      this.ctx.stroke();
    }
  }

  mouseMoveListener(event) {
    if(!this.isDrawStart) return;

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    this.lineCoordinates.x = x
    this.lineCoordinates.y = y
    this.drawLine();
  }

  drawLine() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPosition.x, this.startPosition.y);
    this.ctx.lineTo(this.lineCoordinates.x, this.lineCoordinates.y);
 }
}
