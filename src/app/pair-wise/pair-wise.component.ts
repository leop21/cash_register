import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gft-pair-wise',
  template: require('./pair-wise.component.html'),
  styles: [require('./pair-wise.component.scss')]
})
export class PairWiseComponent {

    public array: any;
    public arg: any;
    public result: any;

    pairWise() {
        if(this.array && this.arg) {
            this.result = 0;
            let array:any;

            try {
                array = JSON.parse(this.array);
            } catch(e) {
                alert("Invalid array value");
            }
            
            if(array) {
                let used:any = [];
                for (let i = 0; i < array.length; ++i) {
                    for (let j = 0; j < array.length; ++j) {
                        if((i != j) && !used[i] && !used[j] && (array[i] + array[j] == this.arg)) {
                            this.result = this.result + (i+j);
                            used[i] = true;
                            used[j] = true;
                        }
                    }
                }
            }
        }
    }
}