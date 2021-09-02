import { Component, OnInit } from '@angular/core';
import {CurrencyClientService, Rates, RootObject} from '../services/currency-client.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  rootObject: RootObject;
  result: string;
  randomCurrency: string;
  answer: string;
  flag: boolean;
  buttonText: string;
  level: boolean;
  levelText: string;
  constructor(private currencyClientService: CurrencyClientService) {

  }

  ngOnInit(): void {
    this.currencyClientService.getCurrency().subscribe(value => {
        this.rootObject = value;
        const keys = Object.keys(this.rootObject.rates);
        const randomNumber = Math.floor((Math.random() * 100) + 1);
        this.randomCurrency = keys[randomNumber];
        this.flag = false;
        this.buttonText = 'Sprawdź odpowiedź';
        this.levelText = 'Kliknij aby wybrać lvl';
        console.log(this.randomCurrency);
    });

  }

  check(value: number) {
    switch (this.level) {
      case false :
        if (value > this.rootObject.rates[this.randomCurrency]) {
          this.result = 'podales za dużą wartość';
        }
        else if (value < this.rootObject.rates[this.randomCurrency]) {
          this.result = 'podales za mała wartość';
        } else {
          this.result = 'Udało sie, Gratulacje!';
        }
        break;
      case true:
        const value1 = (Math.round(this.rootObject.rates[this.randomCurrency] * 100) / 100).toFixed(2);
        if (value > Number(value1)) {
          this.result = 'podales za dużą wartość';
        }
        else if (value < Number(value1)) {
          this.result = 'podales za mała wartość';
        } else {
          this.result = 'Udało sie, Gratulacje!';
        }
        break;
    }
  }

  checkAnswer() {
    switch (this.level){
      case true :
        if (this.flag){
          this.answer = '';
          this.flag = false;
          this.buttonText = 'Sprawdź odpowiedź';
        } else {
          this.answer = (Math.round(this.rootObject.rates[this.randomCurrency] * 100) / 100).toFixed(2);
          this.flag = true;
          this.buttonText = 'Ukryj odpowiedź';
        }
        break;
      case false :
        if (this.flag){
          this.answer = '';
          this.flag = false;
          this.buttonText = 'Sprawdź odpowiedź';
        } else {
          this.answer = this.rootObject.rates[this.randomCurrency];
          this.flag = true;
          this.buttonText = 'Ukryj odpowiedź';
        }
    }
  }

  changeLevel() {
    if (this.level) {
      this.level = false;
      this.levelText = 'Aktualnie wybrany poziom to Trudny';
    }
    else {
      this.levelText = 'Aktualnie wybrany poziom to Latwy';
      this.level = true;
    }
    console.log(this.level);
  }
}
