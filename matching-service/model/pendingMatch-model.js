import mongoose from 'mongoose';
var Schema = mongoose.Schema
let PendingMatchModelSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    socket_id: {
        type: String,
        required: true,
        unique: true,
    },
    difficulty: {
        type: String,
        required: true,
        unique: false
    }
})

export default mongoose.model('PendingMatchModel', PendingMatchModelSchema)
