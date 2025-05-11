const mongoose = require('mongoose');
const { Schema } = mongoose;

const priceSchema = new Schema({

    productId: {
        type: Number,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        required: true
    },
    currency_code: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Price', priceSchema);