

import mongoose from "mongoose";
const Schema = mongoose.Schema


export const HousesSchema = new Schema(
    {
        bedroom: { type: Number, required: true, min: 1 },
        bathroom: { type: Number, required: true, min: 1 },
        level: { type: Number, required: true, min: 1 },
        description: { type: String, maxLength: 100 },
        hasBasement: { type: Boolean, default: false },
        furnace: { type: String, enum: ['gas', 'electric'], required: true }

    },
    { timestamps: true }
)