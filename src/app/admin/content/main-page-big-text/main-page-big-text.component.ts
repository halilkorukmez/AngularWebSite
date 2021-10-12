import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BigText } from 'src/app/models/bigText';
import { BigTextService } from 'src/app/services/big-text.service';

@Component({
  selector: 'app-main-page-big-text',
  templateUrl: './main-page-big-text.component.html',
  styleUrls: ['./main-page-big-text.component.css']
})
export class MainPageBigTextComponent implements OnInit {
  bigTextAdd:FormGroup;
  constructor(private formBuilder: FormBuilder,
    private bigTextService: BigTextService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
   this.bigTextAddForm();
   this.bigTextDeleteForm();
   this.getBigText();
  }
  bigTextAddForm() {
    this.bigTextAdd = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required]
    })
 
  }

  bigTextDelete:FormGroup;
  bigTextDeleteForm() {
    this.bigTextDelete = this.formBuilder.group({
      id:[""],
      titleBack: ["" ],
      contentBack: [""],
      isActive:[false] 
    })
 
  }
  bigText:BigText[] =[];
  getBigText() {
    this.bigTextService.getBigText().subscribe(response => {
      this.bigText = response
       for (let index = 0; index < this.bigText.length; index++) {
        this.bigTextDelete.controls["id"].setValue(this.bigText[index].id);
        this.bigTextDelete.controls["titleBack"].setValue(this.bigText[index].title);
        this.bigTextDelete.controls["contentBack"].setValue(this.bigText[index].content);
      }
    })
  }

  delete() {
    if (this.bigTextDelete.valid) {
      let bigTextModel = Object.assign({}, this.bigTextDelete.value)
      this.bigTextService.add(bigTextModel).subscribe(Response=>{
        this.toastrService.success("Başarılı")
        this.getBigText();

      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }

   add() {
    if (this.bigTextAdd.valid) {
      let bigTextModel = Object.assign({}, this.bigTextAdd.value)
      this.bigTextService.add(bigTextModel).subscribe(Response=>{
        this.toastrService.success("Başarılı")
        this.getBigText();

      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }
}
