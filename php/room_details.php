<?php
class room_details
{
	public $ID = "";
	public $Name = "";
    public $Piano = "";
    public $Polo = "";
    public $Lavagna = 0;
    public $Rumore = 0;
    public $Quantita = 0;
    //private $Feedback = [];

    public function init ($id, $name, $piano, $polo) {
		$this->ID = $id;
        $this->Name = $name;
        $this->Piano = $piano;
        $this->Polo = $polo;
    }

	public function getID() {return $this->ID; }
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