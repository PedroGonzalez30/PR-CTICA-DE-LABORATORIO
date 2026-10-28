Explorador movil

Requisitos
Node.js
Un editor de codigo
Expo Go instalado en un telefono Android o iOS
Telefono y computadora en la misma red local 

Instalación

bash
    git clone <[url-del-repositorio](https://github.com/PedroGonzalez30/PR-CTICA-DE-LABORATORIO)>
    cd explorador-movil
    npm install

Proyecto desde cero:

bash
    npx create-expo-app@latest explorador-movil --template blank
    cd explorador-movil
    npx expo install expo-camera expo-location expo-sensors

Ejecucion

bash
    npx expo start


Permisos

    Camara: se pide al abrir el modulo. Si se rechaza, la app muestra una explicacion y un boton para solicitarlo de nuevo. Si el sistema ya no permite preguntar, indica que se active desde los ajustes del telefono.

    Ubicacion: se pide solo al tocar "Obtener mi ubicacion". Si se rechaza, se muestra un mensaje.

    Privacidad: la app no guarda, envia ni publica la fotografia ni la ubicacion.

Limitaciones conocidas

    La fotografia solo se muestra en pantalla; no se guarda en la galeria y se pierde al cerrar la app.

    La precision de la ubicacion es una estimacion del dispositivo.

    La brujula calcula la direccion con los ejes X e Y, suponiendo el telefono horizontal.

    Una vez concedido, Android recuerda el permiso para Expo Go y no vuelve a preguntar. Para repetir la prueba hay que quitarlo en Ajustes -> Aplicaciones -> Expo Go -> Permisos.

Documentacion consultada

Expo Camera: https://docs.expo.dev/versions/latest/sdk/camera/
Expo Location: https://docs.expo.dev/versions/latest/sdk/location/
Expo Sensors: https://docs.expo.dev/versions/latest/sdk/sensors/