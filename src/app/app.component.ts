import { Component, OnInit } from '@angular/core';
import { dishes } from './app.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  poeples = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  data: Array<any> = dishes;
  restaurant: Array<any> = [];
  contRestaurant: Array<any> = [];
  dish: Array<any> = [];

  constructor() {
  }

  ngOnInit() {
    let obj = {};

    for (let i = 0; i < this.data.length; i++) {
      obj[this.data[i]['restaurant']] = this.data[i];

    }

    for (var key in obj) {
      this.restaurant.push(obj[key]);
      this.contRestaurant.push(obj[key]);
    }

  }

  onChangeMeal(event) {
    this.restaurant = this.contRestaurant.filter(element => {
      return element.availableMeals.indexOf(event) > -1;
    });

  }

  onChangeRestaurant(event) {
    this.dish = this.data.filter( element => {
      return (element.restaurant === event)
    })
  }


}
