import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
    constructor() {
        super('api/cars')
        this.router
            .get('', this.getCars)
            .get('/:carId', this.getCarById)
            // .get('', this.getCarByMake)
            .post('', this.createCar)
            .put('/:carId', this.editCar)
            .delete('/:carId', this.deleteCar)
    }

    async getCars(req, res, next) {
        try {
            // NOTE grab the query from HTTP request
            const query = req.query
            const cars = await carsService.getCars(query)
            return res.send(cars)
        } catch (error) {
            next(error)
        }
    }

    async getCarById(req, res, next) {
        try {
            const carId = req.params.carId
            const car = await carsService.getCarById(carId)
            res.send(car)
        } catch (error) {
            next(error)
        }
    }

    // NOTE because our 'getCars' method supports a univ. query.... we don't need to worry about creating these indiv. requests
    // async getCarByMake(req, res, next) {
    //     try {
    //         const make = req.query
    //         const cars = await carsService.getCarByMake(make)
    //         res.send(cars)
    //     } catch (error) {
    //         next(error)
    //     }
    // }


    async createCar(req, res, next) {
        try {
            // NOTE grab the 'body' or object that was sent w this request
            const carData = req.body
            const newCar = await carsService.createCar(carData)
            res.send(newCar)
        } catch (error) {
            next(error)
        }
    }

    async editCar(req, res, next) {
        try {
            const carEdits = req.body
            const carId = req.params.carId
            const editedCar = await carsService.editCar(carEdits, carId)
            res.send(editedCar)
        } catch (error) {
            next(error)
        }
    }

    async deleteCar(req, res, next) {
        try {
            const carId = req.params.carId
            await carsService.deleteCar(carId)
            res.send(`Car at ${carId} was deleted`)
        } catch (error) {
            next(error)
        }
    }


}