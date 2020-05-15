
var main = main || {};

var table1 = null;
var table2 = null;
var table3 = null;

var randomString = function(){
	return uuidv4().substr(0, 8).toUpperCase();
}

main.init = function(){
	table1 = $('#table1').DataTable({
		ajax : {
			url : "/getAll?name=Entity1",
			type : "GET",
			dataSrc : "content",
			error : function(e) {
				console.log(e);
			}
		},
		columns : [ 
			{ title : "#" , data : "id" }, 
			{ "title" : "First Name", data : "firstName" },
			{ "title" : "Last Name", data : "lastName" },
			{ title : "Action", data : "id", render : function( data  ){
				 return '<button id="button3" type="button" class="btn btn-danger btn-xs" onclick="main.delete1(\'' + data + '\')">Delete</button>'
			}}
			
		],
		searching : false,
		 info :     false,
		 paging :  false
	});
	table2 = $('#table2').DataTable({
		ajax : {
			url : "/getAll?name=Entity2",
			type : "GET",
			dataSrc : "content",
			error : function(e) {
				console.log(e);
			}
		},
		columns : [ 
			{ title : "#" , data : "id" }, 
			{ title : "First Name", data : "firstName" },
			{ title : "Last Name", data : "lastName" },
			{ title : "Birthday", data : "birthday" }, 
			{ title : "Action", data : "id", render : function( data  ){
				 return '<button id="button3" type="button" class="btn btn-danger btn-xs" onclick="main.delete2(\'' + data + '\')">Delete</button>'
			}}
			 

		],
		searching : false,
		 info :     false,
		 paging :  false
	});
	table3 = $('#table3').DataTable({
		ajax : {
			url : "/getAll?name=Entity3",
			type : "GET",
			dataSrc : "content",
			error : function(e) {
				console.log(e);
			}
		},
		columns : [
			{ title : "#" , data : "id" }, 
			{ title : "First Name", data : "firstName" },
			{ title : "Last Name", data : "lastName"  },
			{ title : "Birthday", data : "birthday" }, 
			{ title : "Salary", data : "salary" } ,
			{ title : "Action", data : "id", render : function( data  ){
				 return '<button id="button3" type="button" class="btn btn-danger btn-xs" onclick="main.delete3(\'' + data + '\')">Delete</button>'
			}}
		],
		searching : false,
		 info :     false,
		 paging :  false
	});
}
main.delete1 = function(id){
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
main.delete2 = function(id){
	var headers = {};
	var $data = {
			name : "Entity2",
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
			  table2.ajax.reload();
			  console.log(e);
			
		  },
		  error : function(e) {
			  console.log(e);
		}
	});
	
}
main.delete3 = function(id){
	var headers = {};
	var $data = {
			name : "Entity3",
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
			  table3.ajax.reload();
			  console.log(e);
			
		  },
		  error : function(e) {
			  console.log(e);
		}
	});
	
}
main.save_record_table1 = function(){
	
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
main.save_record_table2 = function(){
	
	var headers = {};
	var $data = {
			name : "Entity2",
			content : {
				firstName : randomString(),
				lastName :  randomString(),
				birthday :  {
			        "year": 1997,
			        "month": 11,
			        "day": 25
					}
					
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
			  table2.ajax.reload();
			  console.log(e);
			
		  },
		  error : function(e) {
			  console.log(e);
		}
	});
	
}
main.save_record_table3 = function(){
	
	var headers = {};
	var $data = {
			name : "Entity3",
			content : {
				firstName : randomString(),
				lastName :  randomString(),
				birthday :  {
			        "year": 1997,
			        "month": 11,
			        "day": 25
				},
				salary : "23456"
					
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
			  table3.ajax.reload();
			  console.log(e);
			
		  },
		  error : function(e) {
			  console.log(e);
		}
	});
	
}
$(document).ready(function() {

	main.init();

	$("#button1").click(function() {
	
		main.save_record_table1();
	});
	$("#button2").click(function() {
		
		main.save_record_table2();
	});
	$("#button3").click(function() {
		
		main.save_record_table3();
	});

});