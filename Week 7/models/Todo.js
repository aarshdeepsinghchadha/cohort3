const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    task: { type: String, required: true },
    done: { type: Boolean, default: false },
});

module.exports = mongoose.model('Todo', TodoSchema);
