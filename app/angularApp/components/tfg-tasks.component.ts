import {Component, Input} from "angular2/core";
import {Java} from "../tsJavaModule";

console.log(Java)

@Component({
  selector: "tfg-tasks",
  template: `
    <section class="right">
      <input type="text" placeholder="{{placeholder}}" #input />
      <a href="#" class="button" (click)="addTask(input.value)">{{buttonText}}</a>
    </section>
    <section>
      <div class="title">{{listTitle}}</div>
      <ul id="results" class="results">
        <li *ngFor="#task of tasks">{{task}}</li>
      </ul>
    </section>
    `
})

export class TfgTasks {
  @Input() placeholder;
  @Input() buttonText;
  @Input() listTitle;

  private repository;
  private tasks: string[];

  // constructor() {

  //   Java.ensureJvm().then((): void => {
  //   var Repository = Java.importClass("Repository");
  //    this.repository = new Repository();

  //    this.repository.deleteTable();
  //    this.repository.createTable();
  //    this.getAllTasks();
  //  });
  // }

  // addTask(name: string) {
  //     var Item = Java.importClass("Item");
  //   if (name) {
  //     var task = new Item(name);
  //     this.repository.insertItem(task);
  //     this.getAllTasks();
  //   }
  // }

  // getAllTasks() {
  //   var listAux = [];
  //   var tasksList = this.repository.getDataTable();
  //   for (var i = 0; i < tasksList.size(); i++) {
  //     listAux.push(tasksList.get(i).getName());
  //   }
  //   this.tasks = listAux;
  // }
}
