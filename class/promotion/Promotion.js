const Sequelize = require('sequelize');
const connection  = require('../../database/connection');
const Item = require('../item/Item');

const Promotion = connection.define('promotions',{
    nome:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	descricao:{
		type: Sequelize.TEXT,
		allowNull: false
	}
	
	
});


//relacionamento campo itemId e promotionsId;
Item.hasMany(Promotion);
Promotion.hasMany(Item);

//Promotion.sync({force: true}).then(() =>{});//se precisar recriar a tabela

module.exports = Promotion;

