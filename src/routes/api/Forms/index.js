var express = require('express');
var router = express.Router();

const auth = require('../../../middleWare/auth');
const isAtLeastUser = require('../../../middleWare/isAtLeastUser');

const createForm = require('./createForm');
const closeForm = require('./closeForm');
const deleteForm = require('./deleteForm');
const getFormById = require('./getFormById')
const getFormBySmallID = require('./getFormBySmallID')

router.post('/createForm',auth,isAtLeastUser,createForm);
router.post('/closeForm',auth,isAtLeastUser,closeForm);
router.post('/deleteForm',auth,isAtLeastUser,deleteForm);
router.post('/getFormById',getFormById);
router.post('/getFormBySmallID',getFormBySmallID);





module.exports= router;