# Electron Java Angular Project

### Objetivo de la documentación

Desarrolladores Java para implementar un proyecto Java con Maven con una interfaz de usuario basado en Angular 2 y Electron con Typescript para un tipado estático.

### Estructura de la aplicación
Un proyecto Java que usa Maven tiene la siguiente estructura en la raiz del proyecto:
```
    --- src |--- main/java > java code...
            |--- test/java > java test code...
    --- pom.xml
```
### Integrar el proyecto Electron Java Angular

1. ***Descargar el proyecto [Electron Node Angular][eja1] desde Github***
    1. Puedes descargar el proyecto como zip.
    2. Puedes hacer una copia del repositorio con "Fork".

2. ***Copiar el proyecto Electron-Node-Angular en el mismo nivel de tu proyecto Java, la estructura debería ser:***
    ```
        [your Java project] --- src
        [your Java project] --- pom.xml
        [Electron  project] --- app
        [Electron  project] --- resources
        [Electron  project] --- tasks
        [Electron  project] --- gulpfile.js
        [Electron  project] --- tsconfig.json
        [Electron  project] --- typings.json
    ```
    También se incluye el package.json, si ya tienes un package.json en tu proyecto Java debes combinar ambos para un correcto funcionamiento.

    *Ahora tienes tu proyecto Java (backend) integrado con el proyecto Electron Node Angular (frontend).*

### Frontend con Java

- ***Angular-Electron API: Basado en [angular-electron][ae1].***
    
    
    La estructura del API es el siguiente:
    - __Carpeta electron__: aquí encontramos el nucleo de la aplicación encargado de que todo el código sea ejecutado en el proceso principal de Electron.
    - __Archivos app_ui.ts y main.ts__: de esta forma se carga el proceso de renderizado del browser.

- ***Actualización de la API Angular-Electron***
    

    Se debe tener en cuenta que el core principal del proyecto está basado en [angular-electron][ae1], este puede que se actualice y necesitemos alguna funcionalidad nueva para poder beneficiarnos de ella.
    
    En este caso se debe tener en cuenta varios aspectos:
    
    1. Actualizar únicamente los archivos de la carpeta __"electron"__ y los archivos __"app_ui.ts y main.ts"__ manteniendo las rutas de los imports de forma correcta en nuestro proyecto. En el caso de que haya nuevos archivos añadirlos siguiendo un órden lógico en el árbol de carpetas.
    2. Revisar las versiones de las dependencias en el archivo package.json de la carpeta __"app"__, si el proyecto se actualiza es posible que las versiones hayan cambiado.

        **Ayuda a la comunidad!** Con el fin de tener el proyecto actualizado, se sugiere que si se ha necesitado actualizar dicho proyecto y se haya comprobado que todo es correcto, hacer un pull-request al proyecto [Electron Node Angular][eja1] para poder aprobarlo y que no quede obsoleto.

- ***Manejo de la API Angular-Electron***

    Manejo de electron API: ¿qué podemos modificar de estos archivos? 
    La mayoría de estos archivos son de arquitectura de la aplicación y permiten la comunicación ICP entre el proceso principal y el proceso de renderizado uniendo Angular y Electron, pero ¿qué cosas pueden ser útiles para un desarrollador?.

    - ***Archivo electron_app.ts :***
    nos encontramos con la función initializeMainWindow().
    En ella se puede modificar las dimensiones del browser, la url que debe cargar al iniciarse o si se quiere que por defecto se abran las devTools de Chrome (por defecto están abiertas ya que para el desarrollador son muy útiles pero quizás para un usuario final esto no lo queremos, pues se desactivan desde está función)

* ***Carpeta app:***

    En esta carpeta nos encontramos con lo siguiente:
    
    * ***Electron API:*** explicado anteriormente
    * ***Angular:*** en esta carpeta están los archivos desarrollados relacionados con Angular 2 y en la que se deben incluir los archivos nuevos desarrollados.
    * ***index.html:*** es el archivo html principal de la aplicación y el que se carga en el momento que inicia la aplicación. Debe contener los polyfills de Angular y cargar el archivo app_ui con el tag html ```<script>```. El resto del contenido debe ser desarrollado por el programador como un index normal.
    * ***package.json:*** carga de dependencias para el correcto funcionamiento de la aplicación.

### Ejecutar la aplicación

##### Requisitos
Los siguientes requisitos son necesarios para ejecutar correctamente un proyecto con Java, Angular 2 usando Typescript y Electron:

  - [Node 5][node5]
  - [Npm 3][npm3]
  - [Typescript (install global)][ts]
  - [Typings (install global)][typ]
  - [Python 2.X][pyth]
  * [Plataformas soportadas][suppElec] por Electron
  * [JVM soportadas][suppJava] por node-java

##### Descarga de dependencias

  En la raiz del proyecto ejecutar:

```sh
npm run download
```
 Este comando nos descarga todas las dependencias necesarias de los repositorios npm para lanzar la aplicación e instala los typings necesarios para la compilación de los archivos typescript

##### Lanzar la aplicación

En la raiz del proyecto ejecutar:
```sh
npm start
```
  Este comando tiene el siguiente __ciclo de vida:__

1. Ejecuta Maven para generar el .jar.
2. Ejecuta ts-java generando y preparando los objetos y clases Java para poder usarlos desde Angular.
3. Compilación de todos los archivos typescript a javascript
4. Todos los recursos son enviados a la carpeta de construcción (build)
5. Lanza electron usando los archivos generados en la carpeta build

Por el momento, solo se usa un jar en el que se debe integrar todas las dependencias en él. Para ello hay que indicar en el pom.xml del proyecto Java que haga esa tarea:

```xml
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

### Usar Java en Angular (node-java y ts-java)

Para poder usar tanto los objetos, clases, interefaces... de Java en el frontend necesitamos dos herramientas:

 * ***node-java*** es un paquete Node que proporciona una API entre aplicaciones Node y aplicaciones Java que permite usar Java en código Javascript

 * ***ts-java*** es una herramienta que genera ficheros Typescript respecto a clases Java, permitiendo usar clases Java en lenguaje Typescript encapsulando el archivo que genera el paquete node-java.

    Se puede configurar en el fichero package.json de la raiz del proyecto:
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
    Principales propiedades:
    - tsJavaModulePath : indica donde se generan todos los objetos Java en lenguaje typescript
    - javaTypingsPath : indica donde se encuentran los typings necesarios en la compilación typescript
    - classpath: indica donde se encuentra el jar que se va a utilizar
    - packages: un array que contiene los paquetes que queremos exportar como modulos typescript
    
    Documentación completa de la herramienta [ts-java][tsJava]

### Generar paquete de aplicación

Para generar un paquete de instalación ejecutar el comando:

```sh
  gulp release
```

Esto generará un paquete de instalación dependiendo en el SO que nos encontremos. Es decir, si estamos en un Linux 64bits generará un paquete para Linux de 64bits, si estamos en Windows generaría un .exe de instalación y con Mac lo mismo.

__* Windows:__ para generar un paquete es requerido NSIS 3.X. Añadirlo al PATH de variables de entorno en Windows

El paquete será creado y se localizará en la carpeta ***releases*** en la raiz del proyecto

##### Carpeta resources

En esta carpeta de recursos existen tres carpetas, una por cada plataforma. Se recomienda no modificar ningún archivo ya que son archivos necesarios de cada plataforma para generar la aplicación.
Se puede modificar el icono que tendra nuestra aplicación.

##### JVM Embebida

La posibilidad de empaquetar una aplicación permite muchas variantes, una de ellas es empaquetar una JVM para permitir al usuario no tener que instalar Java para ejecutar la aplicación, por lo que podemos empaquetar la JVM en el paquete de instalación. Se debe tener en cuenta que esto aumenta el tamaño de la aplicación pero reduce la complejidad para el usuario a la hora de ejecutar una aplicación.

Para introducir modificaciones en la generación del paquete se deben modificar las tareas releases situadas en la carpeta tasks.

Por ejemplo, en linux:

  - En la carpeta ___resources/linux___ tenemos la jre que queremos integrar en la aplicación, además un archivo ___postinstall___ que se encargará de instalar la JVM.
  - En el fichero ___release_linux___ tenemos la función que genera el paquete ___(packToDebFile)___. En ella se ha introducido la siguiente funcionalidad:

    1. Copiar la JRE que tenemos en resources al destino (carpeta build):
    
        ```sh
          //Copy jvm
          projectDir.copy('resources/linux/jre-8u66-linux-x64.tar.gz', readyAppDir.path('jre-8u66-linux-x64.tar.gz'));
        ```
        
    2. Copiar el archivo postinstall e instroducirlo en la ruta por defecto de los paquetes .deb, además se le da permiso de ejecución a root para ejecutar el script, por lo que al instalar la aplicación requiere permisos de administrador:
    
        ```sh
          // Copy preinst
          var postinst = projectDir.read('resources/linux/DEBIAN/postinst');
          packDir.write('DEBIAN/postinst', postinst);
          fs.chmodSync(packDir.path('DEBIAN/postinst'), '0755');
        ```
        
### Autor

Daniel García Mandillo


[eja1]: <https://github.com/DanielGarciaMandillo/electron-node-java>
[ae1]: <https://github.com/angular/angular-electron>
[node5]: <https://nodejs.org/en/download/>
[npm3]: <https://docs.npmjs.com/getting-started/installing-node>
[ts]: <https://www.npmjs.com/package/typescript>
[typ]: <https://www.npmjs.com/package/typings>
[pyth]: <https://www.python.org/downloads/>
[suppElec]: <https://github.com/electron/electron/blob/master/docs/tutorial/supported-platforms.md>
[suppJava]: <https://github.com/joeferner/node-java/blob/master/README.md>
[tsJava]: <https://www.npmjs.com/package/ts-java>
