import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SubImages } from 'src/app/models/subImages';
import { SubImagesService } from 'src/app/services/sub-images.service';

@Component({
  selector: 'app-main-page-sub-images',
  templateUrl: './main-page-sub-images.component.html',
  styleUrls: ['./main-page-sub-images.component.css']
})
export class MainPageSubImagesComponent implements OnInit {
  selectedFile: File;
  public response: { dbPath: '' };

  public uploadFinished = (event) => {
    this.response = event;
    this.subImagesAdd.patchValue({
      ImgPath: this.response.dbPath
    });
  }
  subImagesAdd = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content: new FormControl('', [Validators.required]),
    ImgPath: new FormControl('', [Validators.required])
  });
  constructor(private formBuilder: FormBuilder,
    private subImagesService: SubImagesService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.subDeleteForm();
    this.getSubImages();
  }

  get f() {
    return this.subImagesAdd.controls;
  }
  subDelete:FormGroup;
  subDeleteForm() {
    this.subDelete = this.formBuilder.group({
      id:[""],
      titleBack: ["" ],
      contentBack: [""],
      isActive:[false] 
    })
 
  }
  sub:SubImages[] =[];
  getSubImages() {
    this.subImagesService.getSubImages().subscribe(response => {
      this.sub = response
      for (let index = 0; index < this.sub.length; index++) {
        this.subDelete.controls["id"].setValue(this.sub[index].id);
        this.subDelete.controls["titleBack"].setValue(this.sub[index].title);
        this.subDelete.controls["contentBack"].setValue(this.sub[index].content);
      }
    })
    
  }

  delete() {
    if (this.subDelete.valid) {
      let subModel = Object.assign({}, this.subDelete.value)
      this.subImagesService.add(subModel).subscribe(Response=>{
        this.toastrService.success("Başarılı")
        this.getSubImages();

      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }
  
  add() {
    if (this.subImagesAdd.valid) {
      let subImagesModel = Object.assign({}, this.subImagesAdd.value)
      this.subImagesService.add(subImagesModel).subscribe(Response => {
        this.toastrService.success("Başarılı")
        this.getSubImages();

      })
    }
    else {
      this.toastrService.error("Formunuz Eksik", "Dikkat")
    }
  }
}
