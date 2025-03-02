const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    list: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: Date,
    priority: { type: String, enum: ["low", "medium", "high"] }
},
{ 
    timestamps: true,
    versionKey: false,
}
);

module.exports = mongoose.model("Task", TaskSchema);
