import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'gft-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')]
})
export class AppComponent {

	public cashRegister: Boolean;
	public pairWise: Boolean;

    constructor() {
    }

    openPairWise() {
    	this.cashRegister = false;
    	this.pairWise = true;
    }

    openCashRegister() {
    	this.pairWise = false;
    	this.cashRegister = true;
    }

    backToModeSelection() {
        this.pairWise = false;
        this.cashRegister = false;
    }
    
}