(function ($) {
    "use strict";       
    

})(jQuery);


function umAdoze(){
    var parcela = document.getElementById("parcela").value;
    if(parcela > 12){
        document.getElementById("parcela").value = "12";

        var x = document.getElementsByClassName("qtdParcB").length;
        for (i = 0; i < x; i++){
            document.getElementsByClassName("qtdParcC")[i].innerHTML = "12";
            document.getElementsByClassName("qtdParcB")[i].innerHTML = "6";
        }
        defineValorParcela(12);                
    }else if(parcela < 1){
        document.getElementById("parcela").value = "1";
        
        var len = document.getElementsByClassName("qtdParcB").length;
        for (i = 0; i < len; i++){
            document.getElementsByClassName("qtdParcC")[i].innerHTML = "1";
            document.getElementsByClassName("qtdParcB")[i].innerHTML = "1";
        }        

        defineValorParcela(1);
        
    }else{
        document.getElementById("parcela").value = Math.floor(parcela);
        var len = document.getElementsByClassName("qtdParcB").length;
        for (i = 0; i < len; i++){
            document.getElementsByClassName("qtdParcB")[i].innerHTML = Math.floor(parcela > 6? 6:parcela);
            document.getElementsByClassName("qtdParcC")[i].innerHTML = Math.floor(parcela);
        } 
        defineValorParcela(parcela);
    }

}


function defineValorParcela(y){
    var x = Math.floor(y);
   
    var len = document.getElementsByClassName("qtdParcB").length;

    for (i = 0; i < len; i++){
        var valor = document.getElementsByClassName("valBlt")[i].innerHTML;  
        var valParc = x > 6? valor/6 : valor/ x;
        document.getElementsByClassName("valParcB")[i].innerHTML =  Math.floor(valParc);       
    }
    
    //Desconto automático cartão
    if(x <= 5){
        var len = document.getElementsByClassName("qtdParcC").length;
        for (i = 0; i < len; i++){
            var valor = document.getElementsByClassName("valPix")[i].innerHTML; 
            var valParc = valor/ x;
            document.getElementsByClassName("valParcC")[i].innerHTML = Math.floor(valParc);

            var vC = document.getElementsByClassName("valCard")[i];
            vC.style.color = '#696969';
            vC.style.fontSize = '0.8em';
            vC.style.fontStyle = 'italic';
            vC.style.textDecoration = 'line-through';

            var vP = document.getElementsByClassName("valPix")[i];
            vP.style.display = "inline";
            vP.style.fontWeight = 'bold';
            vP.style.color = '#0275d8';
            vP.style.marginLeft = '25px';

            var totDescC = document.getElementsByClassName("qtdParcCdesc")[i];
            totDescC.style.display = "inline";
            totDescC.style.fontSize = '0.8em';
            totDescC.style.color = '#0275d8';
            totDescC.style.marginLeft = '25px';
            totDescC.style.fontWeight = 'bold';
                   
            var valC_desconto = vC.innerHTML - vP.innerHTML;
            totDescC.innerHTML = "-"+valC_desconto;
            

        }        
    }else{
        var len = document.getElementsByClassName("qtdParcC").length;
        for (i = 0; i < len; i++){
            var valor = document.getElementsByClassName("valCard")[i].innerHTML; 
            var valParc = valor/ x;
            document.getElementsByClassName("valParcC")[i].innerHTML = Math.ceil(valParc);

            //volta ao normal
            document.getElementsByClassName("valPix")[i].style.display = "none";
            var vC = document.getElementsByClassName("valCard")[i];
            vC.style.color = '';
            vC.style.fontSize = '';
            vC.style.fontStyle = '';
            vC.style.textDecoration = '';

            document.getElementsByClassName("qtdParcCdesc")[i].style.display = "none";
        
        }       
    }
   

}

//------------------------Forms---------------------//


		
function comparaPass(event, form){
    event.preventDefault();  
    var pass = document.getElementById("password").value;
    var passCheck = document.getElementById("password-check").value;
    
    if(pass == passCheck){				
        form.submit();
    }else{
        alert("As senhas informadas não conferem!")
    }
}



