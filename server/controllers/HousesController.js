import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";


export class HousesController extends BaseController {
    constructor() {
        super('api/houses')
        this.router
            .get('', this.getHouses)
            .get('/:houseId', this.getHouseById)
            .post('', this.createHouse)
            .delete('/:houseId', this.deleteHouse)
            .put('/:houseId', this.editHouse)
    }

    async getHouses(req, res, next) {
        try {
            const query = req.query
            const houses = await housesService.getHouses(query)
            res.send(houses)
        } catch (error) {
            next(error)
        }
    }

    async getHouseById(req, res, next) {
        try {
            const houseId = req.params.houseId
            const house = await housesService.getHouseById(houseId)
            res.send(house)
        } catch (error) {
            next(error)
        }
    }

    async createHouse(req, res, next) {
        try {
            const houseData = req.body
            const newHouse = await housesService.createHouse(houseData)
            res.send(newHouse)
        } catch (error) {
            next(error)
        }
    }

    async deleteHouse(req, res, next) {
        try {
            const houseId = req.params.houseId
            await housesService.deleteHouse(houseId)
            res.send('deleted house')
        } catch (error) {
            next(error)
        }
    }

    async editHouse(req, res, next) {
        try {
            const houseEdits = req.body
            const houseId = req.params.houseId
            const editedHouse = await housesService.editHouse(houseEdits, houseId)
            res.send(editedHouse)
        } catch (error) {
            next(error)
        }
    }
}