import {Component, View} from 'angular2/core';

@Component({
  selector: 'tfg-footer',
    inputs: ['name']
})

@View({
  template: `<footer>
              {{name}}
             </footer>`
})
export class tfgFooter {}