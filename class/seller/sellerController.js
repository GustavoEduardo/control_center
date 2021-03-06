const express = require('express');
const router = express.Router();
const Seller = require('./Seller');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const adminAuth = require('../../middlewares/adminAuth');


//Listar todos os vendedores
router.get("/admin/sellers", adminAuth, (req,res) =>{
	Seller.findAll({
		limit: 20,
		order:[
			['updatedAt','DESC'] //ASC
		]
	}).then(sellers=>{
		res.render("admin/seller/index", {sellers, adm: req.session.adm, pesquisa: "", team: ""});
	});	
});

//Pesquisa pelo nome no index
router.post("/admin/sellers/search", adminAuth, (req,res) =>{
	const Op = Sequelize.Op;              // biblioteca de operadores
	const query = `%${req.body.search}%`; // string de consulta
	let pesquisa = req.body.search;

	Seller.findAll({ where: { name: { [Op.like]: query } } })
	.then(sellers => {
		res.render("admin/seller/index", {sellers, adm: req.session.adm, pesquisa, team: ""});
	});	
});


//Pesquisa pela equipe no index
router.post("/admin/sellers/team", adminAuth, (req,res) =>{

	var team = req.body.team;
	if(team == undefined || team == "" || team == null ){
		res.redirect("/admin/sellers")
	}else{
	
		Seller.findAll({ where: { team: team } })
		.then(sellers => {		
			res.render("admin/seller/index", {sellers, adm: req.session.adm, team, pesquisa: ""});
		});
	}
	
});





//tela de cadastro de vendedor
router.get("/admin/seller/new", adminAuth,  (req,res) =>{

	res.render("admin/seller/new", {adm: req.session.adm, msg: ""});

});


//salva o novo vendedor no banco de dados
router.post("/createSeller", adminAuth,  (req,res) =>{

	var name = req.body.name;
	var email = req.body.email;
	var team = req.body.team;
	var login = req.body.login;
	var password = req.body.password;

	var salt = bcrypt.genSaltSync(10); //"sal" para incrementar o hash de senha com bcryptjs
	var hash = bcrypt.hashSync(password, salt);//gerando o hash da senha


	Seller.findOne({
		where: {
			name: name
		}
	}).then(seller =>{

		if (seller) {

			res.render("admin/seller/new", {adm: req.session.adm, msg: "J?? existe um vendedor com esse nome no banco de dados!"});

		}else{

			Seller.findOne({
				where: {
					login: login
				}
			}).then(seller =>{
		
				if (seller) {
		
					res.render("admin/seller/new", {adm: req.session.adm, msg: "J?? existe um vendedor com esse login no banco de dados!"});
		
				}else{

					Seller.create({
						name: name,
						email: email,
						team: team,
						login: login,
						password: hash,
						status: "ativo"

					}).then(() => {
						res.redirect('/admin/sellers')
					}).catch((err) => {
						res.send(err)

					});
				}

			});
		}
	});

});

//tela de edi????o de Vendedor
router.get("/admin/seller/adit/:id",  adminAuth, (req, res) =>{

	var id = req.params.id;

	Seller.findOne({where: {id: id}})
	.then( seller =>{
		res.render("admin/seller/edit", {msg: "",seller, adm: req.session.adm})
	});

});

//salva altera????es no banco
router.post("/updateSeller", adminAuth,(req, res) =>{
	let id = req.body.id;
	let name = req.body.name;
	let team = req.body.team;
	let email = req.body.email;
	let status = req.body.status;

	Seller.update({
		name: name,
		team: team,
		email: email,
		status: status	
	},
	{where: {id: id}

	}).then(()=>{
		res.redirect("/admin/sellers");
	}).catch(err =>{
		res.send("Erro inesperado: "+ err)
	})
});



module.exports = router;
