const Sequelize = require('sequelize');
const connection  = require('../../database/connection');

const Tip = connection.define('tips',{
    title:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	description:{
		type: Sequelize.TEXT,
		allowNull: false
	},
    level:{
		type: Sequelize.TEXT,
		allowNull: true
	},	
	
});


//Tip.sync({force: true}).then(() =>{});//se precisar recriar a tabela

module.exports = Tip;

