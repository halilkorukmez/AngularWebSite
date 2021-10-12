import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/models/slider';
import { SliderService } from 'src/app/services/slider.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {

  slider:Slider[] =[];
  constructor(private sliderService:SliderService) { }

  ngOnInit(): void {
    this.getSlider();
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44307/${serverPath}`;
  }
  getSlider() {
    this.sliderService.getSlider().subscribe(response => {
      this.slider = response
    })
  }

  
}
