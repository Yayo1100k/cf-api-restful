# Práctica 5: API RESTful

Proyecto de Node.js y Express 5.1.0 para administrar sensores y agregar mediciones.

## Iniciar en GitHub Codespaces

Abre este repositorio con **Code > Codespaces > Create codespace on main**. En la terminal ejecuta:

```bash
npm install
npm start
```

La terminal debe mostrar `Servidor escuchando en el puerto: 3000`. En la pestaña **Ports**, copia la URL reenviada del puerto 3000. Cambia su visibilidad a **Public** para probar la API desde un cliente externo, si tu cuenta lo permite.

## Rutas implementadas

| Método | Ruta | Resultado |
| --- | --- | --- |
| GET | `/` | Mensaje de ayuda, 200 |
| GET | `/sensores` | Lista de sensores, 200 |
| POST | `/sensores` | Sensor creado, 201 |
| GET | `/sensores/:sensorId` | Sensor encontrado, 200; inexistente, 404 |
| POST | `/sensores/:sensorId/mediciones` | Medición creada, 201; sensor inexistente, 404 |

Al iniciar hay un sensor con `id: 0` y dos mediciones. Los datos permanecen en memoria y se reinician cuando se detiene el servidor.

## Pruebas para la práctica

1. Envía `GET` a `<URL_BASE>/sensores`. Debes obtener estado `200` y un arreglo con el sensor inicial.
2. Envía `POST` a `<URL_BASE>/sensores/0/mediciones` con `Content-Type: application/json` y el cuerpo siguiente:

```json
{
  "momento": "2020-10-23T20:51:39.720Z",
  "valor": 27.8,
  "unidad": "ºC"
}
```

Debes obtener estado `201` y una medición con `id: 2` en la primera ejecución. Consulta de nuevo `GET /sensores` para comprobar que el sensor tiene tres mediciones.

La tabla conceptual de la práctica menciona más rutas, pero el código solicitado en la sección de implementación contiene las cinco rutas incluidas aquí.
