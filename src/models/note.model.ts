import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: () => Date.now(),
    },
    category: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    archived: {
        type: Boolean,
        default: false,
    },
});

export const Note = mongoose.model('Note', noteSchema);
