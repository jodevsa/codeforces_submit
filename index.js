'use strict'


const get_results = require('./get_results');
const get_submission_token = require('./get_submission_token');
const get_tokens = require('./get_tokens');
const login = require('./login');
const submit = require('./submit');

var events = require('events');



function submit_code(username,password,problem,solution_path){
  let eventEmitter = new events.EventEmitter();



get_tokens()
.then(login(username,password,eventEmitter))
.then(get_submission_token(problem))
.then(submit(solution_path,problem,eventEmitter))
.then(get_results(eventEmitter))
.catch(function(err){eventEmitter.emit('error',err)})

return eventEmitter;

}



module.exports=submit_code;
