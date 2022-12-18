"use strict";
/*export interface Vehicle {
    model: string,
    color: string,
    year: number,
    power: number
}*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plane = exports.Boat = exports.Car = exports.Vehicle = void 0;
class Vehicle {
    constructor(m, c, y, p) {
        this.model = m;
        this.color = c;
        this.year = y;
        this.power = p;
    }
}
exports.Vehicle = Vehicle;
class Car extends Vehicle {
    constructor(m, c, y, p, b, w) {
        super(m, c, y, p);
        this.bodyType = b;
        this.wheelCount = w;
    }
}
exports.Car = Car;
class Boat extends Vehicle {
    constructor(m, c, y, p, d) {
        super(m, c, y, p);
        this.draft = d;
    }
}
exports.Boat = Boat;
class Plane extends Vehicle {
    constructor(m, c, y, p, w) {
        super(m, c, y, p);
        this.wingspan = w;
    }
}
exports.Plane = Plane;
