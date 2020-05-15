// Create a class for the element
class MyTable extends HTMLTableElement {
  constructor() {
	 self =  super();
	 console.log(self);
	 const data = [
		 { p : "1", name : "Name1", q : 0 },
		 { p : "2", name : "Name2", q : 0 },
		 { p : "3", name : "Name3", q : 0 },
		 { p : "4", name : "Name4", q : 0 },
		 { p : "5", name : "Name5", q : 1 },
		 { p : "6", name : "Name6", q : 1 },
		 { p : "7", name : "Name7", q : 1 },
		 { p : "8", name : "Name8", q : 2 },
		 { p : "9", name : "Name9", q : 2 },
		 { p : "10", name : "Name10", q : 3 },
		 { p : "11", name : "Name11", q : 3 },
		 { p : "12", name : "Name12", q : 4 },
		 { p : "13", name : "Name13", q : 4 },
		 { p : "14", name : "Name14", q : 13 },
		 { p : "15", name : "Name15", q : 13 },
		 { p : "16", name : "Name13", q : 5 },
		 { p : "17", name : "Name14", q : 5 },
		 { p : "18", name : "Name15", q : 5 },
		 { p : "19", name : "Name13", q : 3 },
		 { p : "20", name : "Name14", q : 3 },
		 { p : "21", name : "Name15", q : 3 }
		 
		 ];

	 
	 const table = document.createElement('table');
	 table.classList.add("table");
	
	 self.displayTable(self, data, table, 0);
	  
  }
  hasChild(p, data){
	  return data.filter(s=> s.q === p ).length > 0;
  }
 
  displayTable( parent, data, table, index ){
	  parent.appendChild(table); 
	  
	  data.filter(s=>s.q === index).forEach(s => {
		  const newRow = table.insertRow();
		  for (var prop in s) {
			  const cell = newRow.insertCell();
			  if (prop === 'name'){
				  let text = document.createTextNode(s[prop]);
				  cell.appendChild(text);
			  }
		  }
		 newRow.cells[0].setAttribute('id',s.p);
		 const p = parseInt(s.p);
		 if (self.hasChild(p,data)){
			  newRow.cells[0].classList.add("details-control");  
		 }
		 newRow.cells[0].addEventListener('click', function(e){
			  if (newRow.hasAttribute('open')){
				  newRow.classList.remove("details");
				  if(newRow && newRow.nextSibling) {
					  newRow.parentNode.removeChild(newRow.nextSibling);
					  newRow.toggleAttribute('open');
				  }
			  }else{
				  const p = parseInt(e.target.id);
				  if (self.hasChild(p,data)){
					  newRow.classList.add("details");
					  newRow.cells[0].classList.add("details-control"); 
					  
					  const colSpan = Object.keys(s).length;
					  const row = document.createElement('tr');
					  const cell = document.createElement('td');
					  cell.setAttribute('colspan',colSpan);
					  row.appendChild(cell);
					  table.childNodes[0].insertBefore(row, newRow.nextSibling);
					  const detailTable = document.createElement('table');
					  detailTable.classList.add("table");
					  newRow.toggleAttribute('open');
					  self.displayTable( cell, data, detailTable, p ) ;
					
				  }   
			  }
			
		  })  
	   });
   }
 }


customElements.define('my-table', MyTable, { extends: 'table'});
