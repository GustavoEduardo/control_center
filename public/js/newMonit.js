
    //para verificar  se a nota ja foi subtraaida
    var notaSubtraida={
        ofensor1: "n",
        ofensor2: "n",
        ofensor3: "n",
        ofensor4: "n",
        ofensor5: "n",  
        ofensor6: "n",      
        ofensor7: "n",
        ofensor8: "n",
        ofensor9: "n",
        ofensor10: "n",
        ofensor11: "n",
        ofensor12: "n",
        ofensor13: "n",
        ofensor14: "n",
    }

    var nota = 0;
    var inputNota = document.getElementById("nota");
    var notas = [5,10,5,5,6,3,6,15,15,15,15];
    var grave12;
    var grave13;
    var grave14;
    var notaFinal = document.getElementById("notaFinal");

   function resNao(id){
      var resposta = document.getElementById(id).value
      var pergunta = document.getElementById(id).name//name da pergunta = id do textarea

      //mostra o text area do monito e torna orbigatório
      if(resposta == "nao"){
        var motivo = document.getElementById(pergunta)
        motivo.style.display = "inline";
        motivo.setAttribute("required", "required");
        
        switch (pergunta) {
            case "ofensor1":
                if(notaSubtraida.ofensor1 == "n"){
                    notas[0] =0;                 
                    notaSubtraida.ofensor1 = "s";
                }                
                break;
            case "ofensor3":
                if(notaSubtraida.ofensor3 == "n"){
                    notas[2] =0;
                    notaSubtraida.ofensor3 = "s";
                    
                }                
                break;
            case "ofensor4":
                if(notaSubtraida.ofensor4 == "n"){
                    notas[3] =0;
                    notaSubtraida.ofensor4 = "s";
                }                
                break;
            case "ofensor2":
                if(notaSubtraida.ofensor2 == "n"){
                    notas[1] =0;
                    notaSubtraida.ofensor2 = "s";
                    console.log(nota);
                }                
                break;
            case "ofensor5":
                if(notaSubtraida.ofensor5 == "n"){
                    notas[4] =0;
                    notaSubtraida.ofensor5 = "s";
                }                
                break;
            case "ofensor7":
                if(notaSubtraida.ofensor7 == "n"){
                    notas[6] =0;
                    notaSubtraida.ofensor7 = "s";
                }                
                break;
            case "ofensor8":
                if(notaSubtraida.ofensor8 == "n"){
                    notas[7] =0;
                    notaSubtraida.ofensor8 = "s";
                }                
                break; 
            case "ofensor9":
                if(notaSubtraida.ofensor9 == "n"){
                    notas[8] =0;
                    notaSubtraida.ofensor9 = "s";
                }                
                break;
            case "ofensor10":
                if(notaSubtraida.ofensor10 == "n"){
                    notas[9] =0;
                    notaSubtraida.ofensor10 = "s";
                }                
                break;
            case "ofensor11":
                if(notaSubtraida.ofensor11 == "n"){
                    notas[10] =0;
                    notaSubtraida.ofensor11 = "s";
                }                
                break;          
            case "ofensor12":                
                grave12 = true;
                notaSubtraida.ofensor12 = "s";
                break;
                
        }
        nota = 0;
        for(i =0; i <= 10; i++){
            nota = nota + notas[i];
        }
        //campo que vai para o banco
        if(grave12 || grave13 || grave14){
            inputNota.value = 0;
            notaFinal.innerHTML = 0;

        }else{
           inputNota.value = nota;
           notaFinal.innerHTML = inputNota.value;
        }

        console.log(notas);
        console.log(nota);
        
      }else{
        //Esconde o text area da pergunta e tira a obrigatoriedade
        var motivo = document.getElementById(pergunta)
        motivo.style.display = "none";
        montvo.innerHTML = "";
        motivo.removeAttribute("required",null);       
      }
    }

    function resSim(id){
      var resposta = document.getElementById(id).value
      var pergunta = document.getElementById(id).name

      if(resposta != "nao"){
          //Mostra o text area da pergunta e torna obrigatório
          var motivo = document.getElementById(pergunta)//name da pergunta = id do textarea
          motivo.style.display = "inline";
          motivo.setAttribute("required", "required");

        switch (pergunta) {

            case "ofensor6":
                if(notaSubtraida.ofensor6 == "n"){
                    notas[5] =0;
                    notaSubtraida.ofensor6 = "s";
                }                
                break;      
            case "ofensor13":
                grave13 = true;
                notaSubtraida.ofensor13 = "s";
                break;
            case "ofensor14":
                grave14 = true;
                notaSubtraida.ofensor14 = "s";               
                break;
        }
        nota = 0;
        for(i =0; i <= 10; i++){
            nota = nota + notas[i];
        }
        //campo que vai para o banco
        if(grave12 || grave13 || grave14){
            inputNota.value = 0;
            notaFinal.innerHTML = 0;

        }else{
           inputNota.value = nota;
           notaFinal.innerHTML = inputNota.value;
        }

        console.log(notas);
        console.log(nota);      
        
      }else{
        var motivo = document.getElementById(pergunta)//name da pergunta = id do textarea
        motivo.style.display = "none";
        motivo.removeAttribute("required",null);  
      }

    }

    function voltaNota(id){
        var resposta = document.getElementById(id);

        //Esconde o text area da pergunta e tira a obrigatoriedade
        var motivo = document.getElementById(resposta.name)//name da pergunta = id do textarea
        motivo.style.display = "none";
        motivo.removeAttribute("required",null);

        switch (id) {
            case "1-s":
                if(notaSubtraida.ofensor1 == "s"){
                    notas[0] =5;
                    notaSubtraida.ofensor1 = "n";
                }                
                break;
            case "3-s":
                if(notaSubtraida.ofensor3 == "s"){
                    notas[2] =5;
                    notaSubtraida.ofensor3 = "n";
                }                
                break;
            case "4-s":
                if(notaSubtraida.ofensor4 == "s"){
                    notas[3] =5;
                    notaSubtraida.ofensor4 = "n";
                }                
                break;
            case "2-s":
                if(notaSubtraida.ofensor2 == "s"){
                    notas[1] =10;
                    notaSubtraida.ofensor2 = "n";
                }                
                break;
            case "5-s":
                if(notaSubtraida.ofensor5 == "s"){
                    notas[4] =6;
                    notaSubtraida.ofensor5 = "n";
                }                
                break;
            case "6-n":
                if(notaSubtraida.ofensor6 == "s"){
                    notas[5] =3;
                    notaSubtraida.ofensor6 = "n";
                }                
                break;
            case "7-s":
                if(notaSubtraida.ofensor7 == "s"){
                    notas[6] =6;
                    notaSubtraida.ofensor7 = "n";
                }                
                break;
            case "8-s":
                if(notaSubtraida.ofensor8 == "s"){
                    notas[7] =15;
                    notaSubtraida.ofensor8 = "n";
                }                
                break; 
            case "9-s":
                if(notaSubtraida.ofensor9 == "s"){
                    notas[8] =15;
                    notaSubtraida.ofensor9 = "n";
                }                
                break; 
            case "10-s":
                if(notaSubtraida.ofensor10 == "s"){
                    notas[9] =15;
                    notaSubtraida.ofensor10 = "n";
                }                
                break; 
            case "11-s":
                if(notaSubtraida.ofensor11 == "s"){
                    notas[10] =15;
                    notaSubtraida.ofensor11 = "n";
                }                
                break;
            //penalidades que zeram a nota
            case "12-s":
                if(notaSubtraida.ofensor12 == "s"){
                    grave12 = false;                                 
                    notaSubtraida.ofensor12 = "n";
                }                
                break; 
            case "13-n":
                if(notaSubtraida.ofensor13 == "s"){
                    grave13 = false;                     
                    notaSubtraida.ofensor13 = "n";
                }                
                break;               
            case "14-n":
                if(notaSubtraida.ofensor14 == "s"){
                    grave14 = false;                     
                    notaSubtraida.ofensor14 = "n";
                }                
                break;
                
        } 
        nota = 0;
        for(i =0; i <= 10; i++){
            nota = nota + notas[i];
        }
        //campo que vai para o banco
        if(grave12 || grave13 || grave14){
            inputNota.value = 0;
            notaFinal.innerHTML = 0;

        }else{
           inputNota.value = nota;
           notaFinal.innerHTML = inputNota.value;
        }
        
        console.log(notas);
        console.log(nota);

    }


   