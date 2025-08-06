
import mongoose from 'mongoose'

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    }
})


const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    volunteers: [volunteerSchema],
})

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event