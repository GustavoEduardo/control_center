const express = require('express');
const router = express.Router();
const Promotion = require('./Promotion');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const adminAuth = require('../../middlewares/adminAuth');
const Item = require("../item/Item");


//Listar todos os vendedores
router.get("/promotions", (req,res) =>{

	Promotion.findAll().then(promos=>{
		Item.findAll().then(items=>{
			res.render("promotions", {promos, items});
		});
	});

});



module.exports = router;
