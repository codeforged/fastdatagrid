<link rel="stylesheet" type="text/css" href="../assets/bootstrap/css/bootstrap.min.css"/>
<script type="text/javascript" src="../assets/js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="../assets/js/fastdatagrid.js"></script>



<table id="datagrid" class="table table-striped table-bordered" cellspacing="0">
  <thead></thead><tbody></tbody><tfoot></tfoot>
</table>

<script type="text/javascript">
	$(this).ready(function () {    
		function getData(sender) {   
      sender.ajaxData.productscale = "1:10";
      $.ajax({
        url      : 'CustomAjaxData/dataFactory',
        data     :  sender.ajaxData,
        type     : 'POST',
        dataType : "json",
        success  : function(response) {
          console.log("Arrived datetime: "+response.customdata.datetime);
        	sender.refresh(response);          
        }
      });
    }

    var fields = [
      {"fieldname": "productCode", "title": "Code"},
      {"fieldname": "productName", "title": "Name"},
      {"fieldname": "productScale", "title": "Product Scale"},
      {"fieldname": "quantityInStock", "title": "Stock"},
      {"fieldname": "buyPrice", "title": "Buy Price"}
    ];

    fdg = new fastDatagrid("datagrid", fields, getData);    
	});

</script>