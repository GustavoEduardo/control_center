const express = require('express');
const router = express.Router();
const Admin = require('./Admin');
const bcrypt = require('bcryptjs');
const adminAuth = require('../../middlewares/adminAuth');
//session no index. É global para a aplicação e com o explress-session é salva por padrão na memoria ram do servidor


//pagina de login
router.get("/login", (req, res) =>{	
	res.render("admin/login", {msg: ""});
	
});


//Autenticação de admin
router.post("/authenticate", (req, res) =>{

	var login = req.body.login;
	var password = req.body.password;


	Admin.findOne({ where: {login: login}}).then(adm =>{

		if(adm != undefined){//se existir um adm
			
			//validar senha
			var correct = bcrypt.compareSync(password, adm.password);

			if (correct) {
				req.session.adm = {
					id: adm.id,
					name: adm.name,
					login: adm.login
				}
				//res.json(req.session.adm);
				res.redirect("/admin/items")
			}else{
				res.render("admin/login", {msg: "Senha incorreta!"});
			}
		}else{
			res.render("admin/login", {msg: "Login incorreto!"});
		}
	});
});


//logout
router.get("/logout", (req, res) => {

	req.session.adm = undefined;

	res.redirect("/");
});


//cadastrar novo admin
router.get("/super/admin/index",adminAuth,  (rec,res) =>{

	res.render("super");

});


//salva o novo admin no banco de dados
router.post("/super/admin/create",adminAuth,  (rec,res) =>{

	var name = rec.body.name;
	var email = rec.body.email;
	var login = rec.body.login;
	var password = rec.body.password;
	var nivel = rec.body.nivel;

	var salt = bcrypt.genSaltSync(10); //"sal" para incrementar o hash de senha com bcryptjs
	var hash = bcrypt.hashSync(password, salt);//gerando o hash da senha


	Admin.findOne({
		where: {
			login: login
		}
	}).then(adm =>{

		if (adm) {

			res.send("Admin já existe no banco de dados!")

		}else{

			Admin.create({
				name: name,
				email: email,
				login: login,
				password: hash,
				nivel: nivel

			}).then(() => {
				res.redirect('/')
			}).catch((err) => {
				res.send(err)

			});
		}

	});	

});



module.exports = router;
