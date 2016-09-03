const request = require('request').defaults({jar:true});
const options = require('./http_options');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');



function submit(file_path,problemId,eventEmitter){


  return function(data){

    return new Promise(function(resolve,reject){

      let problem=problemId.substring(0,problemId.length-1);
      let problemIndex=problemId[problemId.length-1];

      let http_options=options();
      http_options.method='POST';
      http_options.url='http://codeforces.com/problemset/problem/'+problem+'/'+problemIndex+'?csrf_token='+data.csrf_token;


      let formData = {
        csrf_token:data.csrf_token,
        action:'submitSolutionFormSubmitted',
        submittedProblemIndex:problemIndex,
        source:'',
        programTypeId:'42',
        sourceFile: {
          value:  fs.createReadStream(file_path),
          options: {
            filename: path.basename(file_path),
            contentType: 'text/x-c++src'
          }
        }

      }
      http_options.formData=formData;


      request(http_options,function(err,res,body){
        if(err){
          return reject(err);
        }


        if(res.statusCode!='302'){
          return reject(new Error('You have submitted exactly the same code before'));

        }

        eventEmitter.emit('submit',true);
        let $=cheerio.load(body);

        fs.writeFile('a.html',body)


        resolve(data);
      })


    })
  }
}





module.exports=submit;
