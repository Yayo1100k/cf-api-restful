const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://app.boomerangapi.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(express.json());

let nextSensorId = 0;
let nextMeasurementId = 0;
const sensors = [];

const temperatureMin = 19;
const temperatureMax = 36;

function exampleMeasurement() {
  return {
    id: nextMeasurementId++,
    momento: new Date().toISOString(),
    valor: Number(
      (Math.random() * (temperatureMax - temperatureMin) + temperatureMin).toFixed(1)
    ),
    unidad: "ºC"
  };
}

sensors[nextSensorId] = {
  id: nextSensorId,
  nombre: "Sensor de Temperatura - UAO - InfoLab",
  mediciones: [exampleMeasurement(), exampleMeasurement()]
};
nextSensorId++;

app.get("/", (req, res) => {
  res.status(200).send("Agrega /sensores al final de la URL");
});

app.get("/sensores", (req, res) => {
  res.status(200).json(sensors);
});

app.post("/sensores", (req, res) => {
  const sensor = { ...req.body, id: nextSensorId };
  sensors[nextSensorId++] = sensor;
  res.status(201).json(sensor);
});

app.get("/sensores/:sensorId", (req, res) => {
  const sensor = sensors[req.params.sensorId];

  if (sensor === undefined) {
    return res.status(404).send(`El sensor con id: ${req.params.sensorId} no existe`);
  }

  res.status(200).json(sensor);
});

app.post("/sensores/:sensorId/mediciones", (req, res) => {
  const sensor = sensors[req.params.sensorId];

  if (sensor === undefined) {
    return res.status(404).send(`El sensor con id: ${req.params.sensorId} no existe`);
  }

  const measurement = { ...req.body, id: nextMeasurementId++ };
  if (sensor.mediciones === undefined) {
    sensor.mediciones = [];
  }
  sensor.mediciones.push(measurement);

  res.status(201).json(measurement);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto: ${port}`);
});
