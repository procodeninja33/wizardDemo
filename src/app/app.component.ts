import { Component, OnInit } from '@angular/core';
import { dishes } from './app.data';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  poeples = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  data: Array<any> = dishes;
  restaurants: Array<any> = [];
  dish: Array<any> = [];
  meal: any;
  step1: FormGroup;
  step2: FormGroup;
  step3: FormGroup;


  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.buildForm1();
    // this.buildForm2();
    // this.buildForm3();
    this.removeDuplicateRes(this.data);
  }

  buildForm1() {
    this.step1 = this.formBuilder.group({
      meal: ['', [Validators.required]],
      people: ['', [Validators.required]]
    });
  }

  buildForm2() {
    this.step2 = this.formBuilder.group({
      restaurant: ['', [Validators.required]]
    });
  }

  buildForm3() {
    // this.step3 = this.formBuilder.group({
    //   restaurant: ['', [Validators.required]]
    // });
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
    this.dish = this.data.filter(element => {
      return (element.restaurant === event && element.availableMeals.indexOf(this.meal) > -1);
    });
  }


}
