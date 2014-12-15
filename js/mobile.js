const TIME_TRANSLATION = 400;
const TIME_SLIDE = 2000;

var polo = "A";
var mobile;
var piano = "0";
var mappa = "maps/APiano0.html";
var widthDetails = 0;
var toogle = false;

//GESTIONE FEEDBACK
var votorooms, votonoise, votolavagna;
var boolrooms = false, boolnoise = false, boollavagna = false;


//insert_feedback($user_level,$blackboard,$noise,$id_room)

function send () {
    var quant = votorooms;
    if(quant>=50)
        quant+=25;
    $.ajax({
        url: "php/new_feedback.php",
        data: { param1: quant, param2: votolavagna, param3: votonoise, param4: aulaattuale },
        type: "POST"
    });

    boollavagna = false;
    boolnoise = false;

    update();
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

    aulaattuale = dati[index].ID;
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

function update () {
    $.getJSON( "php/index.php", function( data ) {
        dati = data;
        populate();

    });
}

function getIndexFromRoom(aula)
{
    for(var i = 0;i<dati.length;i++) {
        if (dati[i].Name == aula) {
            if(aula == "Studio")
            {
                if(dati[i].Piano != parseInt(piano))
                    continue;

            }

            return i;
        }
    }

    return -1;

}


$(document).ready(function () {
    mobile = jQuery.browser.mobile;

    //Se sono su un telefono, vengo redirezionato
    if (!mobile) {
        window.location.replace("index.html");
    }

    update();

    //carico la mappa
    $(".mMap").load(mappa);

    $(".swipeAvviso").animate({ "opacity": 0 }, 3000).hide("slow");

    //$(".voto").css({height:""+$(".voto").width()});

    //mi salvo la grandezza del div details
    //widthDetails = $(".mDetails").width();

    //cambio piano
    $(".nav .nav-second-level li").click(function () {
        piano = $(this).data("piano");
        mappa = "maps/" + polo + "Piano" + piano + ".html";
        $(".mMap").load(mappa);
    });

    //dettagli dell'aula selezionata
    $(".mMap").on("click", ".room", function () {


        if (toogle == false) {
            details($(this).text());

            $(".mDetails").show();

            $(".mDetails").animate({ left: "0%" }, TIME_TRANSLATION, 'linear');

            toogle = true;
        }
        else {
            $(".details").fadeOut();
            //aggiorna valori
            $(".details").fadeIn();

        }
    });

    $(".liRoom").on("click", function () {

        if (toogle == false) {
            details($(this).text());

            $(".mDetails").show();
            $(".mDetails").animate({ left: "0%" }, TIME_TRANSLATION, 'linear');

            toogle = true;
        }
        else {
            $(".details").fadeOut();
            //aggiorna valori
            $(".details").fadeIn();

        }
    });
    /*).on("click", "td:not(.room)", function () { //uscita dai dettagli

        if (toogle == true) {
            //aggiorna valori
            $(".detailsRoom").animate({ left: "100%" }, TIME_TRANSLATION, 'linear', function () {
                $(".detailsRoom").hide();
            });
            toogle = false;
        }
    });*/

    // click X per uscire dai dettagli
    $(".closeDetails").click(function () {

            $(".mDetails").animate({ left: "100%" }, TIME_TRANSLATION, 'linear', function () {
                $(".mDetails").hide();
            });
            toogle = false;
    });


    $(".feedbackQuantity .voto").on("click",function(){
        //fa qualcosa per mostrare avvenuto click

        var v = $(this).text();
        boolrooms = true;

        /*
         $(".feedbackQuantity td div").removeClass("vuota-nograd");
         $(".feedbackQuantity td div").removeClass("mezza-nograd");
         $(".feedbackQuantity td div").removeClass("affollata-nograd");
         $(".feedbackQuantity td div").removeClass("piena-nograd");
         $(".feedbackQuantity td div").removeClass("lezione-nograd");
         $(".feedbackQuantity td div").addClass("votato-nograd");
         */

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

});

