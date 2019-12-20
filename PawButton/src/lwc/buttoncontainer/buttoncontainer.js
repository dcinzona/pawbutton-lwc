/**
 * Created by gtandeciarz on 12/20/19.
 */

import {LightningElement, track, api} from 'lwc';

export default class ButtonContainer extends LightningElement {
    @track selected = true;
    @track loadingDone = false;

    constructor() {
        super();
        setTimeout(()=> {
            this.loadingDone = true;
        }, 3000);
    }
    handleNotification(event){
        console.log(event.detail);
        // Code runs when event is received
        setTimeout(() => {
            this.selected = event.detail.togglingOn;
            this.template.querySelector('c-pawbutton').checkSelection();
        }, 1000);
    }
}