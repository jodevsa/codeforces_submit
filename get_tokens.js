const request = require('request').defaults({jar:true});
const options = require('./http_options');
const Promise = require('bluebird');
const cheerio = require('cheerio');


function get_tokens(){
  return new Promise(function(resolve,reject){
    let http_options=options();
    http_options.url='http://codeforces.com/enter';
    http_options.method='GET';

    request(http_options,function(err,res,body){
      if(err){
        resolve(err);
        return ;
      }
      let $=cheerio.load(body);
      let csrf_token;
      $('meta').map(function(n,el){
        if($(el).attr('name')=='X-Csrf-Token'){
          csrf_token=$(el).attr('content');
          if(csrf_token==undefined){
            reject(new Error('csrf_token not found.'));
            return;
          }
          return resolve(csrf_token);

        }

      });



    })

  })

}


module.exports=get_tokens;
