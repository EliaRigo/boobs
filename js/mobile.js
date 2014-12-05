/**
 * Created by ivanmorandi on 04/12/14.
 */
$(document).ready(function() {

    var leftMovement = $("mContainer").width();
    var showing=0; //0=map 1=list
    var timeSwipe=200;

    $(".mContainter").on("swiperight", function () {
        if (showing == 1) {
            $(".mMap").animate({"left": "+=" + leftMovement},timeSwipe,'linear');
            $(".mListRoom").animate({"left": "+=" + leftMovement},timeSwipe,'linear');
            showing=0;
        }
    });
    $(".mContainter").on("swipeleft", function () {
        if (showing == 0) {
            $(".mMap").animate({"left": "-=" + leftMovement},timeSwipe,'linear');
            $(".mListRoom").animate({"left": "-=" + leftMovement},timeSwipe,'linear');
            showing=1;
        }
    });

});