


//var NodeHelper = require("node_helper");

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/tasks-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/tasks.readonly'];
// Where the credentials should be stored.
//        var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
//            process.env.USERPROFILE) + '/.credentials/';
//       var TOKEN_PATH = TOKEN_DIR + 'tasks-nodejs-quickstart.json';


// Specify the locations of the client_secret downloaded and where to store the secret token

var gauth;

function GoogleTasks() {}

GoogleTasks.gauth = gauth;


GoogleTasks.prototype.getGoogleAuth = function(TOKEN_DIR, callback) {
        //var TOKEN_DIR = 'modules/MMM-gtasks/'
        var TOKEN_PATH = TOKEN_DIR + 'gtasks_token.json'
        var CLIENT_SECRET = TOKEN_DIR + 'client_secret.json'
        function authorize(credentials, callback) {
          var clientSecret = credentials.installed.client_secret;
          var clientId = credentials.installed.client_id;
          var redirectUrl = credentials.installed.redirect_uris[0];
          gauth = new googleAuth();
          var oauth2Client = new gauth.OAuth2(clientId, clientSecret, redirectUrl);

          // Check if we have previously stored a token.
          fs.readFile(TOKEN_PATH, function(err, token) {
            if (err) {
              console.log("No token found at: " + TOKEN_PATH);
              getNewToken(oauth2Client, callback);
            } else {
              oauth2Client.credentials = JSON.parse(token);
              callback(oauth2Client);
            }
          });
        };

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
//              callback(oauth2Client);
            });
          });
        };

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
        // Load client secrets from a local file.

        fs.readFile(CLIENT_SECRET, function processClientSecrets(err, content) {
                  this.content = content;
                  if (err) {
                    console.log('Error loading client secret file: ' + err);
                    console.log('Go to the following address for a guide to get a google secret file')
                    console.log('https://developers.google.com/google-apps/tasks/quickstart/nodejs#step_1_turn_on_the_api_name')
                    console.log('The following files were found in this folder:')
                    fs.readdir(TOKEN_DIR, (err,files) => {
                      files.forEach(file => {
                        console.log(file);
                        });
                     });

                    return;
                  }
                  // Authorize a client with the loaded credentials, then call the
                  // Google Tasks API.
                  authorize(JSON.parse(content), callback);
                });

   };

GoogleTasks.prototype.updateTasks = function(gauth, callback) {

  var listOfTasks = [];

  var service = google.tasks('v1');
  var oldItems = 'None';
  service.tasks.list({
    auth: gauth,
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
    } else {
      callback(items);
   }
  });
};


module.exports = GoogleTasks;
