# electron-node-java

Build cross platform desktop apps with web technologies using java from javascript

- [Electron project]
- [Node-java project]

# How to 

1) Clone the project electron-node-java

* HTTPS

```git clone https://github.com/DanielGarciaMandillo/electron-node-java.git```

* SSH

```git clone git@github.com:DanielGarciaMandillo/electron-node-java.git```

2) Go to folder electron-node-java

```cd electron-node-java```

The native Node modules are supported by Electron, but since Electron is using a different V8 version from official Node, you have to manually specify the location of Electron's headers when building native modules.
You need to setup some environment variables:

```
export npm_config_disturl=https://atom.io/download/atom-shell
export npm_config_target=0.36.1
export npm_config_arch=x64
``` 

npm_config_target is last electron version
npm_config_arch is your arch : x64 or x86
More info in [electron docs]

3) Type ```npm install``` to download dependencies.

4) Type ```mvn clean compile assembly:single``` to generate jar with all dependencies from pom.xml in a single jar.

5) Type  ```npm start``` to open browser.

6) You can use the application:

![alt text][logo]

# Structure

A basic electron-node-java application needs just these files:

* src - Folder with java project sources.
* bin - Folder with required jars.
* node-java - Folder with code using java-node.
	* lib - Javascript code using java-node.
	* index.html - A web page to render.
	* main.js - Starts the app and creates a browser window to render HTML (NodeJS file).
* package.json - Points to the app's main file and lists its details and dependencies.
* pom.xml - It refers to the java project.
* .gitignore - Ignore directories by entering the directory name into the file.
 
#Compile code

- When java code changes in native java project you should generate a new jar: ```mvn clean compile assembly:single```
- When javascript code changes you should restart the browser. Two ways:
	* Type ```npm start```
	* In browser > Edit > View Reload or use shortcut ```Ctrl + R```

#Use maven 

The project includes [node-java-maven] for  manages your node-java classpath by using maven dependency mangement.

To add packages add fields into package.json, example:

```json
 "java": {
    "dependencies": [
      {
        "groupId": "org.apache.lucene",
        "artifactId": "lucene-core",
        "version": "4.9.0"
      }
    ]
  }
```

#Author
daniel.garciamandillo@gmail.com

[electron docs]: https://github.com/atom/electron/blob/master/docs/tutorial/using-native-node-modules.md
[Electron project]: https://github.com/mafintosh/electron-prebuilt
[Node-java project]: https://github.com/joeferner/node-java
[node-java-maven]: https://github.com/joeferner/node-java-maven
[logo]: https://github.com/DanielGarciaMandillo/electron-node-java/blob/master/node-java/img/tutorial.png "Tutorial image"
