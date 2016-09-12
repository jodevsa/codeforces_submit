#!/usr/bin/env node

'use strict'

const submit_code = require('../index');
const colors=require('colors')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
////////////////stupid_stdout////////////////////////////////
function printError(text){

  console.log("<".blue.bold+"!".red.bold+">".blue.bold+"\t"+text.red.bold)

}
function printSuccess(text){

  console.log("<".blue.bold+"!".green.bold+">".blue.bold+"\t"+text.green.bold)

}
function printResults(text,success){
  if(success){
    process.stdout.write('                                                        ');
    process.stdout.write(' \r'+"<".blue.bold+"!".green.bold+">".blue.bold+"\t"+text.green.bold+'\r')
  }
  else{

    process.stdout.write('                                                        ');
    process.stdout.write(' \r'+"<".blue.bold+"!".red.bold+">".blue.bold+"\t"+text.red.bold+'\r')
  }

}
////////////////////////////////////////////////////


const args = process.argv.slice(2);

const problem=args[0];
const solution_path=args[1];
rl.question('Enter Handle:'.blue, (handle) => {
  rl.question('Enter Password:'.blue, (password) => {
    rl.close();
    submit_code(handle,password,problem,solution_path)
    .on('login',function(success){
      if(success){
        printSuccess("Logged In Successfully");
      }

    })
    .on('submit',function(success){
      if(success){
        printSuccess("Submitted Successfully");
      }

    })
    .on('error',function(error){
      printError(error.message);

    })
    .on('live_result',function(output){
      printResults(output.reason+' on test '+output.testcase,true);
    })
    .on('result',function(output){
      if(output.success){
        printResults('Accepted',true);
        console.log('');
        printSuccess('Submission Link : '+output.link);
      }
      else{

        printResults(output.reason+' on test '+output.testcase,false);
        console.log('');
        printError('Submission Link : '+output.link);
      }

    })
  });

});
