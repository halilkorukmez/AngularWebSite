import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  categoryAddForm:FormGroup;
  constructor(private formBuilder: FormBuilder,
    private categoryService:CategoryService,
    private toastrService:ToastrService
    ) { }

  createCategoryAddForm() {
    this.categoryAddForm = this.formBuilder.group({
      categoryName: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.createCategoryAddForm();
    this.categoryDeleteForm();
    this.getCategories();
  }
  categoryDelete:FormGroup;
  categoryDeleteForm() {
    this.categoryDelete = this.formBuilder.group({
      id:[""],
      categoryName: ["" ],
      isActive:[false] 
    })
 
  }
  category:Category[] =[];
  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.category = response
      for (let index = 0; index < this.category.length; index++) {
        this.categoryDelete.controls["id"].setValue(this.category[index].id);
        this.categoryDelete.controls["categoryName"].setValue(this.category[index].categoryName);
      }
    })
    
  }

  delete() {
    if (this.categoryDelete.valid) {
      let category = Object.assign({}, this.categoryDelete.value)
      this.categoryService.add(category).subscribe(Response=>{
        this.toastrService.success("Başarılı")
        this.getCategories();
      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }
  



  add() {
    if (this.categoryAddForm.valid) {
      let categoryModel = Object.assign({}, this.categoryAddForm.value)
      this.categoryService.add(categoryModel).subscribe(response=>{
        this.toastrService.success("Başarılı")
        this.getCategories();
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Doğrulama hatası")
          }       
        } 
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }

    }

}
