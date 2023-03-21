import { dbContext } from "../db/DbContext.js"




class HousesService {

    async getHouses(query) {
        const houses = dbContext.Houses.find(query)
        return houses
    }

    async createHouse(houseData) {
        const newHouse = dbContext.Houses.create(houseData)
        return newHouse
    }

}

export const housesService = new HousesService()