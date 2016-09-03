#!/usr/bin/env node
const cheerio = require('cheerio');
const Promise = require('bluebird');
const get_results = require('./get_results');
const get_submission_token = require('./get_submission_token');
const get_tokens = require('./get_tokens');
const login = require('./login');
const submit = require('./submit');
var colors=require('colors');
var para=process.argv;
var filename=process.argv[process.argv.length-1];
var prob=process.argv[process.argv.length-2].toUpperCase();;

console.log(("<!>".blue+"   "+("FILE"+":"+filename).green)+(" PROBLEM:"+prob).green);







get_tokens()
.then(login('test_nodejs','123123'))
.then(get_submission_token(prob))
.then(submit(filename,prob))
.then(get_results)
.catch(function(err){console.log("<!>".blue+"   "+err)})
