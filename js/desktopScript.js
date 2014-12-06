/**
 * Created by ivanmorandi on 05/12/14.
 */

const TIME_TRANSLATION = 400;
const TIME_SLIDE = 2000;

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
    $(".containerMap").load(mappa);




    //mi salvo la grandezza del div details
    widthDetails = $(".detailsRoom").width();

    //cambio piano
    $(".nav .nav-second-level li").click(function(){
        piano = $(this).data("piano");
        mappa = "maps/"+polo+"Piano"+piano+".html";
        $(".containerMap").load(mappa);
    });

    //dettagli dell'aula selezionata
    $(".containerMap").on("click",".room",function(){
        //alert($(this).text());
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
    }).on("click","td:not(.room)",function(){ //uscita dai dettagli
        var larghezza = widthDetails;
        var tmp = "+="+larghezza;
        if(toogle==true) {
            //aggiorna valori
            if(mobile)
                tmp="100%";

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
            if(mobile)
                tmp="100%";

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

});



function populate(){

}