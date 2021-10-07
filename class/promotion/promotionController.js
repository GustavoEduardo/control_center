const express = require('express');
const router = express.Router();
const Promotion = require('./Promotion');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const adminAuth = require('../../middlewares/adminAuth');


//Listar todos os vendedores
router.get("/promotions", (req,res) =>{

	res.render("promotions");
	
});



module.exports = router;
