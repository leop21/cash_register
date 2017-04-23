import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'gft-cash-register',
    template: require('./cash-register.component.html'),
    styles: [require('./cash-register.component.scss')]
})
export class CashRegisterComponent implements OnInit {

    public cash: any;
    public paymentCash: any;
    public total: number;
    public paymentTotal: number;
    public mode: number;
    public price: number;
    public paymentMessage: string;
    public initialCash: number;
    public soldAmount: any;
    
    ngOnInit(): void {
        this.reset();
    }

    //Resets configuration
    reset() {
        this.mode = 0;
        this.total = 0;
        this.resetCash();
        this.resetPaymentCash();    
        this.initialCash = this.total;
        this.soldAmount = 0;
    }

    //Resets cash balance
    resetCash() {
        this.cash = [
            {
                label: "PENNY", 
                value: 0.01,
                amount: 0
            },
            {
                label: "NICKEL", 
                value: 0.05,
                amount: 0
            },
            {
                label: "DIME", 
                value: 0.1,
                amount: 0
            },
            {
                label: "QUARTER", 
                value: 0.25,
                amount: 0
            },
            {
                label: "ONE", 
                value: 1,
                amount: 0
            },
            {
                label: "FIVE", 
                value: 5,
                amount: 0
            },
            {
                label: "TEN", 
                value: 10,
                amount: 0
            },
            {
                label: "TWENTY", 
                value: 20,
                amount: 0
            },
            {
                label: "ONE HUNDRED", 
                value: 100,
                amount: 0
            }
        ];        
        this.updateTotal();
    }

    //Resets payment cash
    resetPaymentCash() {
        this.price = null;
        this.paymentCash = [
            {
                label: "PENNY", 
                value: 0.01,
                amount: 0
            },
            {
                label: "NICKEL", 
                value: 0.05,
                amount: 0
            },
            {
                label: "DIME", 
                value: 0.1,
                amount: 0
            },
            {
                label: "QUARTER", 
                value: 0.25,
                amount: 0
            },
            {
                label: "ONE", 
                value: 1,
                amount: 0
            },
            {
                label: "FIVE", 
                value: 5,
                amount: 0
            },
            {
                label: "TEN", 
                value: 10,
                amount: 0
            },
            {
                label: "TWENTY", 
                value: 20,
                amount: 0
            },
            {
                label: "ONE HUNDRED", 
                value: 100,
                amount: 0
            }
        ];
        this.updatePaymentTotal();
    }

    // Updates cash balance total
    updateTotal() {
        let newTotal = 0;
        this.cash.forEach(function(denomination:any) {
            newTotal = newTotal + (denomination.value * denomination.amount);
        });
        this.total = newTotal;
    }

    // Updates payment total
    updatePaymentTotal() {
        let newTotal = 0;
        this.paymentCash.forEach(function(denomination:any) {
            newTotal = newTotal + (denomination.value * denomination.amount);
        });
        this.paymentTotal = newTotal;
    }

    // Makes payment 
    makePayment() {
        if(this.price && this.paymentTotal && this.paymentTotal >= this.price) {
            this.addCash();
            this.getChangeDue();
        }
    }

    // Adds payment cash to cash balance
    addCash() {
        for (let i = this.paymentCash.length - 1; i >= 0; i--) {
            this.cash[i].amount = this.cash[i].amount + this.paymentCash[i].amount;
        }
        this.soldAmount = this.soldAmount + this.paymentTotal;
    }

    // Calculates the change due
    getChangeDue() {
        let change: any = (this.paymentTotal - this.price).toFixed(2);
        let remainingChangeDue: any = change;
        let potentialChange: any = [];
        for (let i = this.paymentCash.length - 1; i >= 0; i--) {
            let neededAmount:number = Math.floor(remainingChangeDue/this.paymentCash[i].value);
            if(this.cash[i].amount <= neededAmount)
                potentialChange[this.paymentCash[i].value] = this.cash[i].amount;
            else
                potentialChange[this.paymentCash[i].value] = neededAmount;
            remainingChangeDue = remainingChangeDue - (potentialChange[this.paymentCash[i].value]*this.paymentCash[i].value);
        }

        if(remainingChangeDue>0)
            this.paymentMessage = "Insufficient Funds";
        else {
            for (let j = this.cash.length - 1; j >= 0; j--) {
                this.cash[j].amount = this.cash[j].amount - potentialChange[this.paymentCash[j].value];
            }
            this.paymentMessage = "Change Due: $"+change;
        }
    }

    // Confirms the payment and set flags to start a new one
    confirmPayment() {
        if(this.paymentMessage != "Closed")
            this.paymentMessage = "Closed";
        else {
            this.paymentMessage = null;
            this.resetPaymentCash();
        }
    }

    // Shows the current cash balance screen
    showCurrentCashBalance() {
        this.updateTotal();
        this.mode = 1;
    }
    
}