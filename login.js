const request = require('request').defaults({jar:true});
const options = require('./http_options');
const Promise = require('bluebird');
const cheerio = require('cheerio');


function login(username,password,eventEmitter){


  return function(csrf_token){
    return new Promise(function(resolve,reject){
      let http_options=options();
      http_options.url='http://codeforces.com/enter';
      http_options.method='POST';
      http_options.headers['Content-Type']='application/x-www-form-urlencoded';
      http_options.body='csrf_token='+csrf_token+'&action=enter&handle='+username+'&password='+password;

      request(http_options,function(err,res,body){
        if(err){
          return reject(err);

        }
        if(res.statusCode=='200'){
          
          return reject(new Error('wrong handle or password.'))
        }
        eventEmitter.emit('login',true)
        resolve('lool');
      });
    })
  }

}


module.exports=login;
