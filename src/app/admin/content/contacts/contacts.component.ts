import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contactForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    eMail: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    isActive: new FormControl(false)
  });
  contact:Contact[] =[];
  getContact() {
    this.contactService.getContact().subscribe(response => {
      this.contact = response
       for (let index = 0; index < this.contact.length; index++) {
        this.contactForm.controls["id"].setValue(this.contact[index].id);
        this.contactForm.controls["name"].setValue(this.contact[index].name);
        this.contactForm.controls["surname"].setValue(this.contact[index].surname);
        this.contactForm.controls["eMail"].setValue(this.contact[index].eMail);
        this.contactForm.controls["telephone"].setValue(this.contact[index].telephone);
        this.contactForm.controls["content"].setValue(this.contact[index].content);
      }
    })
  }
  delete() {
    if (this.contactForm.valid) {
      let contactModel = Object.assign({}, this.contactForm.value)
      this.contactService.add(contactModel).subscribe(Response => {
        this.toastrService.error("Silindi")
        this.getContact();

      })
    }
  }
  constructor(private contactService: ContactService, private toastrService:ToastrService) { }

  ngOnInit(): void {
   this.getContact();
  }

}
