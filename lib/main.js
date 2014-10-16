var contextMenu = require("sdk/context-menu");
var tabs = require("sdk/tabs");
var data = require('sdk/self').data;
var _ = require("sdk/l10n").get;

var panel = require('sdk/panel').Panel({
   contentURL: data.url('show_tab.html'),
    contentScriptFile: data.url('logic.js')
});

function show_query_panel() {
   var tab_list = [];
   panel.show();

   for each (tab in tabs) {
      tab_list.push({ "title" : tab.title, "index" :tab.index});
//      console.log(tab_list);
   }

   panel.port.emit("loadPanel", tab_list);
   panel.port.once('tab_clicked', function(tab_clicked) {
  //    console.log('Main script - tab clicked ' + tab_clicked);
      panel.hide();
      if (tabs.length > 1) {
         tabs.activeTab.index = tab_clicked + 1;
      }
   });
}

var menuItem = contextMenu.Item({
   label: _('menu_label'),
   //label : 'yo mama', 
   contentScriptFile: data.url('logic.js'), 
    onMessage: function (message) {
       /*for each (var tab in tabs) {
         console.log(tab.title);
         }*/
       show_query_panel();
    }
});
