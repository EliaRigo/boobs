/**
 * Created by ivanmorandi on 05/12/14.
 */

const TIME_TRANSLATION = 400;
const TIME_SLIDE = 2000;

var maps = true;
var aulaattuale;
var polo="A";
var dati;
var mobile;
var piano="0";
var mappa="maps/APiano0.html";
var widthDetails=0;
var toogle = false;
var tuttidati;


//GESTIONE FEEDBACK
var votorooms, votonoise, votolavagna;
var boolrooms = false, boolnoise = false, boollavagna = false;


//insert_feedback($user_level,$blackboard,$noise,$id_room)

function send () {
    $.ajax({
        url: 'php/index.php',
        type: 'post',
        data: { "insert_feedback": { param1: votorooms, param2: votolavagna, param3: votonoise, param4: aulaattuale } },
        success: function(response) { alert(response); }
    });
}

function update () {
    $.getJSON( "php/index.php", function( data ) {
        dati = data;
        populate();

    });
}

function quantityCompare(a,b)
{
    return (a.Quantita - b.Quantita);
}

function getIndexFromRoom(aula)
{
    for(var i = 0;i<dati.length;i++) {
        if (dati[i].Name == aula) {
            if(aula == "Aula Studio")
            {
                if(dati[i].Piano != parseInt(piano))
                    continue;

            }

            return i;
        }
    }

    return -1;

}


function populate(){
    for(var i=0;i<dati.length;i++)
    {
        //alert('.room:contains('+dati[i].Name+')');
        var elem = $('.room:contains('+dati[i].Name+')');

        elem.removeClass("vuota");
        elem.removeClass("mezza");
        elem.removeClass("affollata");
        elem.removeClass("piena");
        elem.removeClass("lezione");

        if(dati[i].Quantita<0)
        {
            elem.addClass("lezione");
        }else if(dati[i].Quantita<25)
        {
            elem.addClass("vuota");
        }else if(dati[i].Quantita<50)
        {
            elem.addClass("mezza");
        }
        else if(dati[i].Quantita<75)
        {
            elem.addClass("affollata");
        }
        else
        {
            elem.addClass("piena");
        }
    }
}

function details(aula){
    var index = getIndexFromRoom(aula);

    if(index<0)
        return;

    aulaattuale = aula;
    $(".det-room").text(aula);


    var elem =$(".titleBar");
    var occupatezzosita;

    elem.removeClass("vuota-nograd-titlebar");
    elem.removeClass("mezza-nograd-titlebar");
    elem.removeClass("affollata-nograd-titlebar");
    elem.removeClass("piena-nograd-titlebar");
    elem.removeClass("lezione-nograd-titlebar");

    if(dati[index].Quantita<0)
    {
        elem.addClass("lezione-nograd-titlebar");
        occupatezzosita="Lezione";
    }
    else if(dati[index].Quantita<25)
    {
        elem.addClass("vuota-nograd-titlebar");
        occupatezzosita="Libera";
    }
    else if(dati[index].Quantita<50)
    {
        elem.addClass("mezza-nograd-titlebar");
        occupatezzosita="Leggermente occupata";
    }
    else if(dati[index].Quantita<75)
    {
        elem.addClass("affollata-nograd-titlebar");
        occupatezzosita="Affollata";
    }
    else
    {
        elem.addClass("piena-nograd-titlebar");
        occupatezzosita="Piena";
    }





    var lavagna;
    if(dati[index].Lavagna == 1)
        lavagna = "Disponibile";
    else
        lavagna = "Non Disponibile";

    var rumore;
    if(dati[index].Rumore == 1)
        rumore = "Silenzioso";
    else
        rumore = "Non Silenzioso";


    var stringa =
        "<ul>" +
        "<li>"+aula+"</li>"+
        "<li>"+occupatezzosita+"</li>"+
        "<li>"+lavagna+"</li>"+
        "<li>"+rumore+"</li></ul>";

    $(".dettagli:nth-child(2)").html(stringa);


}



$(document).ready(function(){


    mobile = jQuery.browser.mobile;

    //Se sono su un telefono, vengo redirezionato
    if(mobile)
    {
        window.location.replace("m.index.html");
    }


    //mi salvo la grandezza del div details
    widthDetails = $(".detailsRoom").width();

//    callAJAX();
    update();
    //carico la mappa
    cambiaMappa(mappa);

    function cambiaMappa(map, loadlist) {
        $(".containerMap").load(map, function () {
            if(loadlist)
            {
                dati.sort( quantityCompare );



                var a = "", b="";
                for(var i=0;i<dati.length;i++)
                {

                    if(dati[i].Quantita<0)
                        continue;



                    var classe;
                    var back;

                    if(dati[i].Quantita<0)
                    {
                        classe = "lezione-nograd";
                    }
                    else if(dati[i].Quantita<25)
                    {
                        classe = "vuota-nograd";
                        back = "back-vuota";
                    }
                    else if(dati[i].Quantita<50)
                    {
                        classe = "mezza-nograd";
                        back = "back-mezza";
                    }
                    else if(dati[i].Quantita<75)
                    {
                        classe = "affollata-nograd";
                        back = "back-affollata";
                    }
                    else
                    {
                        classe = "piena-nograd";
                        back = "back-piena";
                    }

                    //controlla se è polo A e polo B
                    if(dati[i].Polo == "A")
                    {
                         a +=  '<li class="'+back+'"><div class="list-room">'+
                                    '<div class="room-status '+classe+'">&ensp;&ensp;</div>'+
                                    '<div class="room-nome">'+dati[i].Name+'</div>'+
                                    '<div class="room-polo">Polo: '+dati[i].Polo+'</div>'+
                                    '<div class="room-piano">Piano: '+dati[i].Piano+'</div>'+
                                    '</div></li>';



                    }
                    else
                    {
                       b +=  '<li class="'+back+'"><div class="list-room">'+
                            '<div class="room-status vuota-nograd">&ensp;&ensp;</div>'+
                            '<div class="room-nome">'+dati[i].Name+'</div>'+
                            '<div class="room-polo">Polo: '+dati[i].Polo+'</div>'+
                            '<div class="room-piano">Piano: '+dati[i].Piano+'</div>'+
                            '</div></li>';
                        

                    }
                    //aggiungi lista
                }

                $(".poloA ul").html(a);
                $(".poloB ul").html(b);
            }
            else
            {
                populate();
            }

        });

    }













    $(".sel-mappe").click(function () {
        cambiaMappa(mappa, false);
    });

    $(".sel-list-rooms").click(function () {
        //$(".containerMap:first-child").remove();
        cambiaMappa("listprova.html", true);

    });

    $(".sel-polo-A").click(function () {
        if(polo != "A")
        {
            polo = "A";
            piano = "0";
        }
        mappa = "maps/"+polo+"Piano"+piano+".html";
        cambiaMappa(mappa, false);
    });

    $(".sel-polo-B").click(function () {
        if(polo != "B")
        {
            polo = "B";
            piano = "1";
        }
        mappa = "maps/"+polo+"Piano"+piano+".html";
        cambiaMappa(mappa, false)
    });

    //cambio piano
    $(".nav .nav-second-level li").click(function(){
        piano = $(this).data("piano");
        mappa = "maps/"+polo+"Piano"+piano+".html";
        cambiaMappa(mappa, false)
        //da caricare i nuovi dati
    });

    //dettagli dell'aula selezionata
    $(".containerMap").on("click",".room",function(){
        //alert($(this).text());
        widthDetails = $(".detailsRoom").width();
        var larghezza = widthDetails;
        var tmp = "-="+larghezza;
        details($(this).text());
        if(toogle==false) {
            //aggiorna valori



            $(".detailsRoom").show();
            $(".detailsRoom").animate({left: tmp}, TIME_TRANSLATION, 'linear');
            if(mobile)
            {
                $(".detailsRoom").css("width","100%");
                $(".detailsRoom").css("heigth","100%");
            }

            toogle=true;
        }
        else
        {
            $(".details").fadeOut();
            //aggiorna valori
            $(".details").fadeIn();

        }
    }).on("click","td:not(.room)",function(){ //uscita dai dettagli
        var larghezza = widthDetails;
        var tmp = "+="+larghezza;
        if(toogle==true) {

            $(".detailsRoom").animate({left: tmp}, TIME_TRANSLATION, 'linear', function(){
                $(".detailsRoom").hide();
            });
            //

            toogle=false;
        }
    });

    // click X per uscire dai dettagli
    $(".detailsRoom .close").click(function()
    {
        var larghezza = widthDetails;
        var tmp = "+="+larghezza;
        if(toogle==true) {
            //aggiorna valori

            $(".detailsRoom").animate({left: tmp}, TIME_TRANSLATION, 'linear', function(){
                $(".detailsRoom").hide();
            });



            toogle=false;
        }
    });


    //apparizione feedback lavagna
    $(".feedbackQuantity .voto").on("click",function(){
        //fa qualcosa per mostrare avvenuto click

        var v = $(this).text();
        boolrooms = true;

        switch (v)
        {
            case "V": votorooms = 0; break;
            case "M": votorooms = 25; break;
            case "A": votorooms = 50; break;
            case "P": votorooms = 75; break;
            case "L": votorooms = -100; break;
        }

        //mostra lavagna
        $(".lavagna").show(TIME_SLIDE);

    });

    $(".lavagna .lava").click(function () {
        boollavagna=true;
        votolavagna = 1;

        if(boolnoise && boollavagna && boolrooms)
            send();
    });

    $(".lavagna .nolava").click(function () {
        boollavagna=true;
        votolavagna = 0;

        if(boolnoise && boollavagna && boolrooms)
            send();
    });

    $(".lavagna .sound").click(function () {
        boolnoise=true;
        votonoise = 1;

        if(boolnoise && boollavagna && boolrooms)
            send();
    });

    $(".lavagna .nosound").click(function () {
        boolnoise=true;
        votonoise = 0;

        if(boolnoise && boollavagna && boolrooms)
            send();
    });


    $(".containerMap").on("click",".list-rooms li", function () {
        widthDetails = $(".detailsRoom").width();
        var larghezza = widthDetails;
        var tmp = "-="+larghezza;

        details($(':nth-child(2)', this).text());

        if(toogle==false) {
            //aggiorna valori



            $(".detailsRoom").show();
            $(".detailsRoom").animate({left: tmp}, TIME_TRANSLATION, 'linear');


            toogle=true;
        }
        else
        {
            /*)
            $(".details").fadeOut();
            //aggiorna valori
            $(".details").fadeIn();
            */



        }
    });



    

});

/*
function populate(){
    for(var i=0;i<dati.length;i++)
    {
        //alert('.room:contains('+dati[i].Name+')');
        var elem = $('.room:contains('+dati[i].Name+')');

        elem.removeClass("vuota");
        elem.removeClass("mezza");
        elem.removeClass("affollata");
        elem.removeClass("piena");
        elem.removeClass("lezione");

        switch (dati[i].Quantita){
            case 0: elem.addClass("vuota"); break;
            case 25: elem.addClass("mezza"); break;
            case 50: elem.addClass("affollata"); break;
            case 75: elem.addClass("piena"); break;
            case -100: elem.addClass("lezione"); break;
        }
    }
}

function details(aula){
    var index = getIndexFromRoom(aula);
    $(".det-room").text(aula);

    var elem = $(".titleBar");
    elem.removeClass("vuota-nograd-titlebar");
    elem.removeClass("mezza-nograd-titlebar");
    elem.removeClass("affollata-nograd-titlebar");
    elem.removeClass("piena-nograd-titlebar");
    elem.removeClass("lezione-nograd-titlebar");

    switch (dati[index].Quantita){
        case 0: elem.addClass("vuota-nograd-titlebar"); break;
        case 25: elem.addClass("mezza-nograd-titlebar"); break;
        case 50: elem.addClass("affollata-nograd-titlebar"); break;
        case 75: elem.addClass("piena-nograd-titlebar"); break;
        case -100: elem.addClass("lezione-nograd-titlebar"); break;
    }

    var occupatezzosita;
    switch (dati[index].Quantita){
        case 0: occupatezzosita="Libera"; break;
        case 25: occupatezzosita="Leggermente occupata"; break;
        case 50: occupatezzosita="Affollata"; break;
        case 75: occupatezzosita="Piena"; break;
        case -100: occupatezzosita="Lezione"; break;
    }

    var lavagna;
    if(dati[index].Lavagna == 1)
        lavagna = "Disponibile";
    else
        lavagna = "Non Disponibile";

    var rumore;
    if(dati[index].Rumore == 1)
        rumore = "Silenzioso";
    else
        rumore = "Non Silenzioso";


    var stringa =
        "<ul>" +
        "<li>"+aula+"</li>"+
        "<li>"+occupatezzosita+"</li>"+
        "<li>"+lavagna+"</li>"+
        "<li>"+rumore+"</li></ul>";

    $(".dettagli:nth-child(2)").html(stringa);


}*/

