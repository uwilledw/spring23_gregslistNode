import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { Exception } from "sass"
import { dbContext } from "../db/DbContext.js"

class CarsService {

    async getCars(query) {
        // NOTE as soon I am talking to our dbContext, I am using and 'speaking' mongoose
        const cars = await dbContext.Cars.find(query)  //
        return cars
    }
    async getCarById(carId) {
        const car = await dbContext.Cars.findById(carId)
        if (!car) {
            throw new BadRequest("Invalid car id")
        }
        return car
    }

    // async getCarByMake(makeQuery) {
    //     const cars = await dbContext.Cars.find({ make: makeQuery })
    //     if (!cars) {
    //         throw new BadRequest("No cars found of that make")
    //     }
    //     return cars
    // }



    async createCar(carData) {
        // NOTE this is super similar to when we say 'res.data.map(new Model(res.data)) in our front-end services
        // NOTE this time I am saying, take the req.body payload and mongoose turns it into our Schema to then get stored in our database
        const newCar = await dbContext.Cars.create(carData)
        return newCar
    }

    async editCar(carEdits, carId) {
        const originalCar = await this.getCarById(carId) //find the orig. car in the database

        // NOTE set the orig car properities equal the changes that came in from the req.body
        originalCar.make = carEdits.make ? carEdits.make : originalCar.make
        originalCar.model = carEdits.model ? carEdits.model : originalCar.model
        originalCar.year = carEdits.year || originalCar.year
        originalCar.price = carEdits.price ? carEdits.price : originalCar.price
        originalCar.description = carEdits.description ? carEdits.description : originalCar.description
        originalCar.leaksOil = carEdits.leaksOil ? carEdits.leaksOil : originalCar.leaksOil
        originalCar.transmissionType = carEdits.transmissionType ? carEdits.transmissionType : originalCar.transmissionType

        await originalCar.save() //// NOTE save those changes to the document in the database

        return originalCar
    }

    async deleteCar(carId) {
        // await dbContext.Cars.findByIdAndDelete(carId)

        // NOTE this does the same thing as line 46
        const foundCar = await this.getCarById(carId)
        await foundCar.remove()
        return
    }


}

export const carsService = new CarsService()