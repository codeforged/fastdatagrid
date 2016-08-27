<link rel="stylesheet" type="text/css" href="../assets/bootstrap/css/bootstrap.min.css"/>
<script type="text/javascript" src="../assets/js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="../assets/js/fastdatagrid.js"></script>



<table id="datagrid" class="table table-striped table-bordered" cellspacing="0">
  <thead></thead><tbody></tbody><tfoot></tfoot>
</table>

<script type="text/javascript">
	$(this).ready(function () {    
		function getData(sender) {   
      // custom ajax data parameter
      sender.ajaxData.anotherParam =  "Hello world";   
      $.ajax({
        url      : 'complete/dataFactory',
        data     :  sender.ajaxData,
        type     : 'POST',
        dataType : "json",
        success  : function(response) {
        	sender.refresh(response);          
        }
      });
    }
    
    var fields = [
      {"fieldname": "customerNumber", "title": "Cust. Number", "width": "130px"},
      {"fieldname": "customerName", "title": "Name", "width": "200px"},
      {"fieldname": "phone", "title": "Phone", "width": "100px"},
      {"fieldname": "addressLine1", "title": "Address", "width": "300px"},
      {"fieldname": "city", "title": "City", "width": "100px"},
      {"fieldname": "country", "title": "Country", "width": "100px"},
      {"fieldname": "creditLimit", "title": "Credit Limit", "width": "120px"}];

    fdg = new fastDatagrid("datagrid", fields, getData);    
    fdg.showSearchBox();  
    
    fdg.customDraw = function (cell) { //cell has: value, fieldname, col & row
      if (cell.fieldname == 'customerName') 
        return '<a href="javascript:void(0)"><strong>'+cell.value+'</strong></a>'; else
      if (cell.col>3) 
        return '<span style="color: red; text-align: right;">'+cell.value+'</span>'; else
        return cell.value;
    }

    fdg.rowClick = function (selectedrow) {
      console.log(JSON.stringify(selectedrow));
    }
	});

</script>