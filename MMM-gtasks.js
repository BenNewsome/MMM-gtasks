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
      updateFrequency: 300, //Time in seconds
      brightness: 13, //Content brightness [1-15]
      tasksNumber: 10, //Number of tasks to display
      taskMaxLength: 50, // Maximum number of charicters of the task to display
      taskList: "@default", // The name of the google tasks list to display
      debug: false, // Add debugging messages.
	},

   getScripts: function() {
      return ["GoogleTasks.js"];
   },


   getStyles: function() {
      return ["MMM-gtasks.css", "font-awesome.css"];
   },

   start: function() {
      Log.info("Starting module: " + this.name);

      var payload = {message: "Start updater", config: this.config}

      this.sendSocketNotification("GOOGLE_TASKS", payload);
      if (this.config.debug) {console.log("Sending message to helper")}
   },

   // Overide default socket recived notifiaciton.
   socketNotificationReceived: function(notification, payload) {
      if ( notification === "GOOGLE_TASKS") {
         if (this.config.debug) {
            console.log("Recived socekt notification with payload:");
            console.log(payload);
         };
         this.listOfTasks = payload;
         this.updateDom(1000);
      }
   },

	// Override dom generator.
	getDom: function() {
      // Make a loading task if no tasks exist.
      if (this.listOfTasks == undefined) {
         console.log("Recived undefined listOfTasks");
           this.listOfTasks = ["&#9744 Loading"]
      };

      // debugging
      if (this.config.debug) {
         console.log("Updating DOM");
         console.log(this.listOfTasks);
         };
      var wrapper = document.createElement("div");
      var table = document.createElement("table");
      table.className = "gtask small";

      // Set the brightness      
      var brightness = this.config.brightness;
      if (brightness < 1) {brightness = 1}
      if (brightness > 15) {brightness = 15}
      var taskBrightness = "#".concat( Array(4).join(brightness.toString(16)) );

      for (var i=0; i < this.listOfTasks.length; i++) {
         taskItem = this.listOfTasks[i];
         var row = document.createElement("tr");
         table.appendChild(row)

         var task = document.createElement("td");
         task.style = "task";
         task.style.color = taskBrightness;
         task.innerHTML = taskItem;
         row.appendChild(task);
      }
      wrapper.appendChild(table);
      return wrapper;
   },
});
