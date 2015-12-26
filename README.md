# electron-node-java

Build cross platform desktop apps with web technologies using java from javascript

- [Electron project]
- [Node-java project]
- Based on [Electron boilerplate] for build compilation packages (Linux, Windows and Mac)

# Guide to developers 

This guide will be seen by the developer

##Requeriments

You have to have installed on your computer [NodeJS].

You have to see [supported platforms] for Electron.

You have to see [supported JVM] for Node-java.

##Quick start

1) Clone the project electron-node-java

* HTTPS

```git clone https://github.com/DanielGarciaMandillo/electron-node-java.git```

* SSH

```git clone git@github.com:DanielGarciaMandillo/electron-node-java.git```

2) Go to folder electron-node-java

```cd electron-node-java```

3) Type ```npm install``` to download dependencies for project Electron.

4) Type ```cd app && npm install``` to download dependencies for application project.

5) Type ```cd .. ``` to go to main folder project.

6) Type ```npm start``` to open browser.

Now you can use the application:

![Tutorial image][image-tutorial]

####Changing code

- When java code changes in native java project you should generate a new jar: 
    * Type ```npm start```, that includes a maven command for generate it.
- When javascript code changes you should restart the browser. Two ways:
	* In browser > Edit > View Reload or use shortcut ```Ctrl + R```


##Application deployment

###Linux (Debian)

On main folder of project you should type:

```npm run release```

It will start the packaging process for operating system you are running this command on. You can find the package created in ```resources``` folder

###Windows

Comming soon

###Mac

Comming soon


# Structure

A basic electron-node-java application needs just these files:

* src/main/java - Folder with java project sources.
* bin - Folder with required jars.
* app - Folder with code using java-node.
	* lib - Javascript code using java-node.
	* index.html - A web page to render.
	* browser.js - Starts the app and creates a browser window to render HTML (NodeJS file).
	* package.json - Points to the app's main file and lists its details and dependencies of APPLICATION project.
* resources - resources for particular operating system. You can change logo package in this folder.
* tasks - build and development environment scripts.
* package.json - Points to the app's main file and lists its details and dependencies of ELECTRON project.
* pom.xml - It refers to the java project.
* .gitignore - Ignore directories by entering the directory name into the file.


#Author
daniel.garciamandillo@gmail.com

[electron docs]: https://github.com/atom/electron/blob/master/docs/tutorial/using-native-node-modules.md
[Electron project]: https://github.com/mafintosh/electron-prebuilt
[Electron boilerplate]: https://github.com/szwacz/electron-boilerplate
[NodeJS]: https://nodejs.org
[supported platforms]: https://github.com/atom/electron/blob/master/docs/tutorial/supported-platforms.md
[supported JVM]: https://github.com/joeferner/node-java/blob/master/README.md
[Node-java project]: https://github.com/joeferner/node-java
[image-tutorial]: https://github.com/DanielGarciaMandillo/electron-node-java/blob/master/app/img/tutorial.png "Tutorial image"
