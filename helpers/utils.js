
//***************************Gráfico de ofensores circular para as telas de relátorio**********************



//***************************Grefico de linha para histórico de médias***********************************

    
    

    //Grafico de barras index monitoria

    // var myChart = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Abordagem', 'Fechamento', 'Ausência', 'Empatia', 'Segurança', 'Giria', 'Objetivo','Conhecimento','Sondagem','Argumento','Negociacao','Ética','Falta Cordialidade','Risco'],
    //         datasets: [{
    //             label: 'Porcentagem',
    //             data: [of1,of2,of3,of4,of5,of6,of7,of8,of9,of10,of11,of12,of13,of14],
    //             backgroundColor: [
    //                 'rgba(22, 99, 132)',                    
    //                 'rgba(255,16, 126)',
    //                 'rgba(54, 162, 235)',
    //                 '#022511',
    //                 '#525548',
    //                 'rgba(255, 159, 64)',
    //                 '#739653',
    //                 '#d96848',
    //                 '#027518',
    //                 '#9275d8',
    //                 '#F55E00',
    //                 '#442261',
    //                 '#000',
    //                 '#C02323'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //       plugins: {
    //           title: {
    //             display: true,
    //             text: 'Média Geral de apontamentos em %',
    //           }
    //       },
    //     }
    // });



    //filtro de monitoria por time filtrando com ex integrantes e where com squelize funcionando
    // router.get("/admin/monitoring/report/:team",  adminAuth, (req,res)=>{
    //     let team = req.params.team;
    //     var dtInicial = datas.dia1Str();
    //     var hoje = datas.hojeStr();
    //     var dtFinal = datas.diaMaisUmSearch(hoje);
        
    //     const Op = Sequelize.Op;
    
    //     //where com sequelize funcionando
    //     Monitoring.findAll({
    //         order:[
    //             ['updatedAt','DESC'] //ASC
    //         ],
    //         include:[{model: Seller}],
    //         where: {
    //             dtMonitoria:{
    //                 [Op.between]: [dtInicial, dtFinal]},
    //                 [Op.and]: {equipe: team}
    //             },
    //     }).then(monitorings => {
    //         //inicializando variaveis
    //         var nota = 0;
    //         var qtd =0;		
    
    //         var of1 = 0;
    //         var of2 = 0;
    //         var of3 = 0;
    //         var of4 = 0;
    //         var of5 = 0;
    //         var of6 = 0;
    //         var of7 = 0;
    //         var of8 = 0;
    //         var of9 = 0;
    //         var of10 = 0;
    //         var of11 = 0;
    //         var of12 = 0;
    //         var of13 = 0;
    //         var of14 = 0;
    
    //         //definindo qtd de apontamentos negativos para cada ofensor
    //         monitorings.forEach(m=>{
    //             if(m.abordagem == "nao"){
    //                 of1++
    //             }
    //             if(m.fechamento == "nao"){
    //                 of2++
    //             }
    //             if(m.ausente == "nao"){
    //                 of3++
    //             }
    //             if(m.empatia == "nao"){
    //                 of4++
    //             }
    //             if(m.seguro == "nao"){
    //                 of5++
    //             }
    //             if(m.giria == "sim"){
    //                 of6++
    //             }
    //             if(m.objetivo == "nao"){
    //                 of7++
    //             }
    //             if(m.conhecimento == "nao"){
    //                 of8++
    //             }
    //             if(m.sondagem == "nao"){
    //                 of9++
    //             }
    //             if(m.argumento == "nao"){
    //                 of10++
    //             }
    //             if(m.negociacao == "nao"){
    //                 of11++
    //             }
    //             if(m.etica == "nao"){
    //                 of12++
    //             }
    //             if(m.faltaCordialidade == "sim"){
    //                 of13++
    //             }
    //             if(m.risco == "sim"){
    //                 of14++
    //             }
    
    //         })
    
    //         var qtdM = monitorings.length;//qtd de monitorias no período informado
    //         //definindo porcentagem de apontamentos negativos de cada ofensor
    //         of1 = ((of1*100)/qtdM).toFixed(2);
    //         of2 = ((of2*100)/qtdM).toFixed(2);
    //         of3 = ((of3*100)/qtdM).toFixed(2);
    //         of4 = ((of4*100)/qtdM).toFixed(2);
    //         of5 = ((of5*100)/qtdM).toFixed(2);
    //         of6 = ((of6*100)/qtdM).toFixed(2);
    //         of7 = ((of7*100)/qtdM).toFixed(2);
    //         of8 = ((of8*100)/qtdM).toFixed(2);
    //         of9 = ((of9*100)/qtdM).toFixed(2);
    //         of10 = ((of10*100)/qtdM).toFixed(2);
    //         of11 = ((of11*100)/qtdM).toFixed(2);
    //         of12 = ((of12*100)/qtdM).toFixed(2);
    //         of13 = ((of13*100)/qtdM).toFixed(2);
    //         of14 = ((of14*100)/qtdM).toFixed(2);
    
    //         //atribuir notas da equipe
    //         monitorings.forEach(m => {				
    //             nota = nota + m.nota
    //             qtd ++				
    //         });
            
            
    //         //Define média da equipe e evitando NaN
    //         if(nota == 0){
    //             var media = 0;
    //         }else{
    //             var media = nota/ qtd;
    //         }
    
    //         Seller.findAll({
    //             order:[
    //                 ['updatedAt','DESC'] //ASC
    //             ],
    //             where: { team: team }
                
    //         }).then(sellers => {
    //             res.render('admin/monitoring/reports/team', {
    //                 dtInicial, dtFinal: hoje,media,team,
    //                 of1,of2,of3,of4,of5,of6,of7,of8,of9,of10,of11,of12,of13,of14,
    //                 media: media.toFixed(2),adm: req.session.adm, sellers
    //             });
    //         });
    //         //res.json(monitorings)
    
    //     });
    
        
    // })
    