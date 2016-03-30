import {Component} from "angular2/core";

@Component({
  selector: "tfg-footer",
  inputs: ["name"],
  template: `<footer>
              {{name}}
             </footer>`
})

export class TfgFooter {}
