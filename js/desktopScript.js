/**
 * Created by ivanmorandi on 05/12/14.
 */

const TIME_TRANSLATION = 400;
const TIME_SLIDE = 2000;

var maps = true;
var polo="A";
var mobile;
var piano="0";
var mappa="maps/APiano0.html";
var widthDetails=0;
var toogle = false;

$(document).ready(function(){

    mobile = jQuery.browser.mobile;

    //Se sono su un telefono, vengo redirezionato
    if(mobile)
    {
        window.location.replace("m.index.html");
    }

    //carico la mappa
    $(".containerMap").load(mappa, function () {
        populate();
    });




    //mi salvo la grandezza del div details
    widthDetails = $(".detailsRoom").width();

    $(".sel-mappe").click(function () {
        $(".containerMap").load(mappa);
    });

    $(".sel-list-rooms").click(function () {
        //$(".containerMap:first-child").remove();
        $(".containerMap").load("listprova.html");

    });

    //cambio piano
    $(".nav .nav-second-level li").click(function(){
        piano = $(this).data("piano");
        mappa = "maps/"+polo+"Piano"+piano+".html";
        $(".containerMap").load(mappa, function () {
            populate();
        });
        //da caricare i nuovi dati
    });

    //dettagli dell'aula selezionata
    $(".containerMap").on("click",".room",function(){
        //alert($(this).text());
        widthDetails = $(".detailsRoom").width();
        var larghezza = widthDetails;
        var tmp = "-="+larghezza;
        if(toogle==false) {
            //aggiorna valori

            details($(this).text());

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

        //mostra lavagna
       $(".lavagna").show(TIME_SLIDE);

        /* $(".lavagna").show(TIME_SLIDE, function () {
            //$(".lavagna").slide(2000);
        }); */

        /*$(".lavagna").slideDown(10000, function(){

        });*/


    });


    $(".containerMap").on("click",".list-rooms li", function () {
        widthDetails = $(".detailsRoom").width();
        var larghezza = widthDetails;
        var tmp = "-="+larghezza;
        if(toogle==false) {
            //aggiorna valori

            if(mobile)
            {
                tmp=0;
            }

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
    });

});



function populate(){
    for(var i=0;i<poloA.length;i++)
    {
        //alert('.room:contains('+poloA[i].nome+')');
        var elem = $('.room:contains('+poloA[i].nome+')');

        elem.removeClass("vuota");
        elem.removeClass("mezza");
        elem.removeClass("affollata");
        elem.removeClass("piena");
        elem.removeClass("lezione");

        switch (poloA[i].quantita){
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

    var elem =$(".titleBar");
    elem.removeClass("vuota-nograd");
    elem.removeClass("mezza-nograd");
    elem.removeClass("affollata-nograd");
    elem.removeClass("piena-nograd");
    elem.removeClass("lezione-nograd");
    switch (poloA[index].quantita){
        case 0: elem.addClass("vuota-nograd"); break;
        case 25: elem.addClass("mezza-nograd"); break;
        case 50: elem.addClass("affollata-nograd"); break;
        case 75: elem.addClass("piena-nograd"); break;
        case -100: elem.addClass("lezione-nograd"); break;
    }

    var occupatezzosita;
    switch (poloA[index].quantita){
        case 0: occupatezzosita="Libera"; break;
        case 25: occupatezzosita="Leggermente occupata"; break;
        case 50: occupatezzosita="Affollata"; break;
        case 75: occupatezzosita="Piena"; break;
        case -100: occupatezzosita="Lezione"; break;
    }

    var lavagna;
    if(poloA[index].lavagna == 1)
        lavagna = "Disponibile";
    else
        lavagna = "Non Disponibile";

    var rumore;
    if(poloA[index].rumore == 1)
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

function getIndexFromRoom(aula)
{
    for(var i = 0;i<poloA.length;i++) {
        if (poloA[i].nome == aula)
            return i;
    }

}