"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// vehicles custom classes (vehicles.ts file)
const vehicles_1 = require("./vehicles");
// server
app.get("/", (req, res) => {
    res.send("Express application!");
});
app.listen(port, () => {
    console.log("Server is listening at http://localhost:" + port);
});
// Task 1 get route
app.get("/hello", (req, res) => {
    res.send("Hello world");
});
// Task 2,3
let vehicles = [];
app.post("/vehicle/add", (req, res) => {
    let n = vehicles.length;
    let v = {
        model: String(req.body.model),
        color: String(req.body.color),
        year: Number(req.body.year),
        power: Number(req.body.power)
    };
    if (req.body.bodyType && req.body.wheelCount) {
        v = new vehicles_1.Car(String(req.body.model), String(req.body.color), Number(req.body.year), Number(req.body.power), String(req.body.bodyType), Number(req.body.wheelCount));
    }
    else if (req.body.draft) {
        v = new vehicles_1.Boat(String(req.body.model), String(req.body.color), Number(req.body.year), Number(req.body.power), Number(req.body.draft));
    }
    else if (req.body.wingspan) {
        v = new vehicles_1.Plane(String(req.body.model), String(req.body.color), Number(req.body.year), Number(req.body.power), Number(req.body.wingspan));
    }
    //console.log(v)
    if (n < vehicles.push(v)) {
        res.status(201);
        //console.log(vehicles[0])
        res.send("Vehicle added");
    }
    else {
        res.send("Nothing added");
    }
});
// Task 4
app.get("/vehicle/search/:model", (req, res) => {
    let indx = searchVehicle(req.params.model);
    if (indx != -1) {
        res.send(vehicles[indx]);
    }
    else {
        //res.status(404)
        res.send(404);
    }
});
function searchVehicle(model) {
    let indx = -1;
    for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].model == model) {
            indx = i;
        }
    }
    return indx;
}
