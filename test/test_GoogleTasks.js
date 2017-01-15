// tests/test_GoogleTasks.js


var chai = require('chai');
var expect = chai.expect;
var GoogleTasks = require('./../GoogleTasks.js');


describe('getAuth', function() {
//   var foo=false;

//   beforeEach(function(done){
//      setTimeout(function() {
//        gauth = googleTasks.getGoogleAuth(SECRET_FOLDER, done)
         // complete the async beforeEach
//         done();
//      }, 5000);
//   });


   it('Testing creation of gauth object', function(done) {
      var googleTasks = new GoogleTasks;
      var SECRET_FOLDER = "./"
      googleTasks.getGoogleAuth(SECRET_FOLDER, gotGoogleAuth);

      function gotGoogleAuth(gauth) {
         console.log("Returned authorisation:");
         console.log(gauth);
         done();
         }
//      done();

//      console.log(GoogleTasks.gauth);
//      expect(gauth).to.equal(1);
   });
});

describe('getTasks', function() {

   it('Testing getting tasks list', function(done) {

      var googleTasks = new GoogleTasks;
      var SECRET_FOLDER = "./";
      googleTasks.getGoogleAuth(SECRET_FOLDER, gotGoogleAuth);

      function printTasks(list) {
         console.log("Recived the following task list");
         console.log(list);
         done();
      }

      function gotGoogleAuth(gauth) {
         console.log("Returned authorisation:");
         console.log(gauth);
         googleTasks.updateTasks(gauth, printTasks)
         }
   });
});

describe('processTasks', function() {
   it('Testing processing of tasks', function() {
      var googleTasks = new GoogleTasks;

      var rawTasks = [
         { kind: 'tasks#task',
           title: 'Send out sport diver asking about interest.',
           updated: '2017-01-10T19:41:38.000Z',
           status: 'needsAction' },
         { kind: 'tasks#task',
           title: 'Visit santander about student account.',
           updated: '2017-01-10T15:27:31.000Z',
           status: 'needsAction' } 
     ];

      var output = googleTasks.formatTasks(rawTasks);
      console.log("Formatted tasks output:");
      console.log(output);
   });
});
   

