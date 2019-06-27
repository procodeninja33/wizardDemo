import { Component, OnInit } from '@angular/core';
import { dishes } from './app.data';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  poeples = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  data: Array<any> = dishes;
  restaurants: Array<any> = [];
  dishList: Array<any> = [];
  meal: any;
  step1: FormGroup;
  step2: FormGroup;
  step3: FormGroup;
  submit1: Boolean = false;
  submit2: Boolean = false;
  submit3: Boolean = false;
  DishError: Boolean = false;


  constructor(public formBuilder: FormBuilder,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.buildForm1();
    this.buildForm2();
    this.buildForm3();
    this.removeDuplicateRes(this.data);
  }

  /** Build step 1 Form */
  buildForm1() {
    this.step1 = this.formBuilder.group({
      meal: ['', [Validators.required]],
      people: ['', [Validators.required]]
    });
  }

  /** Build step 2 form */
  buildForm2() {
    this.step2 = this.formBuilder.group({
      restaurant: ['', [Validators.required]]
    });
  }

  /** Build Step 3 form */
  buildForm3() {
    this.step3 = this.formBuilder.group({
      dishs: this.formBuilder.array([this.createItem()]),
    });
  }

  /** Create form array for step 3 (dish) field */
  createItem(): FormGroup {
    return this.formBuilder.group({
      dish: ['', [Validators.required]],
      servingCounte: ['', [Validators.required]]

    });
  }

  /** dynamically add new array field field for dish */
  addNext() {
    this.dishs.push(this.createItem());
  }

  /** remove dynamially added dish */
  removeDish(i) {

    if (this.dishs.length > 1) {
      this.dishs.removeAt(i);
    } else {
      // this.toastr.error('You can not remove all address.');
    }
  }

  /** dishs array for get */
  get dishs() {
    return this.step3.get('dishs') as FormArray;
  }

  /** remove Duplicate Resturants */
  removeDuplicateRes(data) {

    const obj = {};
    this.restaurants = [];
    for (let i = 0; i < data.length; i++) {
      obj[data[i]['restaurant']] = data[i];
    }

    for (var key in obj) {
      this.restaurants.push(obj[key]);
    }

  }

  /** meal dropdown selected option change */
  onChangeMeal(event) {
    this.meal = event;
    const tempRestaurants = this.data.filter(element => {
      return (element.availableMeals.indexOf(event) > -1);
    });
    this.removeDuplicateRes(tempRestaurants);

  }

  /** Restaurant dropdown selected option change */
  onChangeRestaurant(event) {
    this.dishList = this.data.filter(element => {
      return (element.restaurant === event && element.availableMeals.indexOf(this.meal) > -1);
    });
  }



  /** Step one form validation */
  step1Valdiation() {
    if (this.step1.valid) {
      return true;
    } else {
      return false;
    }
  }

  /** Step two form validation */
  step2Valdiation() {
    if (this.step2.valid) {
      return true;
    } else {
      return false;
    }
  }

  /** step 3 form valdiation */
  step3Valdiation() {
    if (this.step3.valid) {
      let total = 0;
      this.step3.value.dishs.map(v => {
        total += parseInt(v.servingCounte, 10);
      });

      if (total > this.step1.value.people) {
        // this.DishError = false;
        return true;
      } else {
        // this.DishError = true;
        return false;
      }
    } else {
      return false;
    }
  }

  checkValidation() {
    this.submit3 = true;
    let total = 0;
    this.step3.value.dishs.map(v => {
      total += parseInt(v.servingCounte, 10);
    });

    if (total > this.step1.value.people) {
      return true;
    } else {
      this.toastr.error('serving dish is not less than people')
    }
  }


  finishFunction() {
    this.toastr.success('Order successfully placed.');
  }


}
