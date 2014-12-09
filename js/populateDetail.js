/**
 * Created by ivanmorandi on 04/12/14.
 */
var info = {
    Rooms:[]

};

var room = function (){

    var Name = "";
    var Piano = "";
    var Polo = "";
    var Lavagna = false;
    var Rumore = false;
    var Quantita = 0;
    var Feedback = [];

    function init (name, piano, polo) {
        this.Name = name;
        this.Piano = piano;
        this.Polo = polo;
    }

    function getName(){ return Name; }
    function getPiano() { return Piano; }
    function getPolo() { return Polo; }

    function getLavagna(){ return Lavagna; }
    function getRumore() { return Rumore; }
    function getQuantita() { return Quantita; }
    function getFeedback(){ return Feedback;}

    function setLavagna(lavagna){ Lavagna = lavagna; }
    function setRumore(rumore) { Rumore = rumore; }
    function setQuantita(quantita) { Quantita = quantita; }

    function





};