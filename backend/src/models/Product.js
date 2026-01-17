const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: 0,
    },
    countInStock: {
        type: Number,
        required: [true, 'Please add a count in stock'],
        min: 0,
        default: 0,
    },
    imageUrl: {
        type: String,
        required: [true, 'Please add an image URL'],
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
