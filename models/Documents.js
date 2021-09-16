const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const DocumentSchema = new Schema({
    value : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("Document",DocumentSchema)