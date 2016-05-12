import 'reflect-metadata';
import 'zone.js/dist/zone';
import {bootstrap} from './electron/main';

import { AppComponent } from './angular/app.component';

bootstrap(AppComponent, []);
