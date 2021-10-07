const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const connection  = require("./database/connection");
const session = require("express-session");



//Controllers
const adminController = require("./class/item/itemController");
const itemController = require("./class/admin/adminController");
const sellerController = require("./class/seller/sellerController");
const monitoringController = require("./class/monitoring/monitoringController");
const promotionController = require("./class/promotion/promotionController");


//Models
const Item = require("./class/item/Item");
const Admin = require("./class/admin/Admin");
const Seller = require("./class/seller/Seller");
const Monitoring = require("./class/monitoring/Monitoring");
const Promotion = require("./class/promotion/Promotion");


//connection 
connection
	.authenticate()
	.then(() => {
		console.log('Conexão feita com o banco de dados.')
	})
	.catch((err) => {
		console.log(err)
	})	

app.set('view engine', 'ejs');
app.use(express.static("public"));

//var path = require('path');
//app.use('/public',express.static(path.join(__dirname, 'public')));
//app.set('views', path.join(__dirname, '/views'));

//session
app.use(session({
	secret: "az319kjudd894kid" , cookie: {} /*{maxAge: 24 * 60 * 60 * 1000} // 24 horas*/
}))

//body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//rotas

//pagina Home
app.get('/', (req, res) => {

	res.redirect("/items");
	
});


//Routers

app.use('/',adminController);
app.use('/',itemController);
app.use('/',sellerController);
app.use('/',monitoringController);
app.use('/',promotionController);



//Iniciando o servidor
app.listen(3000,(err) =>{
	if(err){
		console.log(err)
	}else{
		console.log("Servidor iniciado com sucesso.")
	}
});