import {Component} from "angular2/core";
import {TfgTitle} from './components/tfg-title.component';
import {TfgFooter} from './components/tfg-footer.component';
import {TfgTasks} from './components/tfg-tasks.component';

@Component({
  selector: "my-app",
  templateUrl: "angularApp/app.html",
  directives: [TfgTitle, TfgFooter, TfgTasks]
})

export class AppComponent {}