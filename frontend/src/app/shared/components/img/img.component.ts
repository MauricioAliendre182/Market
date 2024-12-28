import { Component, OnInit, Input, Output, EventEmitter, OnChanges,SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy{
  img = 'value init';

  @Input("img")
  set changeImg(newImg: string){
    this.img = newImg;
    //code
    console.log('Change just img', this.img)
  }

  @Input() alt= ""
  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'https://www.sam-manipulados.com/wp-content/uploads/2014/01/default_image_01.png';
  // counter = 0;
  // counterFn: number | undefined;

  constructor(){
    // before render
    // async NOT ALLLOWED - run once
    console.log('constructor', 'imgValue =>', this.img)
  }
  ngOnDestroy() {
    // Delete a component (stop viewing the component)
    console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }
  ngAfterViewInit() {
    // after render
    // children handler
    console.log('ngAfterViewInit');
  }
  ngOnChanges(changes: SimpleChanges) {
    // before and during render
    // Changes in the inputs - run many times
    console.log('ngOnChanges', 'imgValue =>', this.img)
    console.log('changes', changes)
  }
  ngOnInit(): void {
    // before render
    // async ALLOWED - fetch - run once
    console.log('ngOnInit', 'imgValue =>', this.img)
    // this.counterFn = window.setInterval(()=>{
    //   this.counter += 1;
    //   console.log('run counter')
    // }, 1000);
  }

  imgError() {
    this.img = this.imageDefault
  }

  imgLoaded() {
    console.log('child log')
    this.loaded.emit(this.img);
  }
}
