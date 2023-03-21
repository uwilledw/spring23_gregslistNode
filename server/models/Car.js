
import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CarsSchema = new Schema(
    {
        make: { type: String, required: true, minLength: 3, maxLength: 20 },
        model: { type: String, required: true, minLength: 3, maxLength: 20 },
        year: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 1, max: 4000 },
        leaksOil: { type: Boolean, default: true },
        description: { type: String, required: true, maxLength: 500 },
        transmissionType: { type: String, enum: ['manual', 'automatic'], required: true }
    },
    { timestamps: true }
)
