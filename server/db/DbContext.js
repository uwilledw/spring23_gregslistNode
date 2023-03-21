import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CarsSchema } from '../models/Car.js';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Cars = mongoose.model('Car', CarsSchema);
}

export const dbContext = new DbContext()
