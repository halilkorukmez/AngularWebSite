import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Slider } from 'src/app/models/slider';
import { SliderService } from 'src/app/services/slider.service';

@Component({
  selector: 'app-slider-content',
  templateUrl: './slider-content.component.html',
  styleUrls: ['./slider-content.component.css']
})
export class SliderContentComponent implements OnInit {

  sliderAdd:FormGroup;
  constructor(private formBuilder: FormBuilder,
    private sliderService: SliderService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
   this.sliderAddForm();
   this.getSlider();
   this.sliderDeleteForm();
  }
  sliderAddForm() {
    this.sliderAdd = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      fileUrl: ["", Validators.required]
    })
 
  }

  sliderDelete:FormGroup;
  sliderDeleteForm() {
    this.sliderDelete = this.formBuilder.group({
      id:[""],
      titleBack: ["" ],
      contentBack: [""],
      isActive:[false] 
    })
 
  }
  slider:Slider[] =[];
  getSlider() {
    this.sliderService.getSlider().subscribe(response => {
      this.slider = response
      for (let index = 0; index < this.slider.length; index++) {
        this.sliderDelete.controls["id"].setValue(this.slider[index].id);
        this.sliderDelete.controls["titleBack"].setValue(this.slider[index].title);
        this.sliderDelete.controls["contentBack"].setValue(this.slider[index].content);
      }
    })
    
  }

  delete() {
    if (this.sliderDelete.valid) {
      let subModel = Object.assign({}, this.sliderDelete.value)
      this.sliderService.add(subModel).subscribe(Response=>{
        this.toastrService.success("Başarılı")
        this.getSlider();

      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }
  

  selectedFile: File;
  public response: { dbPath: '' };

  public uploadFinished = (event) => {
    this.response = event;
    this.sliderAdd.patchValue({
      fileUrl: this.response.dbPath
    });
  }

   add() {
    if (this.sliderAdd.valid) {
      let sliderModel = Object.assign({}, this.sliderAdd.value)
      this.sliderService.add(sliderModel).subscribe(Response=>{
        this.toastrService.success("Başarılı")
        this.getSlider();

      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }

}
