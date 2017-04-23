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

    constructor() {
    }

    ngOnInit(): void {
        this.mode = 0;
        this.total = 0;
        this.cash = [
            {
                label: "PENNY", 
                value: 0.01,
                amount: 100
            },
            {
                label: "NICKEL", 
                value: 0.05,
                amount: 100
            },
            {
                label: "DIME", 
                value: 0.1,
                amount: 100
            },
            {
                label: "QUARTER", 
                value: 0.25,
                amount: 100
            },
            {
                label: "ONE", 
                value: 1,
                amount: 100
            },
            {
                label: "FIVE", 
                value: 5,
                amount: 100
            },
            {
                label: "TEN", 
                value: 10,
                amount: 100
            },
            {
                label: "TWENTY", 
                value: 20,
                amount: 100
            },
            {
                label: "ONE HUNDRED", 
                value: 100,
                amount: 100
            }
        ];

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
        this.updateTotal();
        this.initialCash = this.total;
        this.soldAmount = 0;
    }

    updateTotal() {
        let newTotal = 0;
        this.cash.forEach(function(denomination:any) {
            newTotal = newTotal + (denomination.value * denomination.amount);
        });
        this.total = newTotal;
    }

    updatePaymentTotal() {
        let newTotal = 0;
        this.paymentCash.forEach(function(denomination:any) {
            newTotal = newTotal + (denomination.value * denomination.amount);
        });
        this.paymentTotal = newTotal;
    }

    makePayment() {
        if(this.paymentTotal >= this.price) {
            this.addCash();
            this.getChangeDue();
        }
    }

    addCash() {
        for (let i = this.paymentCash.length - 1; i >= 0; i--) {
            //console.log(this.cash[i].amount, this.paymentCash[i].amount);
            this.cash[i].amount = this.cash[i].amount + this.paymentCash[i].amount;
            //console.log(this.cash[i].amount);
        }
        this.soldAmount = this.soldAmount + this.paymentTotal;
    }

    getChangeDue() {
        let change: any = (this.paymentTotal - this.price).toFixed(2);
        //console.log(this.paymentTotal, this.price, change);
        let remainingChangeDue: any = change;
        let potentialChange: any = [];
        for (let i = this.paymentCash.length - 1; i >= 0; i--) {
            let neededAmount:number = Math.floor(remainingChangeDue/this.paymentCash[i].value);
            //console.log(remainingChangeDue+"/"+this.paymentCash[i].value)
            //console.log(neededAmount);

            if(this.cash[i].amount <= neededAmount)
                potentialChange[this.paymentCash[i].value] = this.cash[i].amount;
            else
                potentialChange[this.paymentCash[i].value] = neededAmount;

            remainingChangeDue = remainingChangeDue - (potentialChange[this.paymentCash[i].value]*this.paymentCash[i].value);
            //remainingChangeDue = remainingChangeDue.toFixed(2);
        }

        //console.log(remainingChangeDue);
        //console.log(potentialChange);

        if(remainingChangeDue>0)
            this.paymentMessage = "Insufficient Funds";
        else {
            for (let j = this.cash.length - 1; j >= 0; j--) {
                this.cash[j].amount = this.cash[j].amount - potentialChange[this.paymentCash[j].value];
                //console.log(this.cash[j].amount);
            }
            //console.log(this.cash);
            this.paymentMessage = "Change Due: $"+change;
        }
    }

    confirmPayment() {
        if(this.paymentMessage != "Closed")
            this.paymentMessage = "Closed";
        else
            this.paymentMessage = null;
    }

    showCurrentCashBalance() {
        this.updateTotal();
        this.mode = 1;
    }
    
}