import {Component} from "angular2/core";
import {tfgTitle} from './components/tfg-title.component.js';
import {tfgFooter} from './components/tfg-footer.component.js';
import {tfgTasks} from './components/tfg-tasks.component.js';

@Component({
  selector: "my-app",
  templateUrl: "angularApp/app.html",
  directives: [tfgTitle, tfgFooter, tfgTasks]
})

export class AppComponent {}