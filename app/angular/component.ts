import {Component} from 'angular2/core';
import {Java} from '../java/tsJavaModule';
import {TfgTitle} from './tfg-title.component';

@Component({
	selector: 'app',
	template: `<tfg-title name="{{name}}"></tfg-title>
						<div>Hello from {{framework}}</div>`,
	directives: [TfgTitle]
})

export class App {
	framework: string;
	name: any;
	constructor(){
		this.framework = 'Angular2 Electron!';
		setTimeout(() => {
			this.framework = 'Angular2 Electron!!!';
		},1000);

    Java.ensureJvm().then((): void => {
	    this.name = "Daniel García";
   });
	}
}