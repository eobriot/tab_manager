var div_tab; 
self.on('click', function() {
   self.postMessage('clicked');
});

self.port.on('loadPanel', function(tab_list) {

   //console.log('Load Panel');
   //console.log(tab_list);
   div_tab = document.getElementById('tablist'); 
   console.log(div_tab.innerHTML);
//   div_tab.innerHTML = "";
  while (div_tab.firstChild) {
       div_tab.removeChild(div_tab.firstChild);
  }
   list_element = document.createElement("ul");
   for each (tab in tab_list) {
      item = document.createElement("li");
      text_node = document.createTextNode(tab.title);
      item.setAttribute('data-index', tab.index);
      item.addEventListener('click', tab_clicked.bind(item));
      item.appendChild(text_node);
      list_element.appendChild(item);
   }
   div_tab.appendChild(list_element);
});

function tab_clicked(event) {
   self.port.emit('tab_clicked', this.dataset.index);
}
