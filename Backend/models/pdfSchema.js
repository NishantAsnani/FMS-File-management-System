const mongoose = require('mongoose');
const { Schema } = mongoose



const pdfSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    authorName: {
        type: String,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default:Date.now()
    }
})

const pdf = mongoose.model("pdf", pdfSchema)

module.exports = pdf