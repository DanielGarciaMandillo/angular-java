import {Component, View} from 'angular2/core';
var tsJavaModule = require("./ts/tsJavaModule.js");
var Java = tsJavaModule.Java;

@Component({
  selector: 'tfg-tasks',
  inputs: ['placeholder', 'buttonText', 'listTitle']
})

@View({
  template: `
    <section class="right">
      <input type="text" placeholder="{{placeholder}}" id="task">
      <a href="#" class="button" (click)="addTask()">{{buttonText}}</a>
    </section>
    <section>
      <div class="title">{{listTitle}}</div>
      <ul id="results" class="results">
        <li *ngFor="#task of tasks">{{task}}</li>
      </ul>
    </section>
    `
})
export class tfgTasks {
  private repository : Repository;
  private tasks: string[];

  constructor() {
   Java.ensureJvm().then((): void => {
     var Repository = Java.importClass('Repository');
     this.repository = new Repository();

     this.repository.deleteTable();
     this.repository.createTable();
     this.getAllTasks();
   });
  }

  addTask() {
    var Item = Java.importClass('Item');
    var name = document.getElementById('task').value;
    if (name) {
      document.getElementById('task').value = '';
      var task : Item = new Item(name);
      this.repository.insertItem(task);
      this.getAllTasks();
    }
  }

  getAllTasks() {
    var listAux = [];
    var tasksList = this.repository.getDataTable();
    for (var i = 0; i < tasksList.size(); i++) {
      listAux.push(tasksList.get(i).getName());
    }
    this.tasks = listAux;
  }
}
