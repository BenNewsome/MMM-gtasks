

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
      var SECRET_FOLDER = "./modules/MMM-gtasks/";
      var googleTasks = new GoogleTasks;
      var SECRET_FOLDER = "./modules/MMM-gtasks/";

      var self = this;

//      console.log("Default list of tasks:")
//      console.log(this.listOfTasks)


//      googleTasks.listOfTasks = listOfTasks;




      function storeGAuth(gauth) {
         console.log("Obtained gauth:");
         console.log(gauth);
         googleTasks.gauth = gauth;
         this.gauth = gauth
//         startUpdater();
      };
      googleTasks.getGoogleAuth(SECRET_FOLDER, storeGAuth);

      },


/**
This function is caled when a socket request to update the task list is given
**/   
   socketNotificationReceived: function(notification, payload) {
      var self = this;
      if (notification === "GOOGLE_TASKS") {
         if (payload === "Start updater") {
            console.log("Recived socket notification to start the updater");

              if (!this.loaded) {
                 var listOfTasks = [{title: 'Loading...', status: 'needaAction'}];
                 setInterval(function() {
                   console.log("Updating MMM-gtasks");
                   console.log(this.gauth);

                   console.log("Sending the following");
                   console.log(listOfTasks);
                   self.sendSocketNotification("GOOGLE_TASKS", listOfTasks);
                   },5000);
                 this.loaded=true;
                 console.log("Started periodic updater for gtasks");
                 }

         }
      }

//           var listOfTasks = [ 
//            { title: 'Task 1', status: 'needsAction'},
//            { title: 'Task 2', status: 'needsAction'},
//            ];
      
         
//        this.sendSocketNotification("GOOGLE_TASKS", listOfTasks);
//        this.updateDOM(3000);
//        };
      },

   

});

