const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
    place:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Place'
    },
    user:{type:mongoose.Schema.Types.ObjectId,require:true},
    checkIn:{type:Date, required:true},
    checkOut:{type:Date, required:true},
    name: {type:String, required:true},
    mobile:{type:String, required:true},
    price: {type:Number}
})

module.exports = mongoose.model('Booking',BookingSchema);