/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

Module.register("MMM-gtasks",{

	// Default module config.
	defaults: {
      name: "MMM-gtasks",
		text: "Some tasks",
   
	},

   getStyles: function() {
      return ["MMM-gtasks.css", "font-awesome.css"];
   },

   start: function() {
      Log.info("Starting module: " + this.name);
//      this.sendSocketNotification("update-MMM-gtasks", "Initial_update");

      this.loaded = false;
      this.listOfTasks = [{title: 'Loading...', status: 'needaAction'}];
      
   },

   // Start the updater on socket request.
   socketNotificationReceived: function(notification, payload) {
      if ( notification === "GOOGLE_TASKS") {
         var self = this;

         if (!this.loaded) {
            this.schedualUpdateInterval();
         }

         this.loaded=true;
      }
   },

   schedualUpdateInterval: function() {
      var self = this;

      self.updateDom();
   
      setInterval(function() {
         self.updateDom();
         }, 5000);
      },

	// Override dom generator.
	getDom: function() {
      console.log("Updating tasks");
      var wrapper = document.createElement("div");

      var table = document.createElement("table");
      table.className = "gtask small";
      for (var i=0; i < this.listOfTasks.length; i++) {
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
         console.log(task.innerHTML);
         row.appendChild(task);
      }
      wrapper.appendChild(table);
      return wrapper;
   },


});
