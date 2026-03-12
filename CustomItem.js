const mongoose = require('mongoose');

const CustomItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shopType: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    icon: { type: String, default: 'fa-box' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CustomItem', CustomItemSchema);
