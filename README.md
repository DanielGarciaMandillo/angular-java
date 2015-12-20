# electron-node-java

Build cross platform desktop apps with web technologies with node-java

- [Electron project]
- [Node-java project]

# How to 

1) Download the project electron-node-java

2) Type ```npm install``` for download dependencies

3) Type ```npm start``` for open browser with application

When application starts maybe you can find in the browser console a error like : ```Crashes on start: Error: Module version mismatch. Expected 47, got 46```.

You can fix: Delete folder node_modules and type :

```
export npm_config_disturl=https://atom.io/download/atom-shell
export npm_config_target=0.36.1
export npm_config_arch=x64
npm install
``` 

npm_config_target is last version of atom-shell electron
npm_config_arch is your arch : x64 or x86
More info in [electron docs]

# Structure

A basic electron-node-java application needs just these files:

* node-java/app.js - A javascript code using java-node.
* jar/*.jar - Any jar you want use.
* index.html - A web page to render.
* main.js - Starts the app and creates a browser window to render HTML.
* package.json - Points to the app's main file and lists its details and dependencies.
 
#Author
daniel.garciamandillo@gmail.com

[electron docs]: https://github.com/atom/electron/blob/master/docs-translations/es/tutorial/using-native-node-modules.md
[Electron project]: https://github.com/mafintosh/electron-prebuilt
[Node-java project]: https://github.com/joeferner/node-java
