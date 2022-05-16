const {Schema, model, Types: {ObjectId}} = require('mongoose');

const tripSchema = new Schema({
   startingPoint: {type: String, required: [true, 'Starting point is required']},
   endPoint: {type: String, required: [true, 'End point is required']},
   date: {type: String, required: [true, 'Date is required']},
   time: {type: String, required: [true, 'Time is required']},
   carImage: {type: String, required: [true, 'Car image is required']},
   carBrand: {type: String, required: [true, 'Car brand is required']},
   seats: {type: Number, required: [true, 'Number of seats is required']},
   price: {type: Number, required: [true, 'Price of seats is required']},
   description: {type: String, required: [true, 'Description is required']},
   author: {type: ObjectId},
    buddies: {type: [ObjectId], default: []}
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;

