function adminAuth(req, res, next){

	if (req.session.adm != undefined) {
		next();
	}else{
		res.redirect("/login");
	}
}


module.exports = adminAuth