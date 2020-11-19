const ObjectId = require("mongoose").Types.ObjectId;
const Form = require("../../../../models/Forms");

module.exports = function (req,res) {
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    console.log(ip)
    if (req.body._id !== undefined || req.body.result !== undefined) {
        if (ObjectId.isValid(req.body._id)) {
            Form.findById(req.body._id,function (err,doc) {
                if(err){
                    res.status(500).send(err)
                }
                else if (!doc){
                    res.status(202).send({
                        message:"No Form found with this ID"
                    });
                }
                else{
                    res.status(202).send({
                        message:"Sucess"
                    });
                }
            })
        }
        else {
            res.status(202).send({
                message: "Invalid ID"
            })
        }
    } else {
        res.status(202).send({
            message: "Incomplete body"
        })
    }
};