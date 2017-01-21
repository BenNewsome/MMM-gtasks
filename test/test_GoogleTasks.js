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
         var tasksOptions = {auth:gauth, config:{taskList:"@default", tasksNumber:5} }
         googleTasks.updateTasks(tasksOptions, printTasks)
         }
   });
});

   

