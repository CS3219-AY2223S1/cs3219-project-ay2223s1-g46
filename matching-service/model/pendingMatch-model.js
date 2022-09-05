import mongoose from 'mongoose';
var Schema = mongoose.Schema
let PendingMatchModelSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    }
})

export default mongoose.model('PendingMatchModel', PendingMatchModelSchema)
