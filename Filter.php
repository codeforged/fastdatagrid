<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Filter extends CI_Controller {

	public function dataFactory() {
		$searchtext = $this->input->post("searchtext");

		$sqlstr = "SELECT productCode, productName, quantityInStock, buyPrice FROM products ";
		$sqlstr.= " where productName like ?";
		
		$this->load->database();		
		$this->load->helper('fastdatagrid');
		
		sqlAdapter($this->db, $sqlstr, Array('%'.$searchtext.'%'));
	}
	
	public function index()
	{
		$this->load->view('filter');
	}
}
