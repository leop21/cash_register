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

    // Shows the Pair Wise Screen
    openPairWise() {
        this.cashRegister = false;
        this.pairWise = true;
    }

    // Shows the Cash Register Screen
    openCashRegister() {
        this.pairWise = false;
        this.cashRegister = true;
    }

    // Shows the Mode Selection Screen
    backToModeSelection() {
        this.pairWise = false;
        this.cashRegister = false;
    }
    
}