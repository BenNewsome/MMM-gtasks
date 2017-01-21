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
      this.googleTasks = googleTasks;
      var SECRET_FOLDER = "./modules/MMM-gtasks/";

      var self = this;

      function storeGAuth(gauth) {
         googleTasks.gauth = gauth;
         this.gauth = gauth
      };
      googleTasks.getGoogleAuth(SECRET_FOLDER, storeGAuth);
   },


/**
This function is caled when a socket request to update the task list is given
**/   
   socketNotificationReceived: function(notification, payload) {

      var self = this;
      var gauth = this.googleTasks.gauth;

      function processTasks(rawTasks) {
         if (payload.config.debug) {
            console.log("Got raw tasks for processing: ");
            console.log(rawTasks);
         };
         var listOfTasks = [];

         // Check if we got an error
         if ('errors' in rawTasks) {
//         if (rawTasks.errors[0].message == "Login Required") {
            listOfTasks = [
               "Problem loading tasks.",
               "Try running the mirror with node serveronly for extra info",
               "Follow the guide in the readme.md",
               "Have you downloaded your 'client_sectet.json'?",
               "Have you ran initialy with node serveronly and followed the link provided?",
               ]
         } else {
            
            // Update the tasks if no error.
   
            for (var i = 0; i < rawTasks.length; i++) {
               var task;
               var taskTitle = rawTasks[i].title
               // Shorten long strings
               var maxString = payload.config.taskMaxLength
               if (taskTitle.length > maxString) {
                  taskTitle = taskTitle.substring(0,maxString) + "..."
                  }
   
               // Add checkbox
               if (rawTasks[i].status=='needsAction'){
                  task = "&#9744 " + taskTitle
               } else {
                  task = "&#9745 " + taskTitle
               };
   
               listOfTasks.push( task );
            };
   
            if (payload.config.debug) {
               console.log("List of tasks updated");
               console.log(listOfTasks);
            };
         }
         self.sendSocketNotification("GOOGLE_TASKS", listOfTasks);
      };


      if (notification === "GOOGLE_TASKS") {
         if (payload.message === "Start updater") {

              var gtasks = this.googleTasks;
              var tasksOptions = {auth: gauth, config: payload.config}

              //Run now so we dont have to wait for the updater.
              gtasks.updateTasks(tasksOptions, processTasks);
              if (payload.config.debug) {
                  console.log("Sent a task update on request")
              }

              // If updater not loaded, start the updater.
              if (!this.loaded) {
                 setInterval(function() {
                   gtasks.updateTasks(tasksOptions, processTasks );
                   },payload.config.updateFrequency*1000);
                 this.loaded=true;
                 if (payload.config.debug) {
                   console.log("Started periodic updater for gtasks");
                   };
              }

         }
      }
   },
});

