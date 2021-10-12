import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-footer-contact',
  templateUrl: './footer-contact.component.html',
  styleUrls: ['./footer-contact.component.css']
})
export class FooterContactComponent implements OnInit {

  constructor(private contactService: ContactService,
    private toastrService: ToastrService) { }
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required]),
    eMail: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])


  });
  ngOnInit(): void {
  }
  add() {
    if (this.contactForm.valid) {
      let contactModel = Object.assign({}, this.contactForm.value)
      this.contactService.add(contactModel).subscribe(Response => {
        this.toastrService.success("En kısa sürede sizinle iletişime geçiceğiz")

      })
    }
  }
}
