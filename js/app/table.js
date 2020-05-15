
var table = table || {};

var table1 = null;


var randomString = function(){
	return uuidv4().substr(0, 8).toUpperCase();
}

table.init = function(){
	table1 = $('#tableGroups').DataTable({
		ajax : {
			url : "/getGroups?q=0",
			type : "GET",
			dataSrc : "[]",
			error : function(e) {
				console.log(e);
			}
		},
		columns : [ 
			{ "class" : "details-control",
				"orderable":      false,
	              "data":           null,
	              "defaultContent": ""
			},
			{ "title" : "Name", data : "name" },
			{ "title" : "Code", data : "code" },
			{ "title" : "Q", data : "q" },
			
		],
		searching : false,
		 info :     false,
		 paging :  false
	});
	
}
table.delete1 = function(id){
	var headers = {};
	var $data = {
			name : "Entity1",
			id : id 
	}
	
	$.ajax({
		  type: "POST",
		  url:  "delete",
		  data: JSON.stringify($data),
		  contentType : 'application/json',
		  dataType: "json",
		  headers : headers ,    	
		  success: function(e){
			  table1.ajax.reload();
			  console.log(e);
			
		  },
		  error : function(e) {
			  console.log(e);
		}
	});
	
}
table.save_record_table1 = function(){
	
	var headers = {};
	var $data = {
			name : "Entity1",
			content : {
				firstName : randomString(),
				lastName : randomString()
			}
	}
	
	$.ajax({
		  type: "POST",
		  url:  "save",
		  data: JSON.stringify($data),
		  contentType : 'application/json',
		  dataType: "json",
		  headers : headers ,    	
		  success: function(e){
			  table1.ajax.reload();
			  console.log(e);
			
		  },
		  error : function(e) {
			  console.log(e);
		}
	});
	
}
$(document).ready(function() {

	table.init();

	$("#button1").click(function() {
	
		table.save_record_table1();
	});

});