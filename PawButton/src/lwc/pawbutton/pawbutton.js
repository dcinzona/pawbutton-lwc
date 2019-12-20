/**
 * Created by gtandeciarz on 12/20/19.
 */

import {LightningElement, track, api} from 'lwc';

export default class Pawbutton extends LightningElement {
    @api buttonText;
    @api buttonSelectedText;
    @api selected = false;
    @api showbutton = false;

    get buttonLabel(){
        return this.buttonText ? this.buttonText : 'Like';
    }

    get buttonSelectedLabel(){
        return this.buttonSelectedText ? this.buttonSelectedText : 'Liked';
    }

    @track confettiAmount = 60;
    @track confettiColors = [
        '#7d32f5',
        '#f6e434',
        '#63fdf1',
        '#e672da',
        '#295dfe',
        '#6e57ff'
    ];
    @track random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    @track createConfetti = to => {
        let elem = document.createElement('i'),
            set = Math.random() < 0.5 ? -1 : 1;
        elem.setAttribute('gmt-pawbutton_pawbutton','');
        elem.classList.add('cf');
        elem.style.setProperty('--x', this.random(-260, 260) + 'px');
        elem.style.setProperty('--y', this.random(-160, 160) + 'px');
        elem.style.setProperty('--r', this.random(0, 360) + 'deg');
        elem.style.setProperty('--s', this.random(.6, 1) + '');
        elem.style.setProperty('--b', this.confettiColors[this.random(0, 5)]);
        to.appendChild(elem);
    };

    handleClick(event){
        //let number = elem.children[1].textContent;
        event.preventDefault();
        this.doAnimations();
        const selectedEvent = new CustomEvent('pawbuttonclicked', { detail: { togglingOn :!this.selected } });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    doAnimations(){
        let elem = this.template.querySelector('.paw-button');
        if(!this.selected) {
            //this.selected = true;
            elem.classList.add('animation');
            for(let i = 0; i < this.confettiAmount; i++) {
                this.createConfetti(elem);
            }
            setTimeout(() => {
                elem.classList.add('confetti');
                setTimeout(() => {
                    elem.classList.add('liked');
                }, 400);
                setTimeout(() => {
                    elem.querySelectorAll('i').forEach(i => i.remove());
                }, 600);
            }, 260);
        } else {
            //this.selected = false;
            elem.classList.remove('animation', 'liked', 'confetti');
        }

    }

    get pawbuttonClass(){
        return this.selected ? "paw-button liked" : "paw-button";
    }

    @api
    checkSelection(){
        let elem = this.template.querySelector('.paw-button');
        if(elem){
            if(this.selected){
                elem.classList.add('liked');
            } else {
                elem.classList.remove('animation', 'liked', 'confetti');
            }
        }
    }
}