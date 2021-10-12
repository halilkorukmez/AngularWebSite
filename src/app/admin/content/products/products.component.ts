import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {


  productAddForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
  });
  constructor(private formBuilder: FormBuilder,
    private categoryService:CategoryService,
    private productService: ProductService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.productDeleteForm();
    this.getProducts();
    this.getCategories();

  }

  selectedFile: File;
  public response: { dbPath: '' };

  public uploadFinished = (event) => {
    this.response = event;
    this.productAddForm.patchValue({
      file: this.response.dbPath
    });
  }
  productDelete: FormGroup;
  productDeleteForm() {
    this.productDelete = this.formBuilder.group({
      id: [""],
      code: [""],
      productName: [""],
      categoryId: [""],
      isActive: [false]
    })

  }
  product: Product[] = [];
  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.product = response
      for (let index = 0; index < this.product.length; index++) {
        this.productDelete.controls["id"].setValue(this.product[index].id);
        this.productDelete.controls["code"].setValue(this.product[index].code);
        this.productDelete.controls["productName"].setValue(this.product[index].productName);
        this.productDelete.controls["categoryId"].setValue(this.product[index].categoryId);
      }
    })

  }

  delete() {
    if (this.productDelete.valid) {
      let product = Object.assign({}, this.productDelete.value)
      this.productService.add(product).subscribe(Response => {
        this.toastrService.success("Başarılı")
        this.getProducts();
      })
    }
    else {
      this.toastrService.error("Formunuz Eksik", "Dikkat")
    }
  }


  changeCategory(e) {
    this.productAddForm.controls["categoryId"].setValue(e.target.value);
    
  }

  add() {

    let productModel = Object.assign({}, this.productAddForm.value)
    this.productService.add(productModel).subscribe(response => {
      this.toastrService.success("Başarılı")
      this.getProducts();
    }, responseError => {
      if (responseError.error.Errors.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage
            , "Doğrulama hatası")
        }
      }
    })
  }

  category:Category[] =[];
  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.category = response
    })
    
  }

}
