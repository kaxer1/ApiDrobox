# ApiDrobox
## Descripción
El presente proyecto tiene como objetivo consumir la API de dropbox a traves de una aplicación desarrollada en ionic 4. 

### Pre-requisitos 📋
Tener instalado las siguientes herramientas para el desarrollo de la aplicacion.
* [ionic 4](https://ionicframework.com/docs/installation/cli) - framework 
* [Cordova](https://cordova.apache.org/#getstarted) - para generar la apk
* [Visual Studio Code](https://code.visualstudio.com/) - Editor de codigo
* [Android Strudio](https://developer.android.com/studio) - Sdk de android studio
* [Nodejs](https://nodejs.org/es/download/) - para descargar dependencias
* [Angular cli](https://cli.angular.io/) - framework 

## Desarrollo desde cero

### Paso 1
Lo primero que se debe hacer es ingresar a la siguiente página https://www.dropbox.com/developers/documentation, en la cual deberan
loguearse con su cuenta de dropbox y crear un nueva nueva app o proyecto con el cual podra obtener el access token necesario para 
poder realizar las consultas de las carpetas y archivos que tenga el usuario. Esto se lo puede realizar mediante el metodo POST 
que se vera implementado en el código.
### Paso 2
Crear un proyecto completamente en blanco con el comando 
```
ionic start <nombre de la app> blank
```
### Paso 3
Crear el servicio que se conectara a la API de dropbox y los métodos necesarios para el proyecto
```
ionic g service services/dropbox
```
### Paso 4
Instalar la siguiente dependencia mediante la consola y dendro del proyecto.
```
npm i @ionic/lab
```
El siguiente comando levantar el servidor de ionic y a la vez ayudara a visualizar mejor el desarrollo de la aplicación 
a través del navegador.
```
ionic server --lab
```
### Paso 5
Codificar siguiendo la guia de este repositorio o tambien puede seguir el tutoria en el siguiente video de [Youtube - AppDropbox](https://www.youtube.com/watch?v=RnQBAMn5ZMw&feature=youtu.be)

## Implementación a través de la clonación del repositorio
### Paso 1
Descargar este repositorio con el siguiente comando
```
git clone https://github.com/kaxer1/ApiDrobox.git
```
### Paso 2
Entrar en la carpeta clonada y ejecutar mediante consola la siguiente comando. 
```
npm install
```
Esto hara que se descargen todas las dependencias que se necesitan para que el proyecto pueda ser ejecutado mediante consola.
### Paso 3
Levantar el servidor de ionic con el comando 
```
ionic server 
```
### Paso 4
mejorar el codigo o seguir el siguiente turorial para saber el funcionamiento de la aplicacion [Tutorial AppDropbox](https://www.youtube.com/watch?v=RnQBAMn5ZMw&feature=youtu.be)

## Comandos para crear la apk usando cordova
Primero preparar la plataforma de android con el comando
```
ionic cordova prepare android
```
Ahora generar la apk con el comando
```
ionic cordova build android
```


