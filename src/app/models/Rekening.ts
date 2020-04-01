import { Injectable, Optional } from '@angular/core';
import { Betaling } from '../models/Betaling';
import { GroepsLid } from '../models/GroepsLid';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Optional()
// @Injectable( {
//     providedIn: 'root'
// })

export class Rekening {

  //public bbetalingen: Array<Betaling> = [];
  //public ggroepsLeden: Array<GroepsLid> = [];
  //public ttotaalBedrag : number = 0;
  //public betalingsNummer : number = 0;

  constructor (
    public betalingen : Array<Betaling>,
    public groepsleden : Array<GroepsLid>,
    public totaalBedrag : number,
    public betalingsNummer : number
  ) {
    this.betalingen;// = this.bbetalingen;
    this.groepsleden;// = this.ggroepsLeden;
    this.totaalBedrag = 0;
    this.betalingsNummer = 0;
  }

  ngOnInit() {
    console.log("OnInit!");
    //this.NieuweBetaling("testBetaling1", 10.00, "Gerben van Dooren");
    //this.AddBetaling("Broodjes shoarma", 20.00, "Ralph Rouwen");
    //this.AddBetaling("Bier", 40.00, "Ralph Rouwen");
    this.PrintRekening();
  }

  UpdateRekening(this) {
    var nieuwTotaalBedrag = 0;
    this.betalingen.forEach(betaling => {
      nieuwTotaalBedrag += betaling.prijs
    });
    this.totaalBedrag = nieuwTotaalBedrag;
    //console.log("Updated rekening!");
    //this.PrintRekening();
  }

  PrintRekening(this) {
    console.log("Alle betalingen:\r\n");
    if(this.betalingen != null) {
      console.log(this.personen)
      if(this.betalingen.personen != null) {
        this.betalingen.forEach((betaling => {
          console.log("\r\nNaam: " + betaling.naam);
          console.log("\r\nBetalingsomschrijving: " + betaling.betalingsOmschrijving);
          console.log("\r\nPrijs: " + betaling.prijs);
          console.log("\r\nBetalingsnummer: " + betaling.betalingsNummer);
        }));
      }
      
      //console.log("===============================================");
      console.log("Totaalbedrag bedraagd: " + this.totaalBedrag);

      console.log("\r\nAlle verschillende personen die betaald hebben: ");
      if(this.groepsleden != null) {
        this.groepsleden.forEach(groepslid => {
          console.log("\r\n" + groepslid.naam + " heeft: " + groepslid.totaalBetaald + " euro betaald.");
        });
      }
    }
    else {
      console.log("Rekening is leeg!");
    }
  }

  AddBetaling(betalingsOmschrijving : string, prijs : number, groepsLid : string) {
    //kijk of de persoon al eerder iets betaald heeft:
    if(this.groepsleden != null ) {
      var nieuweBetaling;
      var added = false;
      this.groepsleden.forEach(element => {
        if(element.naam === groepsLid) {
          //console.log("persoon komt voor, dus werk zijn bedrag bij!");
          element.totaalBetaald = element.totaalBetaald + prijs;
          added = true;
          nieuweBetaling = new Betaling(this.betalingsNummer, betalingsOmschrijving, prijs, element);
        }
      })

      if(!added) {
        //nieuw groepslid
        var nieuwGroepsLid = new GroepsLid(groepsLid, prijs, 0);
        this.groepsleden.push(nieuwGroepsLid);
        nieuweBetaling = new Betaling(this.betalingsNummer, betalingsOmschrijving, prijs, nieuwGroepsLid);
        //console.log("Nieuwe persoon aan de lijst met personen toegevoegd!");
      }
      this.betalingsNummer++;
      this.totaalBedrag = prijs;
      this.betalingen.push(nieuweBetaling);
      this.UpdateRekening();    
      }
  }

  RemoveBetaling(rekening : Rekening, nummer : number) {
    if(rekening.betalingen.find(x => x.betalingsNummer === nummer)) {
      rekening.betalingen.splice(rekening.betalingen.findIndex(betaling => betaling.betalingsNummer === nummer))
      console.log("Betaling met ID: " + nummer + "is succesvol verwijderd!")
      this.UpdateRekening();
      return 1;
    }
    return -1;
  }

  BerekenBetaalVerzoeken() {
    var betaalVerzoekjes :number[] = [];
    var bedragPP = this.totaalBedrag / this.groepsleden.length; //dit is het bedrag wat iedereen moet betalen.

    //calculate overschot:
    this.groepsleden.forEach(element => {
      element.overSchot = element.totaalBetaald - bedragPP;

      // if(element.overSchot > 0) {
      //   console.log(element.naam + " krijgt nog: " + element.overSchot + " uit de pot.");
      // }
      // else {
      //   console.log(element.naam + " moet nog: " + element.overSchot + " in de pot stoppen.");
      // }
    });
    // 2) Persoonsbedrag - X moet op 0 uitkomen 
    //return betaalVerzoekjes;
  }
}
