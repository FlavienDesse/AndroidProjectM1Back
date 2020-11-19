const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let WidgetSchema = new Schema({
    order: {
        type: Number,
        required: true,
    },

    question:{
        type: String,
        default:""
    },

    /////////Questions => type :0/////////

    textFieldResult:{
        type: [String],
        default:[]
    },

    ///////////////////////

    /////////Note => type : 1/////////

    maxPoint:{
        type: Number,
        default:0
    },
    minPoint:{
        type: Number,
        default:0
    },
    resultPoint:{
        type: [Number],
        default:[]
    },

    ///////////////////////
});


let Widget = mongoose.model("Widget", WidgetSchema);

module.exports = Widget;
