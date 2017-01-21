

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
         var output = [];
      
         for (var i = 0; i < rawTasks.length; i++) {
            var item = rawTasks[i];
            var formattedItem = {title:item.title, status:item.status};
            output.push(formattedItem)
            }

         var listOfTasks = output

         if (payload.message.config.debug) {
            console.log("List of tasks updated");
         };

         self.sendSocketNotification("GOOGLE_TASKS", listOfTasks);
      };

      if (notification === "GOOGLE_TASKS") {
         if (payload.message === "Start updater") {

              if (!this.loaded) {
                 var gtasks = this.googleTasks;

                 //Run now so we dont have to wait for the updater.
                 gtasks.updateTasks(gauth, processTasks);

                 setInterval(function() {
                   gtasks.updateTasks(gauth, processTasks );
                   },5*60*1000);
                 this.loaded=true;
                 if (payload.message.config.debug) {
                   console.log("Started periodic updater for gtasks");
                   };
                 }

         }
      }

      },

   

});

