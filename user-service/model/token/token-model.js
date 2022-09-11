import mongoose from 'mongoose';
var Schema = mongoose.Schema
let TokenModelSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    }
})

export default mongoose.model('TokenModel', TokenModelSchema)