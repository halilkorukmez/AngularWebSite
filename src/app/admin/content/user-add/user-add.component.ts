import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

 
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
   this.UserAddForm();
   this.UserDeleteForm();
   this.getUser();
  } 
  UserAdd:FormGroup;
  UserAddForm() {
    this.UserAdd = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
 
  }

  UserDelete:FormGroup;
  UserDeleteForm() {
    this.UserDelete = this.formBuilder.group({
      id:[""],
      username: [""],
      isActive:[false] 

    })
 
  }
  user:User[] =[];
  getUser() {
    this.userService.getUser().subscribe(response => {
      this.user = response
       for (let index = 0; index < this.user.length; index++) {
        this.UserDelete.controls["id"].setValue(this.user[index].id);
        this.UserDelete.controls["username"].setValue(this.user[index].username);
      }
    })
  }

  delete() {
    if (this.UserDelete.valid) {
      let userModel = Object.assign({}, this.UserDelete.value)
      this.userService.add(userModel).subscribe(Response=>{
        this.toastrService.success("Başarılı")
        this.getUser();

      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }

   add() {
    if (this.UserAdd.valid) {
      let userModel = Object.assign({}, this.UserAdd.value)
      this.userService.add(userModel).subscribe(Response=>{
        this.toastrService.success("Başarılı")
        this.getUser();

      })
    }
    else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }
}
