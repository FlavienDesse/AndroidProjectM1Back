var express = require('express');
var router = express.Router();

const auth = require('../../../middleWare/auth');
const isAtLeastUser = require('../../../middleWare/isAtLeastUser');

const createForm = require('./createForm');
const closeForm = require('./closeForm');
const deleteForm = require('./deleteForm');
const getFormById = require('./getFormById')

router.post('/createForm',auth,isAtLeastUser,createForm);
router.post('/closeForm',auth,isAtLeastUser,closeForm);
router.post('/deleteForm',auth,isAtLeastUser,deleteForm);
router.post('/getFormById',getFormById);
router.get('/pisse',function (req,res) {
    res.send({
        message :"gros pipi"
        }
    )
});




module.exports= router;