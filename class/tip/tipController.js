const express = require('express');
const router = express.Router();
const Tip = require('./Tip');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const adminAuth = require('../../middlewares/adminAuth');


//Abre tela de dicas e listar todos.
router.get("/tips", (req,res) =>{

	Tip.findAll().then(tips=>{		
		res.render("tips", {tips });		
	});

});

//Listar todos as dicas no gerenciador para o admin
router.get("/admin/tips", (req,res) =>{

	Tip.findAll().then(tips=>{
		
		res.render("admin/tip/index", {tips, adm: req.session.adm, pesquisa: ""});
		
	});

});


//Pagina de Cadastro de nova dica
router.get('/admin/tip/new', adminAuth, (req, res) => {
	res.render("admin/tip/new", {adm: req.session.adm, msg: ""});
	
});

//Salva o nova dica no banco de dados
router.post('/createtip', adminAuth, (req, res) => {

	let title = req.body.title;
	let description = req.body.description;

	Tip.findOne({ where: {title: title}}).then(t =>{

		if(t == null || t == undefined){
			Tip.create({
		    	title: title,
		    	description: description				
		    }).then(() =>{
				res.redirect("/admin/tips");

		    }).catch(err => res.send(err));

		}else{
			res.render("admin/tip/new", {adm: req.session.adm, msg: "Já existe uma dica com esse nome!"});
		}

    });
});

//tela de edição de dica
router.get("/admin/tip/adit/:id",  adminAuth, (req, res) =>{

	var id = req.params.id;

	Tip.findOne({where: {id: id}})
	.then( t =>{

		res.render("admin/tip/edit", {t, adm: req.session.adm, msg: ""})

	});

});

//salva alterações no banco
router.post("/updatetip", adminAuth,(req, res) =>{
	let id = req.body.id;
	let title = req.body.title;
	let description = req.body.description;
	
	Tip.update({
		title: title,
		description: description

	},
	{where: {id: id}

	}).then(()=>{
		res.redirect("/admin/tips");
	}).catch(err =>{
		res.send("Erro inesperado: "+ err)
	})
});

//deleta uma dica
router.post("/admin/tip/delete", adminAuth, (req, res)=>{
	var id = req.body.id;

	Tip.destroy({
		where: {id}
	}).then(() => {
		res.redirect("/admin/tips");
	}).catch(err =>{
		res.send("Erro inesperado: "+ err)
	});
});



module.exports = router;
