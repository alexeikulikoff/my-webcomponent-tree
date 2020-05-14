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
		 { p : "15", name : "Name15", q : 13 }
		 
		 ];

	 const vv = self.hasChild(15, data);
	
	 
	 const table = document.createElement('table');
	 table.setAttribute('border', '1');
	
	 self.displayTable(self, data, table, 0);
	  
  }
  hasChild(p, data){
	  return data.filter(s=> s.q === p ).length > 0;
  }
  get open() {
	  return this.getAttribute('open');
	}

  set open(isOpen) {
	
	   this.setAttribute('open', isOpen);
	
		
	}
  displayTable( parent, data, table, index ){
	  parent.appendChild(table);  
	  data.filter(s=>s.q === index).forEach(s => {
		  const newRow = table.insertRow();
		
		  for (var prop in s) {
			  const cell = newRow.insertCell();
			  cell.style.padding = '8px';
			  let text = document.createTextNode(s[prop]);
			  cell.appendChild(text);
		  }
		  newRow.cells[0].addEventListener('click', function(e){
			  if (newRow.hasAttribute('open')){
				  if(newRow && newRow.nextSibling) {
					  newRow.parentNode.removeChild(newRow.nextSibling);
				  }
			  }else{
				  const p = parseInt(e.target.innerText);
				  if (self.hasChild(p,data)){
					  const colSpan = Object.keys(s).length;
					  const row = document.createElement('tr');
					  const cell = document.createElement('td');
					  cell.setAttribute('colspan',colSpan);
					  row.appendChild(cell);
					  table.childNodes[0].insertBefore(row, newRow.nextSibling);
					  const detailTable = document.createElement('table');
					  self.displayTable( cell, data, detailTable, p ) ;
					
				  }   
			  }
			  newRow.toggleAttribute('open');
		  })  
	   });
   }
 }


customElements.define('my-table', MyTable, { extends: 'table'});
