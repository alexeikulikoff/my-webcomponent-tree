// Create a class for the element
customElements.define('edit-form',
  class extends HTMLElement {
    constructor() {
      super();
      
      
    }
  }
);
    
customElements.define('delete-button',
  class extends HTMLElement {
    constructor() {
      super();

      const button = document.createElement('button');
      button.setAttribute('type','button');
      button.classList.add('btn');
      button.classList.add('btn-xs');
      button.classList.add('btn-danger');
      button.textContent = 'Удалить';
      
      
      button.addEventListener('click', e => {
    	  let isDel = confirm("Дорогой друг, если это группа, то она удалится со всем содержимым. Удалять?");
    	  console.log(isDel);
          e.preventDefault();
        });
      
      this.appendChild(button);
      
    }
    get value() {
  	  return this.getAttribute('value');
  	}

  	set value(newValue) {
  	  this.setAttribute('value', newValue);
  	}
  }

);

customElements.define('edit-word',
  class extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({mode: 'open'});
      const form = document.createElement('form');
      const input = document.createElement('input');
      const span = document.createElement('span');

      const style = document.createElement('style');
      style.textContent = 'span { background-color: #eef; padding: 0 2px }';

      shadowRoot.appendChild(style);
      shadowRoot.appendChild(form);
      shadowRoot.appendChild(span);

      span.textContent = this.textContent;
      input.value = this.textContent;

      form.appendChild(input);
      form.style.display = 'none';
      span.style.display = 'inline-block';
      input.style.width = span.clientWidth + 'px';

      this.setAttribute('tabindex', '0');
      input.setAttribute('required', 'required');
      this.style.display = 'inline-block';

      this.addEventListener('click', () => {
        span.style.display = 'none';
        form.style.display = 'inline-block';
        input.focus();
        input.setSelectionRange(0, input.value.length)
      });

      form.addEventListener('submit', e => {
        updateDisplay();
        e.preventDefault();
      });

      input.addEventListener('blur', updateDisplay);

      function updateDisplay() {
        span.style.display = 'inline-block';
        form.style.display = 'none';
        span.textContent = input.value;
        input.style.width = span.clientWidth + 'px';
      }
    }
  }
);



class MyTable extends HTMLTableElement {
  constructor() {
	 self =  super();

	 const data = [
		 { p : "1", name : "Name1", q : 0 , so: 1},
		 { p : "2", name : "Name2", q : 0 , so: 2},
		 { p : "3", name : "Name3", q : 0 , so: 3},
		 { p : "4", name : "Name4", q : 0 , so: 4},
		 { p : "5", name : "Name5", q : 1 , so: 1},
		 { p : "6", name : "Name6", q : 1 , so: 2},
		 { p : "7", name : "Name7", q : 1 , so: 3},
		 { p : "8", name : "Name8", q : 2 , so: 1},
		 { p : "9", name : "Name9", q : 2 , so: 2},
		 { p : "10", name : "Name10", q : 3 , so: 1},
		 { p : "11", name : "Name11", q : 3 , so: 2},
		 { p : "12", name : "Name12", q : 4 , so: 3},
		 { p : "13", name : "Name13", q : 4 , so: 4},
		 { p : "14", name : "Name14", q : 13 , so: 1},
		 { p : "15", name : "Name15", q : 13 , so: 2},
		 { p : "16", name : "Name13", q : 5 , so: 1},
		 { p : "17", name : "Name14", q : 5 , so: 2},
		 { p : "18", name : "Name15", q : 5 , so: 3},
		 { p : "19", name : "Name13", q : 3 , so: 3},
		 { p : "20", name : "Name14", q : 3 , so: 4},
		 { p : "21", name : "Name15", q : 3 , so: 5}
		 
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
		  const cell_p = newRow.insertCell();
		  const cell_name = newRow.insertCell();
		  const cell_q = newRow.insertCell();
		  const cell_so = newRow.insertCell();
		  const cell_del =  newRow.insertCell();
			  
		  cell_name.innerHTML = '<edit-word>' + s.name + '</edit-word>';
		  cell_so.innerHTML = '<edit-word>' + s.so + '</edit-word>';
		  cell_del.innerHTML = '<delete-button value="' + s.p + '"</delete-button>'; 
		  
		 cell_p.setAttribute('id',s.p);
		 const p = parseInt(s.p);
		 if (self.hasChild(p,data)){
			 cell_p.classList.add("details-control");  
		 }
		 cell_p.addEventListener('click', function(e){
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
					  cell_p.classList.add("details-control"); 
					  
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
