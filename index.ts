import express, { Express, Request, Response } from "express"
import bodyParser from "body-parser"

const app: Express = express()
const port: number = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// vehicles custom classes (vehicles.ts file)
import { Vehicle, Car, Boat, Plane} from './vehicles'

// server
app.get("/", (req: Request, res: Response) => {
    res.send("Express application!")
})

app.listen(port, () => {
    console.log("Server is listening at http://localhost:" + port)
})

// Task 1 get route
app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello world")
})

// Task 2,3

let vehicles: Vehicle[] = []
app.post("/vehicle/add", (req: Request, res: Response) => {
    let n: number = vehicles.length

    let v: Vehicle = {
        model: String(req.body.model),
        color: String(req.body.color),
        year: Number(req.body.year),
        power: Number(req.body.power)
    }

    if (req.body.bodyType && req.body.wheelCount) {
        v = new Car(String(req.body.model),
            String(req.body.color),
            Number(req.body.year),
            Number(req.body.power),
            String(req.body.bodyType),
            Number(req.body.wheelCount))
    } else if (req.body.draft){
        v = new Boat(String(req.body.model),
            String(req.body.color),
            Number(req.body.year),
            Number(req.body.power),
            Number(req.body.draft))
    } else if (req.body.wingspan){
        v = new Plane(String(req.body.model),
            String(req.body.color),
            Number(req.body.year),
            Number(req.body.power),
            Number(req.body.wingspan))
    }

    //console.log(v)
    
    if (n < vehicles.push(v)) {
        res.status(201)
        //console.log(vehicles[0])
        res.send("Vehicle added")
    } else {
        res.send("Nothing added")
    }
})

// Task 4

app.get("/vehicle/search/:model", (req: Request, res: Response) => {
    let indx = searchVehicle(req.params.model);
    if(indx != -1){
        res.send(vehicles[indx])
    }else{
        //res.status(404)
        res.send(404)
    }
})

function searchVehicle(model: String): number{
    let indx = -1;
    for(let i = 0; i < vehicles.length; i++){
        if(vehicles[i].model == model){
            indx = i;
        }
    }
    return indx
}