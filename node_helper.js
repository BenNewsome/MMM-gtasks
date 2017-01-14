

var NodeHelper = require("node_helper");

var listOfTasks = ["Loading tasks..."];



module.exports = NodeHelper.create({

   start: function() {
      console.log("Starting node helper for: " + this.name);
//      this.sendSocketNotification("GOOGLE_TASKS", "Hi from node");
   },
       
   
   socketNotificationReceived: function(notification, payload) {
      if (notification === "get_google_tasks") {

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/tasks-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/tasks.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'tasks-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  this.content = content;
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Tasks API.
  authorize(JSON.parse(content), getGoogleTasks);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the user's first 10 task lists.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

/*
function listTaskLists(auth) {
  var service = google.tasks('v1');
  var listOfTasks = []
  service.tasks.list({
    auth: auth,
    tasklist: '@default',
    maxResults: 10,
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var items = response.items;
    if (items.length == 0) {
      console.log('No task lists found.');
    } else {
      console.log('Task lists:');
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        listOfTasks.push(item.title);
//        console.log('%s (%s)', item.title, item.id);
      }
      this.listOfTasks = listOfTasks;
//      this.listOfTasks = "updated";
    }
  });
}
*/
function getGoogleTasks(auth) {
  var service = google.tasks('v1');
  var oldItems = 'None';
  service.tasks.list({
    auth: auth,
    tasklist: '@default',
    maxResults: 10,
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var items = response.items;
    if (items.length == 0) {
      console.log('No tasks found.');
    };
    if (items === oldItems) {
      console.log('No change in google tasks.');
   }
   else {
      console.log('New google tasks obtained:');
      listOfTasks = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        listOfTasks.push(item.title);
//        console.log('%s (%s)', item.title, item.id);
      }
      this.listOfTasks = listOfTasks;
      oldItems = items;
   
//      this.listOfTasks = "updated";
    }
  });
}
//         var processedTasks = this.processTaskList(listOfTasks);

//         var mylist = this.listOfTasks;  
//         console.log(listOfTasks);
//         this.listOfTasks = "Hello there.";
//         this.sendSocketNotification("GOOGLE_TASKS", processedTasks);
         this.sendSocketNotification("GOOGLE_TASKS", listOfTasks);
         }
   },

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

});

   
