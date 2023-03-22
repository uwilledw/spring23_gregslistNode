import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"




class HousesService {

    async getHouses(query) {
        const houses = dbContext.Houses.find(query)
        return houses
    }

    async getHouseById(houseId) {
        const house = await dbContext.Houses.findById(houseId)
        if (!house) {
            throw new BadRequest('House id invalid')
        }
        return house
    }

    async createHouse(houseData) {
        const newHouse = dbContext.Houses.create(houseData)
        return newHouse
    }

    async deleteHouse(houseId) {
        const house = await dbContext.Houses.findByIdAndDelete(houseId)
        if (!house) {
            throw new BadRequest('No house with that id')
        }
        return
    }

    async editHouse(houseEdits, houseId) {
        const originalHouse = await this.getHouseById(houseId)
        originalHouse.bedroom = houseEdits.bedroom ? houseEdits.bedroom : originalHouse.bedroom
        originalHouse.bathroom = houseEdits.bathroom || originalHouse.bathroom
        originalHouse.level = houseEdits.level ? houseEdits.level : originalHouse.level
        originalHouse.furnace = houseEdits.furnace ? houseEdits.furnace : originalHouse.furnace
        originalHouse.description = houseEdits.description ? houseEdits.description : originalHouse.description
        originalHouse.hasBasement = houseEdits.hasBasement != null ? houseEdits.hasBasement : originalHouse.hasBasement

        await originalHouse.save()
        return originalHouse
    }

}

export const housesService = new HousesService()