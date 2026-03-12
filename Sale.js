const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shopType: { type: String, required: true },
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', SaleSchema);
