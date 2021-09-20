const Sequelize = require('sequelize');

const connection = new Sequelize('onix','root','13579Zero@',{
	host: 'localhost',
	dialect: 'mysql',
	timezone: "-03:00"
});

module.exports = connection;
