const express = require('express');
const router = express.Router();
const Promotion = require('./Promotion');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const adminAuth = require('../../middlewares/adminAuth');
const Item = require("../item/Item");


//Listar todos as promoções
router.get("/promotions", (req,res) =>{

	Promotion.findAll().then(promos=>{
		Item.findAll().then(items=>{
			res.render("promotions", {promos, items});
		});
	});

});

//Listar todos as promoções no gerenciador para o admin
router.get("/admin/promotions", (req,res) =>{

	Promotion.findAll().then(promos=>{
		
		res.render("admin/promotion/index", {promos, adm: req.session.adm, pesquisa: ""});
		
	});

});


//Pagina de Cadastro de nova promoção
router.get('/admin/promotion/new', adminAuth, (req, res) => {
	res.render("admin/promotion/new", {adm: req.session.adm, msg: ""});
	
});

//Salva o nova promoção no banco de dados
router.post('/createpromo', adminAuth, (req, res) => {

	let nome = req.body.nome;
	let descricao = req.body.descricao;

	Promotion.findOne({ where: {nome: nome}}).then(promo =>{

		if(promo == null || promo == undefined){
			Promotion.create({
		    	nome: nome,
		    	descricao: descricao
				
		    }).then(() =>{
				res.redirect("/admin/promotions");
				
		    }).catch(err => res.send(err));

		}else{
			res.render("admin/promotion/new", {adm: req.session.adm, msg: "Já existe um promoção com esse nome!"});
		}
	   


    });
});

//tela de edição de promoção
router.get("/admin/promotion/adit/:id",  adminAuth, (req, res) =>{

	var id = req.params.id;

	Promotion.findOne({where: {id: id}})
	.then( promo =>{

		res.render("admin/promotion/edit", {promo, adm: req.session.adm})

	});

});

//salva alterações no banco
router.post("/updatepromo", adminAuth,(req, res) =>{
	let id = req.body.id;
	let nome = req.body.nome;
	let descricao = req.body.descricao;
	
	Promotion.update({
		nome: nome,
		descricao: descricao

	},
	{where: {id: id}

	}).then(()=>{
		res.redirect("/admin/promotions");
	}).catch(err =>{
		res.send("Erro inesperado: "+ err)
	})
});

//deletar uma promoção
router.post("/admin/promotion/delete", adminAuth, (req, res)=>{
	var id = req.body.id;

	Promotion.destroy({
		where: {id}
	}).then(() => {
		res.redirect("/admin/promotions");
	}).catch(err =>{
		res.send("Erro inesperado: "+ err)
	});
});



module.exports = router;
