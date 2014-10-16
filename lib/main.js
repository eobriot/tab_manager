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
      if ( tab.index != tabs.activeTab.index) {
         tab_list.push({ "title" : tab.title, "index" :tab.index});
      }
   }

   panel.port.emit("loadPanel", tab_list);
   panel.port.once('tab_clicked', function(tab_clicked) {
      panel.hide();
      tab_clicked = parseInt(tab_clicked, 10);
      console.log('length : ' + tabs.length + ' - clicked on ' + tab_clicked + ' - was ' + tabs.activeTab.index + ' - will move to ' + (tab_clicked + 1));
      if (tabs.length > 1) {

         tabs.activeTab.index = tab_clicked + 1;
      }
   });
}

var menuItem = contextMenu.Item({
   label: _('menu_label'),
   contentScriptFile: data.url('logic.js'), 
    onMessage: function (message) {
       show_query_panel();
    }
});
