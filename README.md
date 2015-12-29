# electron-node-java

Build cross platform desktop apps with web technologies using java from javascript

- [Electron project]
- [Node-java project]
- Based on [Electron boilerplate] for build compilation packages (Linux, Windows and Mac)

# Guide to developers 

This guide will be seen by the developer

##Requeriments

You have to have installed on your computer [NodeJS], [Python 2.X] and [Maven].

You can see [supported platforms] for Electron.

You can see [supported JVM] for Node-java.

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

##Changing code

- When java code changes in native java project you should generate a new jar: 
    * Type ```npm start```, that includes a maven command for generate it.
- When javascript code changes you should restart the browser. Two ways:
	* In browser > Edit > View Reload or use shortcut ```Ctrl + R```

## JVM embedded

This project includes a JVM so the user does not have to install it. You can create a JVM embedded in two steps:

1) Copy JVM and postinst in debian package directory (file release_[YourSystem].js): 

```
  //Copy jvm
    projectDir.copy('resources/linux/jre-8u66-linux-x64.tar.gz', readyAppDir.path('jre-8u66-linux-x64.tar.gz'));
  
  // Copy preinst
    var postinst = projectDir.read('resources/linux/DEBIAN/postinst');
    packDir.write('DEBIAN/postinst', postinst);
    fs.chmodSync(packDir.path('DEBIAN/postinst'), '0755');
```

2) Create postinst script in correct folder

```sh
#!/bin/sh
cd /opt/electron-node-java/;
sudo mkdir -p /usr/lib/jvm/java-8-oracle/jre;
sudo mv jre-8u66-linux-x64.tar.gz /usr/lib/jvm/java-8-oracle;
cd /usr/lib/jvm/java-8-oracle;
sudo tar zxvf jre-8u66-linux-x64.tar.gz;
sudo rm -rf jre;
sudo mv jre1.8.0_66 jre;
sudo rm -rf jre1.8.0_66:
```
Important : The JVM must be the same version as the JDK

##Application deployment

###Linux (Debian)

On main folder of project you should type:

```npm run release```

You can find the package created in ```resources``` folder

###Windows

[NSIS 3.X] is required for this task. Then add its folder in your PATH environment variable.

Comming soon...

###Mac

Comming soon...


# Structure

A basic electron-node-java application needs just these files:

* src/main/java - Folder with java project sources.
* bin - Folder with required jars.
* app - Folder with code using java-node.
	* lib - Javascript code using java-node.
	* index.html - A web page to render.
	* browser.js - Starts the app and creates a browser window to render HTML (NodeJS file).
	* package.json - Points to the app's main file and lists its details and dependencies of APPLICATION project.
* resources - resources for particular operating system. You can change logo package or write script pre/post install package (in this example a JRE is installed).
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
[Python 2.X]: https://www.python.org/downloads
[Maven]: http://maven.apache.org/download.cgi
[VisualStudio 2013]: https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs#DownloadFamilies_2 
[supported platforms]: https://github.com/atom/electron/blob/master/docs/tutorial/supported-platforms.md
[supported JVM]: https://github.com/joeferner/node-java/blob/master/README.md
[NSIS 3.X]: http://nsis.sourceforge.net/Main_Page
[Node-java project]: https://github.com/joeferner/node-java
[image-tutorial]: https://github.com/DanielGarciaMandillo/electron-node-java/blob/master/app/img/tutorial.png "Tutorial image"
