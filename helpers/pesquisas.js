

function prodTipos(t){
    var tipo = t;

    switch (tipo) {
        case "kit":
            return "Kits";      
        case "img":
            return "Imagens";  
        case "ter":
            return "Terços"; 
        case "med":
             return "Medalhões";
        case "out":
            return "Outros";
        default:
            return "Tudo"; 
        }

}

function equipe(team){
    var t = team;

    switch (t) {
        case "01":
            return "Felipe"; 
        case "02":
            return "Camila"; 
        case "03":
             return "Gustavo";
        }

}


module.exports = {
	prodTipos,
    equipe
};