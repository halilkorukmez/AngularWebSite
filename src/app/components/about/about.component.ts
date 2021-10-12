import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/models/about';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  about:About[] =[];
  constructor(private aboutService:AboutService) { }

  ngOnInit(): void {
    this.getAbout();
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44307/${serverPath}`;
  }
  getAbout() {
    this.aboutService.getAbout().subscribe(response => {
      this.about = response
    })
  }


}
