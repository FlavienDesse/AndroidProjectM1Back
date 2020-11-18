const ObjectId = require("mongoose").Types.ObjectId;
const Forms = require('../../../../models/Forms')


module.exports = function (req, res) {
    if (req.body.smallID !== undefined) {
        Forms.findOne({smallId : req.body.smallID}).populate("content").exec(async function (error,doc) {
            if(error){
                res.status(500).send(error)
            }
            else if(!doc){
                res.status(202).send({message: "Form unfindable"});
            }
            else{
                res.status(200).send(doc)
            }
        })
    } else {
        res.status(202).send({message: "missing id"});
    }

}