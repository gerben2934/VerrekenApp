import { Injectable } from '@angular/core';

@Injectable()
export class GroepsLid {
    constructor (
        public naam : string,
        public totaalBetaald : number,
        public overSchot : number
    ) {}
}