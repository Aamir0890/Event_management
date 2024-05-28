const mongoose = require('mongoose');




const eventSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.Number, ref: 'User' }],
});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;