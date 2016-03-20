import {Component, View} from 'angular2/core';

@Component({
  selector: 'tfg-title',
  inputs: ['name']
})

@View({
  template: `
      <header>
        <h1>{{name}}</h1>
      </header>`
})
export class tfgTitle {}