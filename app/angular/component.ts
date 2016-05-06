import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';

import {Java} from '../java/tsJavaModule';
import {TfgTitle} from './tfg-title.component';

@Component({
	selector: 'app',
	template: `<tfg-title name="{{name}}"></tfg-title>
						<div>Hello from {{framework}}</div>
						<li *ngFor="#item of items">
							{{item}}
						</li>`,
	directives: [TfgTitle]
})

export class App {
	framework: string;
	name: string;
	items: string[];
	constructor(){
		this.framework = 'Angular2 Electron!';
		this.items = [];
		setTimeout(() => {
			this.framework = 'Angular2 Electron!!!';
		},1000);


    Java.ensureJvm().then((): void => {
	    setTimeout(() => {
				this.name = 'Angular Java Project Sample';

        //Import classes
        var Item: any = Java.importClass("Item");
        var Repository: any = Java.importClass("Repository");
        var ArrayList: any = Java.importClass("ArrayList");
        var repository: any = new Repository();
        var arrayList: any = new ArrayList();
				var item: any = new Item("");
				//Create data table in bbdd
        repository.createTable();

        //Create items and insert in bbdd
        repository.insertItem(new Item("Apple"));
        repository.insertItem(new Item("Orange"));
        repository.insertItem(new Item("Pear"));
        repository.insertItem(new Item("Strawberry"));

				//Get bbdd data and bind with GUI
				arrayList = repository.getDataTable();
				for (var i = 0; i < arrayList.size(); i++) {
					item = arrayList.get(i);
					this.items.push(item.getName());
				}

				//Delete data table in bbdd
				repository.deleteTable();

			}, 2500);

   });
	}
}