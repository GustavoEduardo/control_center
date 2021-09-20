const Sequelize = require('sequelize');
const connection  = require('../../database/connection');
const Seller = require("../seller/Seller");


const Monitoring = connection.define('monitorings',{
	responsavel:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	dtMonitoria:{
		type: Sequelize.DATE,
		allowNull: false
	},
	dtAtendimento:{
		type: Sequelize.DATE,
		allowNull: false
	},
	telefone:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	equipe:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	venda:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	ramal:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	nota:{
		type: Sequelize.FLOAT,
		allowNull: false
	},
	positivos:{
		type: Sequelize.TEXT,
		allowNull: true
	},	
	abordagem:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	abordagemTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	fechamento:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	fechamentoTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	ausente:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	ausenteTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	empatia:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	empatiaTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	seguro:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	seguroTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	giria:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	giriaTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	objetivo:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	objetivoTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	conhecimento:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	conhecimentoTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	sondagem:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	sondagemTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	argumento:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	argumentoTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	negociacao:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	negociacaoTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	etica:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	eticaTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	faltaCordialidade:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	faltaCordialidadeTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	risco:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	riscoTxt:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	aplicada:{
		type: Sequelize.CHAR,
		allowNull: false
	},
	dtAplicacao:{
		type: Sequelize.DATE,
		allowNull: true
	},

});

//relacionamento
Seller.hasMany(Monitoring);
Monitoring.belongsTo(Seller);

//Monitoring.sync({force: true}).then(() =>{});//se precisar recriar a tabela



module.exports = Monitoring;

