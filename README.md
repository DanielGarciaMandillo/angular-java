# Angular Java Project

### Requirements

The next requirements are necessary to execute a Java, Angular 2 using typescript and Electron project:

- [Java Development Kit][JDK]
    - **Windows:** Java Development Kit 32 bits is required. If you have Windows 64 bits you have to use JDK 32 bits.
    
    - **Linux:** Java Development Kit is required. Download 32 or 64 bits version depending of your Linux platform.
JDK download from [Oracle official website][JDK]

- [Maven][MAVEN]
    - **Windows:** download binary Maven version from [official website.][MAVEN] 
    
        1. Add JAVA_HOME environment variable. Add the path line with the JDK path installed in previous step. [Guide to add environment variables.][MAVEN_GUIDE_WIN_ENV]
        
        2. Unzip the maven file download and copy in a path. For example C:\maven.
        
        3. Add MAVEN_HOME environment variable. Add the path line with the MAVEN path (C:/maven/bin) pointing to bin folder.

        [How to install Maven on Windows.][MAVEN_GUIDE_WIN]
    
    - **Linux:** using command line to install maven on Linux:
    
        ```
        apt-get install maven
        ```
    
    Run the command ```mvn-v``` to check that the install has been correct.

- [Python 2.X][PYTHON]
    - **Windows:** download from the official website Python version 32 or 64 bits depending of your platform. Then a installer will be downloaded, install it.

    - **Linux:** using command line

        ```
        apt-get install python2.7
        ```
    
    Run the command ```python --version``` to check everything is correct.

- [Node 5][NODE5]
    - **Windows:** download Node 5 last version from [official Node website][[NODE5]. You have to download the 32 bits version, even if you have 64 bits Windows version. Then a installer will be downloaded, install it.
    
        To end, add environment variable Node to PATH. Add the path %AppData%\npm\node_modules for using Node and npm modules.

    - **Linux:** using command line:

        ```
        curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
        sudo apt-get install -y nodejs
        ```

        Then you’ ll have the Node 5 last version installed on your computer.
        
    Run the command ```node -v``` to check everything is correct.

- [Build-essential][BUILD_ESSENTIAL]

    ***Only for Linux!*** A C compiler have to be installed for node-java project. Linux uses g++. Also build-essential gives up any Linux development tools. Run for download it:
    
    ```
    apt-get install build-essential
    ```

- [Node-gyp][NODE-GYP]

    ***Only for Windows!***
    
    ```
    npm install -g node-gyp
    ```
        
    - Microsoft Visual Studio C++ 2015 [(Express version)][VS-EXPRESS] is required!

- [Typescript][TYPESCRIPT]

    To install Typescript global npm package you have to type the next command on Linux or Windows console:
    
    ```
    npm install -g typescript
    ```

- [Typings][TYPINGS]

    To install Typings global npm package you have to type the next command on Linux or Windows console:
    ```
    npm install -g typings
    ```

- [Node-java][NODE_JAVA]
 
    **All operating systems:**

    Node-java will be installed how a dependence of our project. Node-java has some importants requirements:
    
    - Python version 2.X is required. It doesn’t work with 3.X version.
    
    - If you see an error such as "Call to 'node findJavaHome.js' returned exit status 1" Try running node findJavaHome.js in the node-java directory to see the full failure message.
    
    - If you are having problems finding 'jni.h'. Make sure you have the JDK installed not just the JRE. If you are using OpenJDK you want the openjdk-7-jdk package, not openjdk-7-jre.
        
    **Windows:**
    
    
    - For Windows 64 bits platforms: having installed a Node 32 bits version instead 64 bits version as it indicated in the requirements.
    
    - For Windows 64 bits platforms: having installed a JDK 32 bits version instead 64 bits version as it indicated in the requirements. If you have JDK 64 bits you can see LNK2001 error messages.
    
    - node-gyp npm module is required.
    
        ```
        npm install -g node-gyp
        ```
            
    [More info about node-java][NODE_JAVA]

- [Electron supporting platforms][ELECTRON]
 

    Angular-Java is based on Electron. So our operating system must be supported by Electron. Next platforms have Electron support:
    
    - **OS X**
    
        - Minimum version OS X 10.9
        - OS X 10.9 version or later have to be 64 bits version.
        
    - **Windows**
        - Minimum version Windows 7
        - Windows 7 or later can be 32 and 64 bits version
        
    - **Linux**
        - Minimum version Ubuntu 12.04 (32 and 64 bits).
        - Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:
        
            - Ubuntu 12.04 and later
            - Fedora 21
            - Debian 8

###Java with Angular 2 app GUI

In this tutorial is explained step by step how implement a user interface using Java and Angular 2 with Typescript.

Typescript is a recommended language for using Angular 2. Electron is a framework that lets you write cross-platform desktop applications using JavaScript, HTML and CSS (our Angular 2 project).

Also Angular-Java project includes releases tasks to build a package ( .deb or .exe depending of our operating system). The package created could install in a user machine. Easy for users.

####Simple example guide

1) Clone the project. Two ways:
- HTTPS
    
```
git clone https://github.com/DanielGarciaMandillo/angular-java.git
```
    
- SSH
    
```
git clone git@github.com:DanielGarciaMandillo/angular-java.git
```
    
2) Go to folder

```
cd angular-java
```
    
3) Download project dependences

```
npm run download
```
    
4) Execute the application

Run ```npm run full``` at the first time than the project is executed or Java code changes.

Run ```npm start``` with Angular code changes.

####Example application: Code description

#####_Java code_

The Java code in this project is located on src folder in the project root.

In the example, Java project is used with Maven. The code have two Java classes: Repository and Item.

- ***Repository:*** handles operations against a BBDD H2 (is a Maven dependence database)

```java
public Repository() {
    try {
        Class.forName("org.h2.Driver");
        con = DriverManager.getConnection("jdbc:h2:./bbdd/bbdd", "bbdd", "");
        stmt = con.createStatement();
    } catch (Exception e) {
        System.out.println(e.getMessage());
    }
}

public void createTable() {
    try {
        stmt.executeUpdate("CREATE TABLE table ( item varchar(50) )");
    } catch (Exception e) {
        System.out.println(e.getMessage());
    }
}

public void deleteTable() {
    try {
        stmt.executeUpdate("DROP TABLE table");
    } catch (Exception e) {
        System.out.println(e.getMessage());
    }
}

public void insertItem(Item item) {
    try {
    stmt.executeUpdate("INSERT INTO TABLE (item) VALUES ( '" + item.getName() + "' )");
    } catch (Exception e) {
    System.out.println(e.getMessage());  
}

public ArrayList<Item> getDataTable() {
    ArrayList<Item> listResponse = new ArrayList<Item>();
    try {
        ResultSet rs = stmt.executeQuery("SELECT * FROM TABLE");
        getDataResponse(listResponse, rs);
    } catch (Exception e) {
        System.out.println(e.getMessage());
    }
    return listResponse;
}

private void getDataResponse(ArrayList<Item> listResponse, ResultSet rs) throws SQLException {
    while (rs.next()) {
        String name = rs.getString("item");
        listResponse.add(new Item(name));
    }
}

```

- ***Item:*** is a class with one attribute and his getter and setters methods. A Item is added, modified or deleted from the Repository


#####_Angular 2 code_

The Angular code in this project is located on app/angular folder in the project.

The main file is named app.component.ts. This file is developed in typescript language following the conventions that Angular 2 indicates in [Angular 2 Typescript guides.][ANGULAR2_TS_GUIDE]

app.component.ts is the main file that is loaded by Electron. The file contains:

The template contents is a tittle and a ngFor loop for show the Items recovered from the repository Java

```html
<h1>Java Angular Electron</h1>
<li *ngFor="#item of items">
    {{item}}
</li>
```

The item list (items variable) is an attribute of App class. The type of this variable is indicated how string list (String[]).

```ts
export class AppComponent implements OnInit {
    items: string[] = [];
```

ensureJvm() is a method with a promise type in the return. When the JVM is loaded the code inside of ensureJvm() is executed.

All classes and object that are neccesary are imported. Using repository Java method to create the datatable and add the items.

```ts
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
    ...
    ...
    }
}
```

To end, using ngFor loop. This provides the way to show our Item list on the browser using Angular 2. 

```ts
//Get bbdd data and bind with GUI
let list = repository.getDataTable();
for (var i = 0; i < list.size(); i++) {
    let itemAux: any = list.get(i);
    this.items.push(itemAux.getName());
}
```

###GUI Angular with Electron

This section explained the process the implementation of our GUI using Angular 2 with Electron.

Our implementation between Angular and Electron iis based on [angular-electron][ANGULAR_ELECTRON] project. Specific [commit in this link.][ANGULAR_ELECTRON_COMMIT]

Angular-Electron has two parts that are described in next lines:

- ***electron folder:*** in this folder is located the core application. It’s responsible that all Angular 2 Typescript code run on the Electron main process.

- ***app_ui.ts and main.ts files:***  are own files for viewing the GUI in the process that control the browser embedded in electron (Electron render process).

#####Java application requirements

Java project must be include in a Maven project with the next structure:

```sh
--- src |--- main/java > java code...
        |--- test/java > java test code...
--- pom.xml
```
#####How integrate our Java project with Java Angular:

1. ***Download [Java Angular][ANGULAR-JAVA] project from Github***
    - You can download a zip project or
    - You can a repository copy with "Fork".
2. ***Copy Java-Angular project in the same level of your Java project.*** The folder structure should be:
```sh
[your Java project] --- src
[your Java project] --- pom.xml
[Electron  project] --- app
[Electron  project] --- resources
[Electron  project] --- tasks
[Electron  project] --- gulpfile.js
[Electron  project] --- tsconfig.json
[Electron  project] --- typings.json
[Electron  project] --- package.json
```
3. ***In this version, only one JAR file is used.*** So this JAR file must integrating all dependences of our project. To get this, the pom.xml file must be modified:

```x
..
..
<plugin>
<artifactId>maven-assembly-plugin</artifactId>
<configuration>
  <outputDirectory>app/bin</outputDirectory>
  <descriptorRefs>
    <descriptorRef>jar-with-dependencies</descriptorRef>
  </descriptorRefs>
</configuration>
</plugin>
..
..
```
4. ***Now the Java project (backend) is integrated with Java-Angular*** (back and frontend) project!.

###API Angular-Electron

This section describes the API Angular-Electron files and his main functions.

- ***App folder:*** is composed of:

    - _Electron API:_ this has been explained in previous section.
    
    - _Angular folder:_ all Angular 2 files developed are in this folder. New Angular 2 files developed must locate in this folder also.
    
    - _index.html:_ is the main file of our application. It is the first file that is loaded and it starts the application. It contains all Angular polyfills and the script loaded html (script tag) to load app_ui file. 
    
        The Java developer must include all new components/views developed.
        Also, you can include more info in this file: meta tag for SEO position, viewports responsive, cross-browsing and compatible…
    
        In conclusion, the main function of index.html is the load of new components.
    from Git
    - package.json: This document is all you need to know about what's required in your package.json file. This file is important in the build of the application package:
    
        - **name:** project name
        - **productName:** application name when it is installed in the computer
        - **description:** description application you can see in the install process
        - **version:** version application you can see in the install process
        - **author:** author application you can see in the install process

- ***angular-electron*** could be updated...then if our Angular-Java project is based on angular-electron. How can i update my project? If a new update is available and I need the update because has new functionality or fix bugs… In this case, it should take into account three points:

    - Update only files inside “electron” folder and the two files “app_ui.ts” and “main.ts”. Keeping the correct import paths. If new files are created: add them inside elecfrom Gittron folder with a logical order in tree folder structure
    
    - Check all version in package.json file (package.json located in “app” folder. An update can force change packages versions
    
    - Contributes to the community! The goal is have the updated project. It is suggested that if the project has needed to update and have verified that everything is correct, do a pull-request to the project Angular-Java to approve and not obsolete. 

    [Full documentation Angular Electron][ANGULAR_ELECTRON]

###API Angular-Electron management

What can we modify these files? Most of these files are application architecture and allow ICP communication between the process and the rendering process by attaching Angular and Electron, but what things can be useful for a developer who wants to implement the GUI with Angular 2 in a Java application?.

    Most electron files should not be modified by the Java developer because most handles communication between Electron and Angular 2.
    
    However, we can have control over the window we opened.
    
    In the electron_app.ts file you find the initializeMainWindow() method. It contains two parts:

- ***BrowserWindow:*** It allows to change the settings and appearance of the application window when it starts. There are many options with which to customize the window, some are:

    - width: width of the window.
    - height: height of the window.
    - minWidth: minimum width of the window.
    - minHeight: minimum height of the window.
    - resizable: the window can be resized.
    - movable: the window can be moved.
    - center: the window will open in the center of the screen.
    - closable: the window can be closed.
    - fullscreen: the window will be full screen.
    - kiosk: the window will be in kiosk mode (referred to hide the navigation bar).
    
    [BrowserWindow full documentation][BROWSER-WINDOW]

- ***WebContents:*** is a BrowserWindow property. Responsible for rendering and control the website.
It has many events and methods. The most important and used for a developer are:

    - openDevTools: Invoking this method if you want to open devTools console when application starts.
    
    - loadUrl:  the default page that opens when you start the application. Default is the index, but can refer to any web page as www.google.es
    
    [WebContents full documentation][WEB-CONTENTS]

###Angular Java running application
#####Download dependency
In the project root execute:

```
npm run download
```

This command downloads all the necessary dependencies from repositories to launch the application and installs the necessary typings for the compilation of the typescript files.

The first time you download the project need to download dependencies, other times we execute the application will not be necessary to download them.

Only in the case that the versions have changed or unload the project again you will need them down again.

#####Execute the application
There are two possibilities to implement the project:

1. ***Compiling Java:*** You must run the command ```npm run full```

    This command should be used the first time you download the project or when there has been a change in Java code and want to recompile. It has the following life cycle:

    1. Maven runs to generate the .jar.
    2. Ts-java runs generating and preparing objects and Java classes to save them from the typescript code.
    3. Compilation of all javascript files typescript
    4. All resources are copied to the folder construction (build)
    5. Run electron using the generated files in the folder “build”


2. ***Uncompiled Java:*** You must run the command ``` npm start ```

This command will compile the front of the application, avoiding the Java part and making the lighter process. Must run when no change in the Java code:

1. Compilation of all javascript files from typescript
2. All resources are copied to the folder construction (build)
3. Run electron using the generated files in the folder “build”

###Using Java inside Angular (with node-java and ts-java)
To use objects, classes, interfaces, etc... in the frontend with Java it’s necessary two tools:

- ***node-java:*** Bridge API to connect with existing Java APIs. That allows you to create objects and call Java methods from JavaScript code.

- ***ts-java*** is a tool that generates Typescript files based on Java classes, allowing Typescript use Java language classes and take advantage of type checking of typescript. Ts-java can be configured in the file package.json the root of the project:

```json
"tsjava":
{
  "tsJavaModulePath": "./app/java/tsJavaModule.ts",
  "javaTypingsPath": "../../typings/browser.d.ts",
  "classpath": [
      "app/bin/*.jar"
    ],
  "packages": [
    "com.todo.**"
  ]
}
```

- Main properties:

Modify the following properties in the case that changed the original route of the project. In the case of follow the same structure leave the default paths.

- ***tsJavaModulePath:*** It indicates where all Java objects are generated in typescript language
- ***javaTypingsPath:*** It indicates where necessary typings are in the compilation typescript
- ***classpath:*** It indicates where the JAR file to be used is.

These two properties are important for a developer as they are modified to be:

- ***packages:*** an array containing the packages you want to export as typescript modules. How to add packets:

    - *path.package.** : Package includes classes
    - *path.package.***: Package includes classes and subpackages that are included.
- ***classes:*** an array containing specific class routes. We used to import specific classes of a package instead of having to import all the classes in that package:

    - *java.lang.Boolean*
    - *path.package.MyClass*

[Full documentation tool ts-java][TS-JAVA]

###Generate application package
To generate an installation package run the command:

```
 gulp release
```
This will create an installation package depending on the OS you have. That is, if we are in a 64bit Linux will generate a package for Linux 64bit, if we are in Windows generate an .exe file with the same Mac.

*NOTE: Windows: to generate a package is required NSIS 3.X. Add the PATH environment variable in Windows*

When the task is completed, the package will be created and located in the “releases” folder in the root of the project

#####resources folder
In this folder resources exist three folders, one for each platform. It is recommended not to modify any files as they are necessary files for each platform to build the application. You can change the icon that will our application.

To change the icon simply change the existing icon by which you want to keep the same name and dimensions in the Resources folder of the desired platform.

#####embedded JVM
The ability to package an application allows many variants, one of which is packaging a JVM to allow the user not having to install Java to run the application, so you can pack the JVM in the installation package. Keep in mind that this increases the size of the application but reduces the complexity for the user when running an application.

Node-java uses the default JVM that has the computer at the time in which it is compiled. That is, when the node-java package is downloaded in node_modules folder files generated by the library are compiled. At that time the library is used pointing to JAVA_PATH who was at compile time.

This means that if we have our JAVA_PATH route pointing to /usr/bin/jvm our application there will always seek the JRE to use node-java.

The package.json of the app folder has the following properties:

- ***name:*** project name
- ***productName:*** application name when it is installed in the computer
- ***description:*** description application you can see in the install process
- ***version:*** version application you can see in the install process
- ***author:*** author application you can see in the install process

What we should do is the following:

***Linux:***

1. Create a folder named “java-jre” in /opt/[productName] path and copy in this folder the JRE that we want use.
2. Aiming JAVA_HOME system variable to that folder:
```
export JAVA_HOME=/usr/lib/jvm/java-7-oracle
```
3. Now we can run the command npm run download to download the application.
Once finished, we can see in the file jvm_dll_path.json the path JAVA_HOME used.
4. Copy java-jre folder to /resources/linux/java-jre.
5. Run command “gulp release” to generate the package with a embedded JVM.


###Configuración de Eclipse IDE

Eclipse IDE is the quintessential Java developers. Eclipse has no default editor Typescript, to fix this we can install a plugin to edit Typescript code by following these steps:

1. In Eclipse, install new software on the Help tab
   
    ![img_1](https://cloud.githubusercontent.com/assets/14278993/15475598/2e2a9aa8-210b-11e6-867d-f6871500930b.jpg)

2. Type address http://oss.opensagres.fr/angular2-eclipse/1.0.0-SNAPSHOT/, select Angular2 IDE and Typescript IDE y click on Next

    ![img_1](https://cloud.githubusercontent.com/assets/14278993/15475615/3e7afa06-210b-11e6-826a-63a2acb379b5.jpg)
    Again click on Next for install all selected plugins
    ![img_1](https://cloud.githubusercontent.com/assets/14278993/15475614/3e786034-210b-11e6-9354-c2a1a4866726.jpg)

3. Accept the terms and conditions of the plugin
    
    ![img_1](https://cloud.githubusercontent.com/assets/14278993/15475618/3e895e48-210b-11e6-85a4-7ebafac13a13.jpg)

4. Accept the security warning authentication plugin
    
    ![img_1](https://cloud.githubusercontent.com/assets/14278993/15475617/3e857d5a-210b-11e6-8d29-7800c189d594.jpg)

5. Restart Eclipse and can start using the plugin Typescript

    ![img_1](https://cloud.githubusercontent.com/assets/14278993/15475616/3e80780a-210b-11e6-8aa8-22d73a80608c.jpg)

###Author
Daniel García Mandillo

[JDK]: <http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html?ssSourceSiteId=otnes>
[MAVEN]: <https://maven.apache.org>
[MAVEN_GUIDE_WIN_ENV]: <http://www.computerhope.com/issues/ch000549.htm>
[MAVEN_GUIDE_WIN]: <http://www.mkyong.com/maven/how-to-install-maven-in-windows>
[PYTHON]: <https://www.python.org/downloads>
[NODE5]: <https://nodejs.org/dist/latest-v5.x>
[BUILD_ESSENTIAL]: <http://packages.ubuntu.com/precise/build-essential>
[NODE-GYP]: <https://github.com/nodejs/node-gyp>
[VS_EXPRESS]: <https://www.visualstudio.com/es-es/products/visual-studio-express-vs.aspx>
[TYPESCRIPT]: <https://www.npmjs.com/package/typescript>
[TYPINGS]: <https://www.npmjs.com/package/typings>
[NODE_JAVA]: <https://github.com/joeferner/node-java/blob/master/README.md>
[ELECTRON]: <https://github.com/electron/electron/blob/master/docs/tutorial/supported-platforms.md>
[ANGULAR2_TS_GUIDE]: <https://angular.io/docs/ts/latest/guide/>
[ANGULAR_ELECTRON]: <https://github.com/angular/angular-electron>
[ANGULAR_ELECTRON_COMMIT]: <https://github.com/angular/angular-electron/tree/cab4dc192bd366511ca83e8557f32860aedb0387>
[ANGULAR-JAVA]: <https://github.com/DanielGarciaMandillo/angular-java>
[BROWSER-WINDOW]: <https://github.com/electron/electron/blob/master/docs/api/browser-window.md>
[WEB-CONTENTS]: <https://github.com/electron/electron/blob/master/docs/api/web-contents.md>
[TS-JAVA]: <https://www.npmjs.com/package/ts-java>
