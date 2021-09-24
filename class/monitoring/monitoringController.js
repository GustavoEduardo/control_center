const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const adminAuth = require('../../middlewares/adminAuth');
const Monitoring = require('./Monitoring');
const Seller = require('../seller/Seller');
var datas = require("../../helpers/datas");
var pesquisas = require("../../helpers/pesquisas");
const puppeteer = require('puppeteer');
const ejs = require ('ejs');

var path = require('path');
var fs = require('fs');


//Tela Glossario
router.get("/monitoring/glossario", (req,res) =>{
			
	res.render("glossario");

});

//Tela Glossario Admin
router.get("/admin/monitoring/glossario", adminAuth, (req,res) =>{
			
	res.render("admin/monitoring/glossario",{adm: req.session.adm});

});


//Lista todos as monitorias
router.get("/admin/monitorings", adminAuth, (req,res) =>{
	Monitoring.findAll({
		include:[{model: Seller}],
		limit: 60,
		order:[
			['updatedAt','DESC'] //ASC
		]
	}).then(monitorings=>{
		Seller.findAll().then(sellers=>{		
		res.render("admin/monitoring/index",{dtInicial: "", dtFinal: "",team: "",seachAplicada:"",seachSeller: "",ramal: "",monitorings,sellers,adm: req.session.adm});
		});	
	});	
});

//Pesquisa pelo ramal
router.post("/admin/monitorings/ramal",adminAuth, (req,res) =>{
	
	let ramal = req.body.search;
	if(ramal == undefined || ramal == "" || ramal == null ){
		res.redirect("/admin/monitorings");
	}else{
		Monitoring.findAll({
			include:[{model: Seller}],
			where: { ramal: ramal }})
		.then(monitorings => {
			Seller.findAll().then(sellers =>{
				res.render("admin/monitoring/index", {dtInicial: "", dtFinal: "",team: "",seachSeller: "",seachAplicada:"",monitorings,ramal, sellers, adm: req.session.adm});
			})
		});
	}
	
});

//Pesquisa por status aplicada
router.post("/admin/monitorings/aplicada",adminAuth, (req,res) =>{
	
	let aplicada = req.body.aplicada;
	if(aplicada == undefined || aplicada == "" || aplicada == null ){
		res.redirect("/admin/monitorings");
	}else{
		let seachAplicada = req.body.aplicada == "s"? "Aplicadas" : "Não Aplicadas";
		Monitoring.findAll({
				include:[{model: Seller}],
				where: { aplicada: aplicada }})
			.then(monitorings => {

				Seller.findAll().then(sellers =>{
					res.render("admin/monitoring/index", {dtInicial: "", dtFinal: "",team: "",monitorings,seachAplicada,seachSeller: "",ramal: "", sellers, adm: req.session.adm});
				})
			});
	}
	
	
});

//pesquisa pelo vendedor
router.post("/admin/monitorings/seller",adminAuth, (req,res) =>{

	var seller = req.body.seller;//id do vendedor
	if(seller == undefined || seller == "" || seller == null ){
		res.redirect("/admin/monitorings");
	}else{
		Monitoring.findAll({include:[{model: Seller}], where: { sellerId: seller } })
		.then(monitorings => {
			Seller.findAll().then(sellers =>{
				Seller.findOne({where: {id: seller}}).then(s =>{
					seachSeller = s.name;
					res.render("admin/monitoring/index", {dtInicial: "", dtFinal: "",team: "",monitorings, sellers,seachAplicada:"",ramal:"",seachSeller, adm: req.session.adm});

				});
			});
			
		});
	}
});

//pesquisa por equipe
router.post("/admin/monitorings/team",adminAuth, (req,res) =>{

	var team = req.body.team;
	if(team == undefined || team == "" || team == null ){
		res.redirect("/admin/monitorings");
	}else{
		Monitoring.findAll({include:[{model: Seller}], where: { equipe: team } })
		.then(monitorings => {
			team = pesquisas.equipe(team);//define o nome para aparecer no campo
			Seller.findAll().then(sellers =>{
				res.render("admin/monitoring/index", {dtInicial: "", dtFinal: "",team,monitorings,sellersTeam: "", sellers,seachAplicada:"",ramal:"",seachSeller: "", adm: req.session.adm});

			});
			
		});
		
	}
});

//pesquisa por data
router.post("/admin/monitorings/date", adminAuth, (req, res)=>{

	let dtInicial = req.body.dtInicial;
	let dtFinal = datas.diaMaisUmSearch(req.body.dtFinal);

	const Op = Sequelize.Op;
	
	Monitoring.findAll({
		order:[
			['updatedAt','DESC'] //ASC
		],
		include:[{model: Seller}],
		where: {
			dtMonitoria:{
				[Op.between]: [dtInicial, dtFinal]}
			}
		})
		.then(monitorings => {

			Seller.findAll().then(sellers =>{
				res.render("admin/monitoring/index", {dtInicial, dtFinal: req.body.dtFinal,team: "",monitorings,seachAplicada: "",seachSeller: "",ramal: "", sellers, adm: req.session.adm});
			})
		});
	

});

//Pagina de Cadastro de nova monitoria
router.get('/admin/monitoring/new', adminAuth, (req, res) => {
	Seller.findAll().then(sellers =>{
		res.render("admin/monitoring/new", {adm: req.session.adm,sellers, msg: ""});
	})
	
	
});

//Salva o novo item no banco de dados
router.post("/admin/monitoring/save", adminAuth, (req, res)=>{
	var positivos = req.body.positivos;
	var responsavel = req.session.adm.name;
	var dtMonitoria = new Date();	
	var telefone = req.body.telefone;	
	var venda = req.body.venda;
	var ramal = req.body.ramal;
	var nota = req.body.nota;
	var abordagem = req.body.ofensor1;
	var abordagemTxt = req.body.ofensor1Txt;
	var fechamento = req.body.ofensor2;
	var fechamentoTxt = req.body.ofensor2Txt;
	var ausente = req.body.ofensor3;
	var ausenteTxt = req.body.ofensor3Txt;
	var empatia = req.body.ofensor4;
	var empatiaTxt = req.body.ofensor4Txt;
	var seguro = req.body.ofensor5;
	var seguroTxt = req.body.ofensor5Txt;
	var giria = req.body.ofensor6;
	var giriaTxt = req.body.ofensor6Txt;
	var objetivo = req.body.ofensor7;
	var objetivoTxt = req.body.ofensor7Txt;
	var conhecimento = req.body.ofensor8;
	var conhecimentoTxt = req.body.ofensor8Txt;
	var sondagem = req.body.ofensor9;
	var sondagemTxt = req.body.ofensor9Txt;
	var argumento = req.body.ofensor10;
	var argumentoTxt = req.body.ofensor10Txt;
	var negociacao = req.body.ofensor11;
	var negociacaoTxt = req.body.ofensor11Txt;
	var etica = req.body.ofensor12;
	var eticaTxt = req.body.ofensor12Txt;
	var faltaCordialidade = req.body.ofensor13;
	var faltaCordialidadeTxt = req.body.ofensor13Txt;
	var risco = req.body.ofensor14;
	var riscoTxt = req.body.ofensor14Txt;
	var sellerId = req.body.vendedor;
	var dtAtendimento = datas.diaMaisUm(req.body.dtAtendimento);

	Seller.findOne({where: {id: sellerId}})
	.then( seller =>{		
		var equipe = seller.team;

		Monitoring.create({
			equipe: equipe,
			positivos: positivos,
			responsavel: responsavel,
			dtMonitoria: dtMonitoria,
			dtAtendimento: dtAtendimento,
			telefone: telefone,
			venda: venda,
			ramal: ramal,
			nota: nota,
			abordagem: abordagem,
			abordagemTxt: abordagemTxt,
			fechamento: fechamento,
			fechamentoTxt: fechamentoTxt,
			ausente: ausente,
			ausenteTxt: ausenteTxt,
			empatia: empatia,
			empatiaTxt: empatiaTxt,
			seguro: seguro,
			seguroTxt: seguroTxt,
			giria: giria,
			giriaTxt: giriaTxt,
			objetivo: objetivo,
			objetivoTxt: objetivoTxt,
			conhecimento: conhecimento,
			conhecimentoTxt: conhecimentoTxt,
			sondagem: sondagem,
			sondagemTxt: sondagemTxt,
			argumento: argumento,
			argumentoTxt: argumentoTxt,
			negociacao: negociacao,
			negociacaoTxt: negociacaoTxt,
			etica: etica,
			eticaTxt: eticaTxt,
			faltaCordialidade: faltaCordialidade,
			faltaCordialidadeTxt: faltaCordialidadeTxt,
			risco: risco,
			riscoTxt: riscoTxt,
			aplicada: "n",		
			sellerId: sellerId
		}).then(()=>{
			res.redirect("/admin/monitorings");
		});

	});

});

//Tela de edição de monitoria
router.get("/admin/monitoring/adit/:id",  adminAuth, (req, res) =>{

	var id = req.params.id;

	Monitoring.findOne({
		include: [{model: Seller}],
		where: {id: id}})
	.then( m =>{
		Seller.findAll({order:[
			['updatedAt','DESC'] //ASC
		]})
		.then( sellers =>{
			res.render("admin/monitoring/edit", {m,sellers, adm: req.session.adm})
		});	

	});

});

//salva alterações no banco
router.post("/updateMonitoring", adminAuth,(req, res) =>{
	var positivos = req.body.positivos;
	var telefone = req.body.telefone;
	var dtAtendimento = datas.diaMaisUm(req.body.dtAtendimento); 
	var venda = req.body.venda;
	var ramal = req.body.ramal;
	var nota = req.body.nota;
	var abordagem = req.body.ofensor1;
	var abordagemTxt = req.body.ofensor1Txt;
	var fechamento = req.body.ofensor2;
	var fechamentoTxt = req.body.ofensor2Txt;
	var ausente = req.body.ofensor3;
	var ausenteTxt = req.body.ofensor3Txt;
	var empatia = req.body.ofensor4;
	var empatiaTxt = req.body.ofensor4Txt;
	var seguro = req.body.ofensor5;
	var seguroTxt = req.body.ofensor5Txt;
	var giria = req.body.ofensor6;
	var giriaTxt = req.body.ofensor6Txt;
	var objetivo = req.body.ofensor7;
	var objetivoTxt = req.body.ofensor7Txt;
	var conhecimento = req.body.ofensor8;
	var conhecimentoTxt = req.body.ofensor8Txt;
	var sondagem = req.body.ofensor9;
	var sondagemTxt = req.body.ofensor9Txt;
	var argumento = req.body.ofensor10;
	var argumentoTxt = req.body.ofensor10Txt;
	var negociacao = req.body.ofensor11;
	var negociacaoTxt = req.body.ofensor11Txt;
	var etica = req.body.ofensor12;
	var eticaTxt = req.body.ofensor12Txt;
	var faltaCordialidade = req.body.ofensor13;
	var faltaCordialidadeTxt = req.body.ofensor13Txt;
	var risco = req.body.ofensor14;
	var riscoTxt = req.body.ofensor14Txt;
	var sellerId = req.body.vendedor;
	var id = req.body.id;
	var equipe;

	Seller.findOne({where: {id: sellerId}})
	.then( seller =>{
		equipe = seller.team;
	

		Monitoring.update({
			equipe: equipe,
			positivos: positivos,	
			dtAtendimento: dtAtendimento,
			telefone: telefone,
			venda: venda,
			ramal: ramal,
			nota: nota,
			abordagem: abordagem,
			abordagemTxt: abordagemTxt,
			fechamento: fechamento,
			fechamentoTxt: fechamentoTxt,
			ausente: ausente,
			ausenteTxt: ausenteTxt,
			empatia: empatia,
			empatiaTxt: empatiaTxt,
			seguro: seguro,
			seguroTxt: seguroTxt,
			giria: giria,
			giriaTxt: giriaTxt,
			objetivo: objetivo,
			objetivoTxt: objetivoTxt,
			conhecimento: conhecimento,
			conhecimentoTxt: conhecimentoTxt,
			sondagem: sondagem,
			sondagemTxt: sondagemTxt,
			argumento: argumento,
			argumentoTxt: argumentoTxt,
			negociacao: negociacao,
			negociacaoTxt: negociacaoTxt,
			etica: etica,
			eticaTxt: eticaTxt,
			faltaCordialidade: faltaCordialidade,
			faltaCordialidadeTxt: faltaCordialidadeTxt,
			risco: risco,
			riscoTxt: riscoTxt,		
			sellerId: sellerId

		},
		{where: {id: id}

		}).then(()=>{
			res.redirect("/admin/monitorings");
		}).catch(err =>{
			res.send("Erro inesperado: "+ err)
		})
	});
});

//tela de detalhes
router.get("/admin/monitoring/details/:id",  adminAuth, (req, res) =>{

	var id = req.params.id;
	var adm = req.session.adm;

	Monitoring.findOne({
		include: [{model: Seller}],
		where: {id: id}})
	.then( m =>{
		res.render("admin/monitoring/details", {m, adm})
	});

});

// //tela de pdf html-pdf
// router.get("/admin/monitoring/pdf/:id",  adminAuth, (req, res) =>{

// 	var id = req.params.id;

// 	Monitoring.findOne({
// 		include: [{model: Seller}],
// 		where: {id: id}})
// 	.then( m =>{

// 		//cria o pdf. Processo assincrono. Renderiza a tela primeiro e depois cria
// 		var pdfName = "M-"+m.telefone+"-"+m.ramal;

// 		arquivos.createPdf(pdfName, m, id);

// 		res.render("admin/monitoring/pdf", {m})
// 	});

// });

//tela inicializa o pdf para o puppeteer
router.get("/admin/monitoring/pdf/:id", (req, res) =>{
	var id = req.params.id;

	Monitoring.findOne({
		include: [{model: Seller}],
		where: {id: id}})
	.then( m =>{

		ejs.renderFile("./views/admin/monitoring/pdf.ejs",{id, m},(err, html)=>{
			if(err){
				console.log(err)
			}else{
				//envia o html para o navegador
				return res.send(html)
			}
		
		})
	});

});


//rota para iniciar o puppeteer
router.get("/pdf/:id", async(req, res)=>{

	let id = req.params.id

	const browser = await puppeteer.launch({headless: true})
	const page = await browser.newPage()
	
	await page.goto("http://localhost:3000/admin/monitoring/pdf/"+id, {
		waitUntil: "networkidle2"
	})

	const pdf = await page.pdf({
		printBackground: true,
		format: 'Letter',
		margin: {
			top: "0px",
			bottom: "0px",
			left: "0px",
			right: "0px"
		}
	})

	await browser.close()

	res.contentType("application/pdf")

	return res.send(pdf)

});

//rota de download do pdf
router.get('/download/:nome', function(req, res){

	var nome = req.params.nome;

	var file = "./public/file/"+nome+".pdf";

	var filename = path.basename(file);
	//var mimetype = mime.lookup(file);

	res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	//res.setHeader('Content-type', mimetype);

	async function download(){
		var filestream = await fs.createReadStream(file);
		filestream.pipe(res);

	}
	download()
	
});


//Aplicar feedback. Muda campo aplicada para s "Feedback aplicado ao vendedor"
router.post("/applyfeedback", adminAuth,(req, res) =>{
	
	var id = req.body.id;

	Monitoring.update({		
		aplicada: "s"
	},
	{where: {id: id}

	}).then(()=>{
		res.redirect("/admin/monitorings");
	}).catch(err =>{
		res.send("Erro inesperado: "+ err)
	})
});

//***********************************Relatórios da Monitoria******************************************

//Relatório geral Mes atual
router.get("/admin/monitoring/reports", adminAuth, (req, res)=>{

	var dtInicial = datas.dia1Str();
	var hoje = datas.hojeStr();
	var dtFinal = datas.diaMaisUmSearch(hoje);


	const Op = Sequelize.Op;
	
		Monitoring.findAll({
			order:[
				['updatedAt','DESC'] //ASC
			],
			include:[{model: Seller}],
			where: {
				dtMonitoria:{
					[Op.between]: [dtInicial, dtFinal]}
				}
		}).then(monitorings => {
			//inicializando variaveis
			var nota1 = 0;
			var nota2 = 0;
			var nota3 = 0;

			var qtd1 =0;
			var qtd2 =0;
			var qtd3 =0;

			var of1 = 0;
			var of2 = 0;
			var of3 = 0;
			var of4 = 0;
			var of5 = 0;
			var of6 = 0;
			var of7 = 0;
			var of8 = 0;
			var of9 = 0;
			var of10 = 0;
			var of11 = 0;
			var of12 = 0;
			var of13 = 0;
			var of14 = 0;

			//definindo qtd de apontamentos negativos para cada ofensor
			monitorings.forEach(m=>{
				if(m.abordagem == "nao"){
					of1++
				}
				if(m.fechamento == "nao"){
					of2++
				}
				if(m.ausente == "nao"){
					of3++
				}
				if(m.empatia == "nao"){
					of4++
				}
				if(m.seguro == "nao"){
					of5++
				}
				if(m.giria == "sim"){
					of6++
				}
				if(m.objetivo == "nao"){
					of7++
				}
				if(m.conhecimento == "nao"){
					of8++
				}
				if(m.sondagem == "nao"){
					of9++
				}
				if(m.argumento == "nao"){
					of10++
				}
				if(m.negociacao == "nao"){
					of11++
				}
				if(m.etica == "nao"){
					of12++
				}
				if(m.faltaCordialidade == "sim"){
					of13++
				}
				if(m.risco == "sim"){
					of14++
				}

			})

			var qtdM = monitorings.length;//qtd de monitorias no período informado
			//definindo porcentagem de apontamentos negativos de cada ofensor
			of1 = ((of1*100)/qtdM).toFixed(2);
			of2 = ((of2*100)/qtdM).toFixed(2);
			of3 = ((of3*100)/qtdM).toFixed(2);
			of4 = ((of4*100)/qtdM).toFixed(2);
			of5 = ((of5*100)/qtdM).toFixed(2);
			of6 = ((of6*100)/qtdM).toFixed(2);
			of7 = ((of7*100)/qtdM).toFixed(2);
			of8 = ((of8*100)/qtdM).toFixed(2);
			of9 = ((of9*100)/qtdM).toFixed(2);
			of10 = ((of10*100)/qtdM).toFixed(2);
			of11 = ((of11*100)/qtdM).toFixed(2);
			of12 = ((of12*100)/qtdM).toFixed(2);
			of13 = ((of13*100)/qtdM).toFixed(2);
			of14 = ((of14*100)/qtdM).toFixed(2);

			//atribuir notas das equipes
			monitorings.forEach(m => {
				if(m.seller.team == "01"){
					nota1 = nota1 + m.nota
					qtd1 ++
				}
				if(m.seller.team == "02"){
					nota2 = nota2 + m.nota
					qtd2 ++
				}
				if(m.seller.team == "03"){
					nota3 = nota3 + m.nota
					qtd3 ++
				}
			});			

			//Define média de cada equipe e evitando NaN
			if(nota1 == 0){
				var media1 = 0;
			}else{
				var media1 = nota1/ qtd1;
			}
			if(nota2 == 0){
				var media2 = 0;
			}else{
				var media2 = nota2/ qtd2;
			}
			if(nota3 == 0){
				var media3 = 0;
			}else{
				var media3 = nota3/ qtd3;
			}

			//definindo média geral
			var madiaGeral = (media1 +media2 + media3)/3
			
			res.render('admin/monitoring/reports/index', {
				dtInicial,dtFinal: hoje,
				of1,of2,of3,of4,of5,of6,of7,of8,of9,of10,of11,of12,of13,of14,
				media1: media1.toFixed(2),media2: media2.toFixed(2),media3: media3.toFixed(2),mediaGeral: madiaGeral.toFixed(2),
					adm: req.session.adm});

	});




	// res.render('admin/monitoring/reports/index', {
	// 	of1: 0,of2: 0,of3: 0,of4: 0,of5: 0,of6: 0,of7: 0,of8: 0,of9: 0,of10: 0,of11: 0,of12: 0,of13: 0,of14: 0,
	// 	media1: "",media2: "",media3: "",mediaGeral: "",adm: req.session.adm,
	// 	dtInicial: dia1, dtFinal: hoje});

})

//Relatório geral filtrado por data
router.post("/admin/monitoring/reports", adminAuth, (req, res)=>{
	let dtInicial = req.body.dtInicial;
	let dtFinal = datas.diaMaisUmSearch(req.body.dtFinal);

	console.log("Inicial "+dtInicial)
	console.log("Final "+dtFinal)

	if(dtInicial != undefined && dtFinal != undefined){
		const Op = Sequelize.Op;
	
		Monitoring.findAll({
			order:[
				['updatedAt','DESC'] //ASC
			],
			include:[{model: Seller}],
			where: {
				dtMonitoria:{
					[Op.between]: [dtInicial, dtFinal]}
				}
		}).then(monitorings => {
			//inicializando variaveis
			var nota1 = 0;
			var nota2 = 0;
			var nota3 = 0;

			var qtd1 =0;
			var qtd2 =0;
			var qtd3 =0;

			var of1 = 0;
			var of2 = 0;
			var of3 = 0;
			var of4 = 0;
			var of5 = 0;
			var of6 = 0;
			var of7 = 0;
			var of8 = 0;
			var of9 = 0;
			var of10 = 0;
			var of11 = 0;
			var of12 = 0;
			var of13 = 0;
			var of14 = 0;

			//definindo qtd de apontamentos negativos para cada ofensor
			monitorings.forEach(m=>{
				if(m.abordagem == "nao"){
					of1++
				}
				if(m.fechamento == "nao"){
					of2++
				}
				if(m.ausente == "nao"){
					of3++
				}
				if(m.empatia == "nao"){
					of4++
				}
				if(m.seguro == "nao"){
					of5++
				}
				if(m.giria == "sim"){
					of6++
				}
				if(m.objetivo == "nao"){
					of7++
				}
				if(m.conhecimento == "nao"){
					of8++
				}
				if(m.sondagem == "nao"){
					of9++
				}
				if(m.argumento == "nao"){
					of10++
				}
				if(m.negociacao == "nao"){
					of11++
				}
				if(m.etica == "nao"){
					of12++
				}
				if(m.faltaCordialidade == "sim"){
					of13++
				}
				if(m.risco == "sim"){
					of14++
				}

			})

			var qtdM = monitorings.length;//qtd de monitorias no período informado
			//definindo porcentagem de apontamentos negativos de cada ofensor
			of1 = ((of1*100)/qtdM).toFixed(2);
			of2 = ((of2*100)/qtdM).toFixed(2);
			of3 = ((of3*100)/qtdM).toFixed(2);
			of4 = ((of4*100)/qtdM).toFixed(2);
			of5 = ((of5*100)/qtdM).toFixed(2);
			of6 = ((of6*100)/qtdM).toFixed(2);
			of7 = ((of7*100)/qtdM).toFixed(2);
			of8 = ((of8*100)/qtdM).toFixed(2);
			of9 = ((of9*100)/qtdM).toFixed(2);
			of10 = ((of10*100)/qtdM).toFixed(2);
			of11 = ((of11*100)/qtdM).toFixed(2);
			of12 = ((of12*100)/qtdM).toFixed(2);
			of13 = ((of13*100)/qtdM).toFixed(2);
			of14 = ((of14*100)/qtdM).toFixed(2);

			//atribuir notas das equipes
			monitorings.forEach(m => {
				if(m.seller.team == "01"){
					nota1 = nota1 + m.nota
					qtd1 ++
				}
				if(m.seller.team == "02"){
					nota2 = nota2 + m.nota
					qtd2 ++
				}
				if(m.seller.team == "03"){
					nota3 = nota3 + m.nota
					qtd3 ++
				}
			});			

			//Define média de cada equipe e evitando NaN
			if(nota1 == 0){
				var media1 = 0;
			}else{
				var media1 = nota1/ qtd1;
			}
			if(nota2 == 0){
				var media2 = 0;
			}else{
				var media2 = nota2/ qtd2;
			}
			if(nota3 == 0){
				var media3 = 0;
			}else{
				var media3 = nota3/ qtd3;
			}

			//definindo média geral
			var madiaGeral = (media1 +media2 + media3)/3
			
			res.render('admin/monitoring/reports/index', {
				dtInicial,dtFinal: req.body.dtFinal,
				of1,of2,of3,of4,of5,of6,of7,of8,of9,of10,of11,of12,of13,of14,
				media1: media1.toFixed(2),media2: media2.toFixed(2),media3: media3.toFixed(2),mediaGeral: madiaGeral.toFixed(2),
				 adm: req.session.adm});

		});

	}else{
		//res.render('admin/monitoring/reports/index', {adm: "", m: ""});
		res.send("Sem data")
		
	}
	

})

//Relatório por equipe
router.get("/admin/monitoring/report/:team",  adminAuth, (req,res)=>{
	let team = req.params.team;
	var dtInicial = datas.dia1Str();
	var hoje = datas.hojeStr();
	var dtFinal = datas.diaMaisUmSearch(hoje);
	
	const Op = Sequelize.Op;

	//where com sequelize funcionando
	Monitoring.findAll({
		order:[
			['updatedAt','DESC'] //ASC
		],
		include:[{model: Seller}],
		where: {
			dtMonitoria:{
				[Op.between]: [dtInicial, dtFinal]}
			},
	}).then(monitorings => {
		//inicializando variaveis
		var nota = 0;
		var qtd =0;		

		var of1 = 0;
		var of2 = 0;
		var of3 = 0;
		var of4 = 0;
		var of5 = 0;
		var of6 = 0;
		var of7 = 0;
		var of8 = 0;
		var of9 = 0;
		var of10 = 0;
		var of11 = 0;
		var of12 = 0;
		var of13 = 0;
		var of14 = 0;

		//definindo qtd de apontamentos negativos para cada ofensor
		monitorings.forEach(m=>{
			if(m.abordagem == "nao" && m.seller.team == team){
				//se o fensor for negativo (apontado) e a equipe for a selecionada...
				of1++
			}
			if(m.fechamento == "nao" && m.seller.team == team){
				of2++
			}
			if(m.ausente == "nao" && m.seller.team == team){
				of3++
			}
			if(m.empatia == "nao" && m.seller.team == team){
				of4++
			}
			if(m.seguro == "nao" && m.seller.team == team){
				of5++
			}
			if(m.giria == "sim" && m.seller.team == team){
				of6++
			}
			if(m.objetivo == "nao" && m.seller.team == team){
				of7++
			}
			if(m.conhecimento == "nao" && m.seller.team == team){
				of8++
			}
			if(m.sondagem == "nao" && m.seller.team == team){
				of9++
			}
			if(m.argumento == "nao" && m.seller.team == team){
				of10++
			}
			if(m.negociacao == "nao" && m.seller.team == team){
				of11++
			}
			if(m.etica == "nao" && m.seller.team == team){
				of12++
			}
			if(m.faltaCordialidade == "sim" && m.seller.team == team){
				of13++
			}
			if(m.risco == "sim" && m.seller.team == team){
				of14++
			}

		})

		//atribuir nota da equipe selecionada
		monitorings.forEach(m => {
			if(m.seller.team == team){
				nota = nota + m.nota
				qtd ++
			}
		});

		//definindo porcentagem de apontamentos negativos de cada ofensor
		of1 = ((of1*100)/qtd).toFixed(2);
		of2 = ((of2*100)/qtd).toFixed(2);
		of3 = ((of3*100)/qtd).toFixed(2);
		of4 = ((of4*100)/qtd).toFixed(2);
		of5 = ((of5*100)/qtd).toFixed(2);
		of6 = ((of6*100)/qtd).toFixed(2);
		of7 = ((of7*100)/qtd).toFixed(2);
		of8 = ((of8*100)/qtd).toFixed(2);
		of9 = ((of9*100)/qtd).toFixed(2);
		of10 = ((of10*100)/qtd).toFixed(2);
		of11 = ((of11*100)/qtd).toFixed(2);
		of12 = ((of12*100)/qtd).toFixed(2);
		of13 = ((of13*100)/qtd).toFixed(2);
		of14 = ((of14*100)/qtd).toFixed(2);
	
		
		
		//Define média da equipe e evitando NaN
		if(nota == 0){
			var media = 0;
		}else{
			var media = nota/ qtd;
		}

		Seller.findAll({
			order:[
				['updatedAt','DESC'] //ASC
			],
			where: { team: team }
			
		}).then(sellers => {
			res.render('admin/monitoring/reports/team', {
				dtInicial, dtFinal: hoje,media,team,
				of1,of2,of3,of4,of5,of6,of7,of8,of9,of10,of11,of12,of13,of14,
				media: media.toFixed(2),adm: req.session.adm, sellers
			});
		});
		//res.json(monitorings)

	});

	
})


//Relatório por equipe por período informado
router.post("/admin/monitoring/report/team",  adminAuth, (req,res)=>{
	let team = req.body.team;
	var dtInicial = req.body.dtInicial;
	var dtFinal = datas.diaMaisUm(req.body.dtFinal);
	
	const Op = Sequelize.Op;

	Monitoring.findAll({
		order:[
			['updatedAt','DESC'] //ASC
		],
		include:[{model: Seller}],
		where: {
			dtMonitoria:{
				[Op.between]: [dtInicial, dtFinal]}
			},
	}).then(monitorings => {
		//inicializando variaveis
		var nota = 0;
		var qtd =0;		

		var of1 = 0;
		var of2 = 0;
		var of3 = 0;
		var of4 = 0;
		var of5 = 0;
		var of6 = 0;
		var of7 = 0;
		var of8 = 0;
		var of9 = 0;
		var of10 = 0;
		var of11 = 0;
		var of12 = 0;
		var of13 = 0;
		var of14 = 0;

		//definindo qtd de apontamentos negativos para cada ofensor
		monitorings.forEach(m=>{
			if(m.abordagem == "nao" && m.seller.team == team){
				//se o fensor for negativo (apontado) e a equipe for a selecionada...
				of1++
			}
			if(m.fechamento == "nao" && m.seller.team == team){
				of2++
			}
			if(m.ausente == "nao" && m.seller.team == team){
				of3++
			}
			if(m.empatia == "nao" && m.seller.team == team){
				of4++
			}
			if(m.seguro == "nao" && m.seller.team == team){
				of5++
			}
			if(m.giria == "sim" && m.seller.team == team){
				of6++
			}
			if(m.objetivo == "nao" && m.seller.team == team){
				of7++
			}
			if(m.conhecimento == "nao" && m.seller.team == team){
				of8++
			}
			if(m.sondagem == "nao" && m.seller.team == team){
				of9++
			}
			if(m.argumento == "nao" && m.seller.team == team){
				of10++
			}
			if(m.negociacao == "nao" && m.seller.team == team){
				of11++
			}
			if(m.etica == "nao" && m.seller.team == team){
				of12++
			}
			if(m.faltaCordialidade == "sim" && m.seller.team == team){
				of13++
			}
			if(m.risco == "sim" && m.seller.team == team){
				of14++
			}

		})

		//atribuir nota da equipe selecionada
		monitorings.forEach(m => {				
			if(m.seller.team == team){
				nota = nota + m.nota
				qtd ++
			}				
		});	

		//definindo porcentagem de apontamentos negativos de cada ofensor
		of1 = ((of1*100)/qtd).toFixed(2);
		of2 = ((of2*100)/qtd).toFixed(2);
		of3 = ((of3*100)/qtd).toFixed(2);
		of4 = ((of4*100)/qtd).toFixed(2);
		of5 = ((of5*100)/qtd).toFixed(2);
		of6 = ((of6*100)/qtd).toFixed(2);
		of7 = ((of7*100)/qtd).toFixed(2);
		of8 = ((of8*100)/qtd).toFixed(2);
		of9 = ((of9*100)/qtd).toFixed(2);
		of10 = ((of10*100)/qtd).toFixed(2);
		of11 = ((of11*100)/qtd).toFixed(2);
		of12 = ((of12*100)/qtd).toFixed(2);
		of13 = ((of13*100)/qtd).toFixed(2);
		of14 = ((of14*100)/qtd).toFixed(2);
		

		//Define média da equipe e evitando NaN
		if(nota == 0){
			var media = 0;
		}else{
			var media = nota/ qtd;
		}

		Seller.findAll({
			order:[
				['updatedAt','DESC'] //ASC
			],
			where: { team: team }
			
		}).then(sellers => {

			res.render('admin/monitoring/reports/team', {
				dtInicial, dtFinal: req.body.dtFinal,media,team,
				of1,of2,of3,of4,of5,of6,of7,of8,of9,of10,of11,of12,of13,of14,
				media: media.toFixed(2),adm: req.session.adm, sellers
			});

		})

	});


	
})

//Relatório por vendedor
router.get("/admin/monitoring/report/seller/:id", adminAuth, (req, res)=>{


	res.render('admin/monitoring/reports/seller',{adm: req.body.adm})
})



module.exports = router;