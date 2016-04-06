import 'reflect-metadata';
import 'zone.js/dist/zone';
import {bootstrap} from './electron/main';

import {App} from './component';

bootstrap(App, []);
