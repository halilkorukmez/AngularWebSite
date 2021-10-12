import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SmallText } from 'src/app/models/smallText';
import { SmallTextService } from 'src/app/services/small-text.service';

@Component({
  selector: 'app-main-page-small-text',
  templateUrl: './main-page-small-text.component.html',
  styleUrls: ['./main-page-small-text.component.css']
})
export class MainPageSmallTextComponent implements OnInit {

  smallTextAdd:FormGroup;

  constructor(private formBuilder: FormBuilder,
    private smallTextService: SmallTextService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
   this.smallTextAddForm();
   this.smallTextDeleteForm();
   this.getSmallText();
   

  }
  smallTextAddForm() {
    this.smallTextAdd = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required]
    })
  }
  smallTextDelete:FormGroup;
  smallTextDeleteForm() {
    this.smallTextDelete = this.formBuilder.group({
      id:[""],
      titleBack: ["" ],
      contentBack: [""],
      isActive:[false] 
    })
 
  }
  smallText:SmallText[] =[];
  getSmallText() {
    this.smallTextService.getSmallText().subscribe(response => {
      this.smallText = response
      for (let index = 0; index < this.smallText.length; index++) {
        this.smallTextDelete.controls["id"].setValue(this.smallText[index].id);
        this.smallTextDelete.controls["titleBack"].setValue(this.smallText[index].title);
        this.smallTextDelete.controls["contentBack"].setValue(this.smallText[index].content);
      }
    })
    
  }

  delete() {
    if (this.smallTextDelete.valid) {
      let smallTextModel = Object.assign({}, this.smallTextDelete.value)
      this.smallTextService.add(smallTextModel).subscribe(Response=>{
        this.toastrService.success("Başarılı")
        this.getSmallText();

      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }
  
   add() {
    if (this.smallTextAdd.valid) {
      let smallTextModel = Object.assign({}, this.smallTextAdd.value)
      this.smallTextService.add(smallTextModel).subscribe(Response=>{
        this.toastrService.success("Başarılı")
        this.getSmallText();

      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }





}
