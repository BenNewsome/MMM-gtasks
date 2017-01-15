

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

      function storeGAuth(gauth) {
         console.log("Obtained gauth:");
         console.log(gauth);
//         this.gauth = gauth;
//         this.schedualUpdateInterval();
      };
//
      googleTasks.getGoogleAuth(SECRET_FOLDER, storeGAuth);
    



      },


/**
This function is caled when a socket request to update the task list is given
**/   
   socketNotificationReceived: function(notification, payload) {
//      var self = this;
      if (notification === "update-MMM-gtasks") {
      

        var listOfTasks = [ 
         { title: 'Task 1', status: 'needsAction'},
         { title: 'Task 2', status: 'needsAction'},
         ];
         
        this.sendSocketNotification("GOOGLE_TASKS", listOfTasks);
//        this.updateDOM(3000);
        };
      },

   

});

/*
   processTaskList: function(listOfTasks) {
      var outputText = "<p id='todotitle'> To Do </p>";
      for (var i=0; i < listOfTasks.length; i++) {
         newLine = "<p id='todotask'>" + listOfTasks[i] + "</p>";
         outputText += newLine;
      }

      return outputText;
   },
*/
