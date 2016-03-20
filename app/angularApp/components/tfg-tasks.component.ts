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
      <div id="results" class="results"></div>
    </section>
    `
})
export class tfgTasks {
  private repository : Repository;

  constructor() {
   var tsJavaModule = require("./ts/tsJavaModule.js");
   var Java = tsJavaModule.Java;

   Java.ensureJvm().then((): void => {
     var Repository = Java.importClass('Repository');
     this.repository = new Repository();

     this.repository.deleteTable();
     this.repository.createTable();
     this.getAllTasks();
   });
  }

  addTask() {
    var name = document.getElementById('task').value;
    if (name) {
      document.getElementById('task').value = '';
      var task = Java.newInstance('com.todo.Item', name);
      this.repository.insertItem(task);
      this.getAllTasks();
    }
  }

  getAllTasks() {
    var result = [];
    var tasksList = this.repository.getDataTable();
    for (var i = 0; i < tasksList.size(); i++) {
      result.push("<li>" + tasksList.get(i).getName() + "</li>");
    }
    document.getElementById("results").innerHTML = result.join("");
  }
}