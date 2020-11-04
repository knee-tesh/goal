import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  signUp = this.fb.group({
    brand_name:[null,Validators.required],
    logo : [null,Validators.required],
    details : this.fb.group({
      name: [null,Validators.required],
      designation:[null,Validators.required],
      phone:[null,[Validators.required,Validators.pattern(/^[0-9]{10}/)]],
      email:[null,[Validators.required,Validators.email]]
    })
  });

  allEntries:any = [];
  submitError:boolean = false;

  constructor(
    private fb:FormBuilder,
    private dataService:DataService
  ) {  

  }

  ngOnInit(): void {
  }

  submit(){
    const x = this.signUp.value;
    const phone = x.details.phone;
    const email = x.details.email;
    const list = this.allEntries.filter(({details})=> (details.email == email || details.phone == phone));
    if( list.length ) {
      this.submitError = true;
      setTimeout(() => {
        this.submitError = false;
      }, 5000);
      this.signUp.reset();
      return;
    }
    x['status'] = 'pending';
    this.dataService.setEntries(x);
    this.signUp.reset();
    this.allEntries = this.dataService.getEntries();
  }

}
