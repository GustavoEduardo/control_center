const Sequelize = require('sequelize');
const connection  = require('../../database/connection');

const Seller = connection.define('sellers',{
	name:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	team:{
		type: Sequelize.TEXT,
		allowNull: false
	},
    email:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	login:{
		type: Sequelize.STRING,
		allowNull: false
	},
	password:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	status:{
		type: Sequelize.STRING,
		allowNull: false
	},
	role:{
		type: Sequelize.INTEGER,
		allowNull: false
	}
	
});



//Seller.sync({force: true}).then(() =>{});//se precisar recriar a tabela

module.exports = Seller;

