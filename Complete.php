<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Complete extends CI_Controller {

	public function dataFactory() {
		$searchtext = $this->input->post("searchtext");

		$sqlstr = "SELECT customerNumber, customerName, phone, addressLine1, city, country, creditLimit FROM customers ".
			"WHERE customerName LIKE ? or addressLine1 LIKE ?";
		$params = Array("%".$searchtext."%", "%".$searchtext."%");

		$this->load->database();		
		$this->load->helper('fastdatagrid');
		
		$data = [];
		$data["hello"] = "World";

		sqlAdapter($this->db, $sqlstr, $params, $data);
	}
	
	public function index()
	{
		$this->load->view('complete');
	}
}
