/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

//var GoogleTasks = require('./GoogleTasks.js');

Module.register("MMM-gtasks",{

	// Default module config.
	defaults: {
      name: "MMM-gtasks",
		text: "Some tasks",
   
	},

   getScripts: function() {
      return ["GoogleTasks.js"];
   },


   getStyles: function() {
      return ["MMM-gtasks.css", "font-awesome.css"];
   },

   start: function() {
      Log.info("Starting module: " + this.name);
//      this.loaded = false;
//      this.listOfTasks = [{title: 'Loading...', status: 'needaAction'}];

//      var googleTasks = new GoogleTasks;
//      var SECRET_FOLDER = "./modules/MMM-gtasks/";
      
//      function storeGAuth(gauth) {
//         console.log("Obtained gauth:");
//         console.log(gauth);
//         this.gauth = gauth;
//         this.schedualUpdateInterval();
//      };
//
//      GoogleTasks.getGoogleAuth(SECRET_FOLDER, storeGAuth);
      
   },


   // Start the updater on socket request.
   socketNotificationReceived: function(notification, payload) {
      if ( notification === "GOOGLE_TASKS") {

//         if (!this.loaded) {
//            this.schedualUpdateInterval();
//         }

//         this.loaded=true;

         this.updateDom();
      }
   },


	// Override dom generator.
	getDom: function() {
      var wrapper = document.createElement("div");
      var table = document.createElement("table");
      table.className = "gtask small";
      for (var i=0; i < this.listOfTasks.length; i++) {
         taskItem = this.listOfTasks[i];
         var row = document.createElement("tr");
         table.appendChild(row)

         var task = document.createElement("td");
         task.className = "task";
         if (this.listOfTasks[i].status=='needsAction') {
            statusHTML = "&#9744 "
         } else {
            statusHTML = ""
         };
         taskTitleHTML = this.listOfTasks[i].title;
         task.innerHTML = statusHTML + taskTitleHTML;
         row.appendChild(task);
      }
      wrapper.appendChild(table);
      return wrapper;
   },


});
