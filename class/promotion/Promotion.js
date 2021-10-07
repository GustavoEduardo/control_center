const Sequelize = require('sequelize');
const connection  = require('../../database/connection');

const Promotion = connection.define('promotions',{
	
	
});


//Promotion.sync({force: true}).then(() =>{});//se precisar recriar a tabela

module.exports = Promotion;

