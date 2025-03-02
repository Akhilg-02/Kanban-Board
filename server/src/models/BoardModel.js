const mongoose = require('mongoose');
const { Schema } = mongoose;

const BoardSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
},
{ 
    timestamps: true,
    versionKey: false,
}
);

module.exports = mongoose.model("Board", BoardSchema);
