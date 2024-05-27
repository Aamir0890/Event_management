const mongoose = require('mongoose');


const participantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

const eventSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    participants: [participantSchema] 
});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;