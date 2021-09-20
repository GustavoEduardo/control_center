const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require("multer");
const path = require('path');
const adminAuth = require('../../middlewares/adminAuth');
//session no index. É global para a aplicação e com o explress-session é salva por padrão na memoria ram do servidor
const Item = require('./Item');
var pesquisas = require("../../helpers/pesquisas");


//renomear-arquivos
const storage = multer.diskStorage({
	destination: function(req, file,cb){
		cb(null,"public/images/uploads/");
	},
	filename: function(req, file, cb){
		cb(null, file.originalname);// file.originalname + Date.now() +path.extname(file.originalname)
	}

})

const upload = multer({storage});



//Lista todos os itens
router.get("/items", (req,res) =>{
	Item.findAll({
		limit: 20,
		order:[
			['updatedAt','DESC'] //ASC
		]
	}).then(items=>{
		var itemNF = null;//item not found		
		res.render("index", {items, itemNF,pesquisa: "",pesquisaTipo: ""});
	});	
});

//Lista os item pela pesquisa
router.post("/items", (req,res) =>{	
	
	const Op = Sequelize.Op;              // biblioteca de operadores
	const query = `%${req.body.search}%`; // string de consulta
	let pesquisa = req.body.search;
	Item.findAll({ where: { name: { [Op.like]: query } } })
	.then(items => {
		if(items.length == 0){
			var itemNF ="Nenhum item encontrado com esse nome. Informe ao supervisor para cadastrar o item.";
		}
		console.log(itemNF);
		res.render("index", {items, itemNF,itemNF,pesquisa,pesquisaTipo: ""});
		
	});
	

});

//Filtra os item pelo tipo recarregando a pagina
router.post("/itemstype", (req,res) =>{
	
	const Op = Sequelize.Op;              // biblioteca de operadores
	const query = `%${req.body.type}%`; // string de consulta
	let pesquisaTipo = pesquisas.prodTipos(req.body.type);
	Item.findAll({ where: { type: { [Op.like]: query } } })
	.then(items => {
		var itemNF = undefined;
		res.render("index", {items, itemNF,pesquisa: "",pesquisaTipo});
	});
	

});

//////////////////////////////////////////Admin//////////////////////////////////////////

//Lista todos os itens admin
router.get("/admin/items", adminAuth, (req,res) =>{
	Item.findAll({
		limit: 20,
		order:[
			['updatedAt','DESC'] //ASC
		]
	}).then(items=>{
		res.render("admin/item/index", {items,pesquisa: "",pesquisaTipo: "", adm: req.session.adm});
	});	
});

//Lista os item pela pesquisa e retorna para o admin
router.post("/admin/items", (req,res) =>{
	
	const Op = Sequelize.Op;            // biblioteca de operadores
	const query = `%${req.body.search}%`; // string de consulta
	var pesquisa = req.body.search;
	Item.findAll({ where: { name: { [Op.like]: query } } })
	.then(items => {
		res.render("admin/item/index", {items,pesquisa,pesquisaTipo: "", adm: req.session.adm});
	});
});

//Filtra os item pelo tipo recarregando a pagina do admin
router.post("/admin/itemstype", (req,res) =>{
	
	const Op = Sequelize.Op;              // biblioteca de operadores
	const query = `%${req.body.type}%`; // string de consulta
	let pesquisaTipo = pesquisas.prodTipos(req.body.type);
	Item.findAll({ where: { type: { [Op.like]: query } } })
	.then(items => {
		res.render("admin/item/index", {items,pesquisa: "", pesquisaTipo, adm: req.session.adm});
	});
});


//Pagina de Cadastro de novo item
router.get('/admin/item/new', adminAuth, (req, res) => {
	res.render("admin/item/new", {adm: req.session.adm, msg: ""});
	
});

//Salva o novo item no banco de dados
router.post('/cadastrarItem',upload.single("foto"), adminAuth, (req, res) => {

	let name = req.body.name;
	let type = req.body.type;
	let valBlt = req.body.valBlt;
	let valCard = req.body.valCard;
	let valPix = req.body.valPix;
	let description = req.body.description;
    let argument = req.body.argument;
	let promo = 'n';
	let image = req.file.path;
	let img = image.substring(7,image.length);


	Item.findOne({ where: {name: name}}).then(item =>{

		if(item == null || item == undefined){
			Item.create({
		    	name: name,
		    	type: type,
				valBlt: valBlt,
				valCard: valCard,
				valPix: valPix,
				description: description,
				argument: argument,
				promo: promo,
				img: img
		    }).then(() =>{
		    	Item.findAll({raw: true}).then(items => {

					res.redirect("/admin/items");

				});
		    }).catch(err => res.send(err));

		}else{
			res.render("admin/item/new", {adm: req.session.adm, msg: "Já existe um item com esse nome no banco!"});
		}
	   


    });
});

//tela de edição de item
router.get("/admin/item/adit/:id",  adminAuth, (req, res) =>{

	var id = req.params.id;

	Item.findOne({where: {id: id}})
	.then( item =>{

		let type = item.type;
		switch (type) {
		case 'img':
			type ="Imagem"
			break;
		case 'kit':
			type ="Kits"
			break;
		case 'med':
			type ="Medalhões"
			break;
		case 'ter':
			type ="Terços"
			break
		case 'out':
			type ="Outros"
		}

		res.render("admin/item/edit", {item, adm: req.session.adm, type})

	});

});

//salva alterações no banco
router.post("/updateItem", upload.single("foto"), adminAuth,(req, res) =>{
	let id = req.body.id;
	let name = req.body.name;
	let type = req.body.type;
	let valBlt = req.body.valBlt;
	let valCard = req.body.valCard;
	let valPix = req.body.valPix;
	let description = req.body.description;
    let argument = req.body.argument;
	let image = req.file? req.file.path: undefined;
	let imgNew = image? image.substring(7,image.length): undefined;

	Item.update({
		name: name,
		type: type,
		valBlt: valBlt,
		valCard: valCard,
		valPix: valPix,
		description: description,
		argument: argument,
		img: imgNew? imgNew : Item.img

	},
	{where: {id: id}

	}).then(()=>{
		res.redirect("/admin/items");
	}).catch(err =>{
		res.send("Erro inesperado: "+ err)
	})
});

//deletar um item
router.post("/admin/item/delete", adminAuth, (req, res)=>{
	var id = req.body.id;

	Item.destroy({
		where: {id}
	}).then(() => {
		res.redirect("/admin/items");
	}).catch(err =>{
		res.send("Erro inesperado: "+ err)
	});
});


module.exports = router;