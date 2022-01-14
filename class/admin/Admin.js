const Sequelize = require('sequelize');
const connection  = require('../../database/connection');

const Admin = connection.define('admins',{
	name:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	email:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	login:{
		type: Sequelize.STRING,
		allowNull: false
	},
	password:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	nivel:{
		type: Sequelize.STRING,
		allowNull: false
	}
	
});



//Admin.sync({force: true}).then(() =>{});//se precisar recriar a tabela

module.exports = Admin;
