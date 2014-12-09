const TIME_TRANSLATION = 400;
const TIME_SLIDE = 2000;

var polo = "A";
var mobile;
var piano = "0";
var mappa = "maps/APiano0.html";
var widthDetails = 0;
var toogle = false;

$(document).ready(function () {
    mobile = jQuery.browser.mobile;

    //Se sono su un telefono, vengo redirezionato
    if (!mobile) {
        window.location.replace("index.html");
    }

    //carico la mappa
    $(".mMap").load(mappa);

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


    //apparizione feedback lavagna
    $(".feedbackQuantity .voto").on("click", function () {

        $(".lavagna").slideDown("slow");
    });

});