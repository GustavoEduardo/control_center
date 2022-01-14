
function diaMaisUm(dataErrada){
    var data = new Date(dataErrada);
        data.setDate(data.getDate() + 1);				
    return data;
}

//verifica se o parametro está vazio
function diaMaisUmSearch(dataErrada){
    if(dataErrada == undefined || dataErrada == "" || dataErrada == null){
        var data = new Date();

        return data;
    }

    var data = new Date(dataErrada);
        data.setDate(data.getDate() + 1);

        return data;
}


function hojeStr(){

    var newDate = new Date();
    
    if(newDate.getMonth() < 9){//9 = outubro
        if(newDate.getDate() < 10){
            var d = newDate.getFullYear()+"-0"+(newDate.getMonth()+1)+"-0"+newDate.getDate();
        }else{
            var d = newDate.getFullYear()+"-0"+(newDate.getMonth()+1)+"-"+newDate.getDate();
        }
    }else{
        if(newDate.getDate() < 10){
            var d = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-0"+newDate.getDate();
        }else{
            var d = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate();
        }
        
    }
    return d;

    
}

function dia1Str(){

    var newDate = new Date();
    
    if(newDate.getMonth() < 9){//9 = outubro       
        var d = newDate.getFullYear()+"-0"+(newDate.getMonth()+1)+"-01";
    }else{
        var d = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-01";
    }  
    return d;    
    
}



module.exports = {
	diaMaisUm,
    diaMaisUmSearch,
    hojeStr,
    dia1Str
};