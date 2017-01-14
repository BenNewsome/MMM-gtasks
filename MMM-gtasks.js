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

      var tasks = "defaultTasks";
      this.tasks = tasks;

      var listOfTasks = ["Loading tasks....."];
      this.listOfTasks = listOfTasks;

      this.sendSocketNotification("get_google_tasks", "hi");

      var self = this;
      setInterval(function() {
         self.updateDom(500); 
      }, 10000);


   },


   socketNotificationReceived: function(notification, payload) {
      if ( notification === "GOOGLE_TASKS") {


         var self = this;
         var listOfTasks = payload;
         this.listOfTasks = listOfTasks;
      };
   },

	// Override dom generator.
	getDom: function() {


     this.sendSocketNotification("get_google_tasks", "hi");

     listOfTasks = this.listOfTasks;

      var wrapper = document.createElement("div");


//      var title = document.createElement("div"); 
 //     title.className = "title";
//      title.innerHTML = "To do";
//      wrapper.appendChild(title);

      var table = document.createElement("table");
      table.className = "gtask small";
      for (var i=0; i < listOfTasks.length; i++) {
         var row = document.createElement("tr");
         table.appendChild(row)

         var task = document.createElement("td");
         task.className = "task";
         task.innerHTML = "&#9744 " + this.listOfTasks[i];
         //task.innerHTML = this.listOfTasks[i];
         row.appendChild(task);
      }
      wrapper.appendChild(table);
      return wrapper;
   },


});
