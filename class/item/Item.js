const Sequelize = require('sequelize');
const connection  = require('../../database/connection');

const Item = connection.define('items',{
	name:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	type:{
		type: Sequelize.STRING(3),
		allowNull: false
	},
	img:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	description:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	argument:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	valBlt:{
		type: Sequelize.FLOAT,
		allowNull: false
	},
	valCard:{
		type: Sequelize.FLOAT,
		allowNull: false
	},
	valPix:{
		type: Sequelize.FLOAT,
		allowNull: false
	},
	promo:{
		type: Sequelize.STRING(2),
		allowNull: true
	},
	
});


//Item.sync({force: true}).then(() =>{});//se precisar recriar a tabela

module.exports = Item;

