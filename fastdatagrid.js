/*********
*  Fastdatagrid v0.01
*  a simple and adaptable ajax Datagrid
*
*  Author Andriansah, andriansah@yahoo.com (c)2016
* 
*  DISCLAIMER: 
*  You may use, modified or/and redistributed without any permission or any guaranteed  
*  please do not remove any attribution from the author.
*  
*/

var fastDatagrid = function (eid, tabcols, dataFactory, rowperpage = 5) {
	var id="fdg"+eid;
	var self = this;
	var selectedKey = "";

	if (tabcols.length>0) self.keyfieldname = tabcols[0].fieldname;
	self.id = eid;
	self.pageno = 0;
	self.tabcols = tabcols;
	self.rowperpage = rowperpage;
	self.totalrowcount = 0;
	self.hidesearchbox = 1;
	self.datarows = [];
	self.searchtext = "";

	self.dataFactory = dataFactory;
	self.reload();
};

fastDatagrid.prototype.goToPage = function (pageno) {
	var self = this;
	var maxpage = Math.floor(self.totalrowcount/self.rowperpage);
	if (pageno>=0 && pageno<=maxpage) {
		self.pageno = pageno;
		self.dataFactory(self);
	}
}
fastDatagrid.prototype.nextPage = function () {
	var self = this;
	var maxpage = Math.ceil(self.totalrowcount/self.rowperpage);
	if (self.pageno<maxpage-1) {
		self.pageno++;
		self.reload();
	}
}

fastDatagrid.prototype.priorPage = function () {
	var self = this;
	if (self.pageno>0) {
		self.pageno--;
		self.reload();
	}
}

fastDatagrid.prototype.firstPage = function () {
	var self = this;
	self.pageno = 0;
	self.reload();
}

fastDatagrid.prototype.lastPage = function () {
	var self = this;
	var maxpage = Math.ceil(self.totalrowcount/self.rowperpage);
	self.pageno = maxpage-1;
	self.reload();
}

fastDatagrid.prototype.refresh = function (response) {	
	var self = this;
	var eid = self.id;
	var html="";
	self.datarows = response.rows;
	html+='<tr><td colspan="'+self.tabcols.length+'"><div id="logged_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">';
  html+='<div class="row">';
  html+='  <div class="col-sm-6">';
  html+='    <div class="dataTables_length" id="logged_length">';
  html+='      <label>';
  html+='        Show <select id="'+self.id+'_rowperpage" name="logged_length" aria-controls="logged" class="form-control">';
  html+='          <option value="3">3</option>';
  html+='          <option value="5">5</option>';
  html+='          <option value="10">10</option>';
  html+='          <option value="25">25</option>';
  html+='          <option value="50">50</option>';
  html+='          <option value="75">75</option>';
  html+='        </select>';
  html+='        entries';
  html+='      </label>';
  html+='    </div>';
  html+='  </div>';
  html+='  <div class="col-sm-6">';
  html+='    <div class="pull-right"><label>Search <input type="search" value="'+self.searchtext+'" id="'+self.id+'_searchbox" class="form-control" placeholder="" aria-controls="logged"></label></div>';
  html+='  </div>';
  html+='</div></td></tr>';
  html+="<tr>";

	for (var i=0; i<self.tabcols.length; i++) {
		if (self.tabcols[i].width) width = "width: "+self.tabcols[i].width; else width="";
		html+='<th style="'+width+'">'+self.tabcols[i].title+'</th>';
	}
	html+="</tr>";

  $('#'+eid).children('thead').html(html);
  if (self.hidesearchbox) self.hideSearchBox();

  html="";
  var tabkeyvalue="";
  self.totalrowcount = response.totalrowcount;
	for (var i=0; i<response.rows.length; i++) {
		for (var key in response.rows[i]) {
  		if (key == self.keyfieldname) {
  			tabkeyvalue = response.rows[i][key];
  			break;
  		}
  	}

  	var td = "";
  	html+='<tr rowkey="'+tabkeyvalue+'" class="fastdatagridrow" style="cursor: pointer;">';
	  for (var j=0; j<self.tabcols.length; j++) {
	  	for (var key in response.rows[i]) {	
	  		if (key == self.tabcols[j].fieldname) {
	  			if (self.customDraw) {
	  				td += '<td>'+self.customDraw({value: response.rows[i][key], fieldname: key, row: i, col: j})+'</td>';
	  			} else td+='<td>'+response.rows[i][key]+'</td>';
	  		}
	  	}
	  }
	  html+=td;
	  html+='</tr>';
	}

  $('#'+eid).children('tbody').html(html);

  if (response.rows.length==0) {
	  html = '<tr class="odd"><td valign="top" colspan="6" class="dataTables_empty">No data available in table</td></tr>';
		$('#'+eid).children('tbody').append(html);
	}

  html = '<tr><td colspan="'+self.tabcols.length+'">';
  html += '<div class="row">';
  html += '<div class="col-sm-6">';
  html += '<div id="'+self.id+'_pageinfo" class="dataTables_info" ></div>';
  html += '</div>';
  html += '<div class="col-sm-6">';
  html += '<ul style="margin: 5px; padding-top: 5px;" class="pagination pull-right">';
	html += '  <li><a id="'+self.id+'_first" href="javascript:void(0)">|&lt;</a></li>';
	html += '  <li><a id="'+self.id+'_prior" href="javascript:void(0)">&lt;</a></li>';				
	//html += '  <li><a id="'+self.id+'_gtop" href="javascript:void(0)">...</a></li>';
	html += '  <li style="padding:0; margin:0"><a style="padding-left: 0; padding-right: 0; padding-top:5px;padding-bottom:5px; margin:0" ';
	html += '    href="javascript:void(0)"><input id="'+self.id+'_gtop" value="'+(self.pageno+1)+'" ';
	html += '    style="border: 0;text-align: center;height: 100%; width: 40px; type="text"></a></li>';
	html += '  <li><a id="'+self.id+'_next" href="javascript:void(0)">&gt;</a></li>';
	html += '  <li><a id="'+self.id+'_last" href="javascript:void(0)">&gt;|</a></li>';				
	html += '</ul></td></tr>';	
	html += '</div>';
	html += '</div>';
	//$('#'+eid).children('tfoot').css("height", "30px");	  
  //$('#'+eid).parent().append('<div id="logged_processing" class="dataTables_processing panel panel-default" style="display: none;">Processing...</div></div></div><div class="row"><div class="col-sm-5"><div class="dataTables_info" id="logged_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div></div><div class="col-sm-7"><div class="dataTables_paginate paging_simple_numbers" id="logged_paginate"><ul class="pagination"><li class="paginate_button previous disabled" id="logged_previous"><a href="#" aria-controls="logged" data-dt-idx="0" tabindex="0">Previous</a></li><li class="paginate_button next disabled" id="logged_next"><a href="#" aria-controls="logged" data-dt-idx="1" tabindex="0">Next</a></li></ul></div></div></div></div>');

	$('#'+eid).children('tbody').append(html);			   
	$("#"+self.id+"_rowperpage").val(self.rowperpage);
	$("#"+self.id+"_pageinfo").html("Showing "+(self.pageno*self.rowperpage+(response.rows.length>0?1:0))+" to "+(self.pageno*self.rowperpage+response.rows.length)+" of "+(self.totalrowcount)+" entries");
	
	$("#"+self.id+"_searchbox").keypress(function (e) {
	  if (e.which == 13) {
	    var value = $(this).val();
	    self.searchtext = value;
	    self.pageno = 0;
	    self.reload();
	  }
	});

	$("#"+self.id+"_gtop").keypress(function (e) {
	  if (e.which == 13) {	    
	  	var pageno = $(this).val()-1;
	    self.pageno = pageno;
	    self.reload();
	  }
	});

	$("#"+self.id+"_rowperpage").change(function (x) {
		var rowperpage = $(this).val();
		self.pageno = 0;
		self.rowperpage = rowperpage;
		self.reload();
	});

	$("#"+self.id+"_prior").click(function (x) {
		self.priorPage();
	});
	$("#"+self.id+"_next").click(function (x) {
		self.nextPage();
	});
	$("#"+self.id+"_first").click(function (x) {
		self.firstPage();
	});
	$("#"+self.id+"_last").click(function (x) {
		self.lastPage();
	});

  $(".fastdatagridrow").click(function (x) {
  	//console.log($(this).attr("rowkey"));
  	self.selectedKey = $(this).attr("rowkey");
  	$(".fastdatagridrow").css("color", "black");
  	$(this).css("color", "#337ab7");  	
  	if (self.rowClick) {
  		var indexfound=0;
  		for (var i=0; i<self.datarows.length; i++) {  			
	  		for (key in self.datarows[i]) {
	  			if (key == self.keyfieldname) {
	  				var keyvalue = self.datarows[i][key];
	  				if (self.selectedKey == keyvalue) {
	  					indexfound = i;
	  				}
	  				break;
	  			}
	  		}

	  	}
  		self.rowClick(self.datarows[indexfound]);
  	}
  });
}

fastDatagrid.prototype.reload = function() {
	var self = this;
	if (!self.ajaxData) self.ajaxData = {};
	self.ajaxData.searchtext = (self.searchtext?self.searchtext:"");
	self.ajaxData.rowperpage = self.rowperpage;
	self.ajaxData.pageno = self.pageno;
	self.dataFactory(self);
}

fastDatagrid.prototype.hideSearchBox = function() {
	var self = this;
	self.hidesearchbox = 1;
	$("#"+self.id+"_searchbox").parent().hide();
}

fastDatagrid.prototype.showSearchBox = function() {
	var self = this;
	self.hidesearchbox = 0;
	$("#"+self.id+"_searchbox").parent().show();
}

Number.prototype.format = function(n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
