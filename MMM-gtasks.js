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
      updateFrequency: 300, //Time in seconds
      textBrightness: 1, //Content brightness
      taskNumber: 10, //Number of tasks to display
      taskMaxLength: 100, // Maximum number of charicters of the task to display
      taskList: "Default List", // The name of the google tasks list to display
      debug: true, // Add debugging messages.


   
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

      var payload = {message: "Start updater", config: this.config}
      

      this.sendSocketNotification("GOOGLE_TASKS", payload);
   },


   // Overide default socket recived notifiaciton.
   socketNotificationReceived: function(notification, payload) {
      if ( notification === "GOOGLE_TASKS") {
         console.log("Recived socekt notification with payload:");
         console.log(payload);

         this.listOfTasks = payload;

//         if (!this.loaded) {
//            this.schedualUpdateInterval();
//         }

//         this.loaded=true;

         this.updateDom(1000);
      }
   },


	// Override dom generator.
	getDom: function() {
      console.log("Updating DOM");
      if (this.listOfTasks == undefined) {
         console.log("Recived undefined listOfTasks");
         this.listOfTasks = [{title: 'Loading', status: 'needsAction'}];
      };
      console.log(this.listOfTasks);
      var wrapper = document.createElement("div");
      var table = document.createElement("table");
      table.className = "gtask small";
      for (var i=0; i < this.listOfTasks.length; i++) {
         taskItem = this.listOfTasks[i];
         var row = document.createElement("tr");
         table.appendChild(row)

         var task = document.createElement("td");
         task.className = "task";
         if (taskItem.status=='needsAction') {
            statusHTML = "&#9744 "
         } else {
            statusHTML = "&#9745 "
         };
         taskTitleHTML = taskItem.title;
         task.innerHTML = statusHTML + taskTitleHTML;
         row.appendChild(task);
      }
      wrapper.appendChild(table);
      return wrapper;
   },


});
