import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { About } from 'src/app/models/about';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-abouts',
  templateUrl: './abouts.component.html',
  styleUrls: ['./abouts.component.css']
})
export class AboutsComponent implements OnInit {

  selectedFile: File;
  public response: { dbPath: '' };

  public uploadFinished = (event) => {
    this.response = event;
    this.aboutAdd.patchValue({
      image: this.response.dbPath
    });
  }
  aboutAdd = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  });
  constructor(private formBuilder: FormBuilder,
    private aboutService: AboutService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.aboutDeleteForm();
    this.getAbout();
  }

  get f() {
    return this.aboutAdd.controls;
  }
  aboutDelete:FormGroup;
  aboutDeleteForm() {
    this.aboutDelete = this.formBuilder.group({
      id:[""],
      title: ["" ],
      content: [""],
      isActive:[false] 
    })
 
  }
  about:About[] =[];
  getAbout() {
    this.aboutService.getAbout().subscribe(response => {
      this.about = response
      for (let index = 0; index < this.about.length; index++) {
        this.aboutDelete.controls["id"].setValue(this.about[index].id);
        this.aboutDelete.controls["title"].setValue(this.about[index].title);
        this.aboutDelete.controls["title"].setValue(this.about[index].content);
      }
    })
    
  }
 
  delete() {
    if (this.aboutDelete.valid) {
      let subModel = Object.assign({}, this.aboutDelete.value)
      this.aboutService.add(subModel).subscribe(Response=>{
        this.toastrService.success("Başarılı")
       
      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }
  
  add() {
    if (this.aboutAdd.valid) {
      let aboutModel = Object.assign({}, this.aboutAdd.value)
      this.aboutService.add(aboutModel).subscribe(Response => {
        this.toastrService.success("Başarılı")
      })
    }
    else {
      this.toastrService.error("Formunuz Eksik", "Dikkat")
    }
  }
}
