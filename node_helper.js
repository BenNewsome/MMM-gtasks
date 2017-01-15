

var NodeHelper = require("node_helper");

var GoogleTasks = require("./GoogleTasks.js");

module.exports = NodeHelper.create({

/**
The start function is what is called initialy. This is where the authorisation should happen.
This should check for authorisation. If none found, show a link in the console to it.
Also show a need for this on the mirror.
**/
   start: function() {
      console.log("Starting node helper for: " + this.name);
      this.loaded = false;
      this.listOfTasks = [{title: 'Loading...', status: 'needaAction'}];
      var SECRET_FOLDER = "./modules/MMM-gtasks/";
      var googleTasks = new GoogleTasks;
      var SECRET_FOLDER = "./modules/MMM-gtasks/";



      function startUpdater() {
         setInterval(function() {
           console.log("Updating MMM-gtasks");
//           this.sendSocketNotification("GOOGLE_TASKS", this.listOfTasks);
            },5000);
         }

      function storeGAuth(gauth) {
         console.log("Obtained gauth:");
         console.log(gauth);
         this.gauth = gauth;
         startUpdater();
      };
      googleTasks.getGoogleAuth(SECRET_FOLDER, storeGAuth);


    



      },

   // Create the periodic updater.
//   schedualUpdateInterval: function() {
//      var self = this;

 //     self.updateDom();

//      setInterval(function() {
//         console.log("Updating MMM-gtasks");
//         this.sendSocketNotification("GOOGLE_TASKS", this.listOfTasks);
//         }, 5000);
//      },



/**
This function is caled when a socket request to update the task list is given
**/   
   socketNotificationReceived: function(notification, payload) {
//      var self = this;
      if (notification === "update-MMM-gtasks") {

        if (!this.loaded) {

            this.schedualUpdateInterval();
            console.log("Started periodic updater for gtasks");
         }

           var listOfTasks = [ 
            { title: 'Task 1', status: 'needsAction'},
            { title: 'Task 2', status: 'needsAction'},
            ];
      
         
        this.sendSocketNotification("GOOGLE_TASKS", listOfTasks);
//        this.updateDOM(3000);
        };
      },

   

});

