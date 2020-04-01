import { Injectable } from '@angular/core';
import { GroepsLid } from './GroepsLid';

@Injectable()
export class Betaling {
    constructor (
        public betalingsNummer : number,
        public betalingsOmschrijving : string,
        public prijs : number,
        public persoon : GroepsLid
    ) {}
}