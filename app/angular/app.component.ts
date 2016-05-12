import { Component, OnInit } from 'angular2/core';

import { Java } from '../java/tsJavaModule';

@Component({
    selector: 'app',
    template: `
		<h1>Java Angular Electron</h1>
		<li *ngFor="#item of items">
			{{item}}
		</li>`
})
export class AppComponent implements OnInit {

    items: string[] = [];

    ngOnInit() {

        Java.ensureJvm().then(() => {

            //Import classes
            let Item = Java.importClass("Item");
            let Repository = Java.importClass("Repository");
            let ArrayList = Java.importClass("ArrayList");

            //Create data table in bbdd
            let repository = new Repository();
            repository.createTable();

            //Create items and insert in bbdd
            let item = new Item("Apple");
            repository.insertItem(item);

            repository.insertItem(new Item("Orange"));
            repository.insertItem(new Item("Pear"));
            repository.insertItem(new Item("Strawberry"));

            //Get bbdd data and bind with GUI
            let list = repository.getDataTable();
            for (var i = 0; i < list.size(); i++) {
                let itemAux: any = list.get(i);
                this.items.push(itemAux.getName());
            }

            //Delete data table in bbdd
            repository.deleteTable();

        });
    }
}
