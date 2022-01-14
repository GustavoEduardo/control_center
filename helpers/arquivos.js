var pdf = require("html-pdf");
var ejs = require("ejs");


function createPdf(nome, m){
	
	var nome = nome;
	var adm = adm;
	var m = m;//monitoria

	ejs.renderFile("./views/admin/monitoring/pdf.ejs",{adm, m},(err, html)=>{
		if(err){
			console.log(err)
		}else{
			pdf.create(html,{}).toFile("./public/file/"+nome+".pdf",(err, res)=>{ 
				if(err){
					console.log(err)
				}else{
					console.log("PDF Criado "+res)
				}
			})
		}
	
	})

}






module.exports = {
	createPdf
};