import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RekeningService } from '../services/rekening.service';
import { Injectable } from '@angular/core';
import { Rekening } from '../models/Rekening';
import { GroepsLid } from '../models/GroepsLid';
import { Betaling } from '../models/Betaling';

@Injectable()

@Component({
  selector: 'app-rekening',
  templateUrl: './rekening.component.html',
  styleUrls: ['./rekening.component.css'],
})

export class RekeningComponent implements OnInit {

  public bbetalingen: Array<Betaling> = [];
  public ggroepsLeden: Array<GroepsLid> = [];
  public ttotaalBedrag : number = 0;

  public rekening : Rekening;

  public addPaymentForm: FormGroup;
  public paymentInvalid = false;
  public calculateDifferencesButtonClicked = false;
  public paymentsEmtpy = true;

  constructor () {
    console.log("RekeningComponent Constructor!");
  }
  
  ngOnInit() {
    console.log("RekeningComponent OnInit()");
    this.rekening = new Rekening(this.bbetalingen, this.ggroepsLeden, this.ttotaalBedrag, 0);
    this.rekening.ngOnInit();

    this.addPaymentForm = new FormGroup({
      'boxName': new FormControl(null, null),
      'boxPayed': new FormControl(null, null),
      'boxPayDescription': new FormControl(null, null)
    });
  }

  async onSubmit() {
    const name = this.addPaymentForm.value['boxName'];
    const amount = this.addPaymentForm.value['boxPayed'];
    const description = this.addPaymentForm.value['boxPayDescription'];

    if(name != null && amount != null && description != null ) {
      if(name.length > 0 && description.length > 0) {
        this.AddPayment(name, +amount, description);
        this.addPaymentForm.reset();
        return;
      }
    }
    this.paymentInvalid = true;
  }

  AddPayment(boxName : string, boxPayed : number, boxPayDescription : string) {
    var name = ((document.getElementById("boxName") as HTMLInputElement).value);
    var paymentAmount = ((document.getElementById("boxPayed") as HTMLInputElement).value);
    var paymentDescription = ((document.getElementById("boxPayDescription") as HTMLInputElement).value);
    this.rekening.AddBetaling(paymentDescription, +paymentAmount, name);
  }

  CalculatePayments() {
    this.calculateDifferencesButtonClicked = true;
    if(this.rekening.betalingen.length != 0) {
      this.paymentsEmtpy = false;
      this.rekening.BerekenBetaalVerzoeken();
    }
    else {
      this.paymentsEmtpy = true;
    }
  }
}
