<?php
class room_details
{
	private $Name = "";
    private $Piano = "";
    private $Polo = "";
    private $Lavagna = 0;
    private $Rumore = 0;
    private $Quantita = 0;
    //private $Feedback = [];

    public function init ($name, $piano, $polo) {
        $this->Name = $name;
        $this->Piano = $piano;
        $this->Polo = $polo;
    }

    public function getName(){ return $this->Name; }
    public function getPiano() { return $this->Piano; }
    public function getPolo() { return $this->Polo; }

    public function getLavagna(){ return $this->Lavagna; }
    public function getRumore() { return $this->Rumore; }
    public function getQuantita() { return $this->Quantita; }
    public function getFeedback(){ return $this->Feedback;}

    public function setLavagna($lavagna){ $this->Lavagna = $lavagna; }
    public function setRumore($rumore) { $this->Rumore = $rumore; }
    public function setQuantita($quantita) { $this->Quantita = $quantita; }
}
?>