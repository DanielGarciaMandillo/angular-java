import {Component} from "angular2/core";

@Component({
  selector: "tfg-title",
  inputs: ["name"],
  template: `
      <header>
        <h1>{{name}}</h1>
      </header>`
})

export class TfgTitle {}
