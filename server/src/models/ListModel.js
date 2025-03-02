const mongoose = require('mongoose');
const { Schema } = mongoose;

const ListSchema = new Schema({
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
    title: { type: String, required: true },
},
{ 
    timestamps: true,
    versionKey: false,
}
);

module.exports = mongoose.model("List", ListSchema);

