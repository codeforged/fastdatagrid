<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Simple extends CI_Controller {

	public function dataFactory() {
		$sqlstr = "SELECT productCode, productName, quantityInStock, buyPrice FROM products";
		
		$this->load->database();		
		$this->load->helper('fastdatagrid');
		
		sqlAdapter($this->db, $sqlstr);
	}
	
	public function index()
	{
		$this->load->view('simple');
	}
}
