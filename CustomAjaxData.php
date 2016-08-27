<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CustomAjaxData extends CI_Controller {

	public function dataFactory() {
		$productscale = $this->input->post("productscale");

		$sqlstr = "SELECT productCode, productName, productScale, quantityInStock, buyPrice FROM products";
		$sqlstr.= " WHERE productScale = ?";
		
		$this->load->database();		
		$this->load->helper('fastdatagrid');
		
		sqlAdapter($this->db, $sqlstr, Array($productscale), Array("datetime"=>date("Y-m-d H:i:s")));
	}
	
	public function index()
	{
		$this->load->view('customajaxdata');
	}
}
