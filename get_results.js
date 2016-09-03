const request = require('request');
const options = require('./http_options');
const WebSocket = require('ws');
var counter=0;
function get_reason(eventEmitter){

  return function(data){
    return new Promise(function(resolve,reject){
      let done=false;
      let http_options=options();
      http_options.url='http://pubsub2.codeforces.com/ws/'+data.uc+'/'+data.cc+'/'+data.pc+'?_=1472812847834&tag=&time=&eventid='
      const ws=new WebSocket(http_options.url);
      ws.on('message', function(data, flags) {


        let x=JSON.parse(JSON.parse(data).text);
        let reason=x.d[6];
        let testcase=x.d[8];
        if(testcase>counter || reason!='TESTING'){
          counter=testcase;
        if(!done){
          try{



            if(reason=='COMPILATION_ERROR' || reason=='WRONG_ANSWER'){


              let link='http://www.codeforces.com/contest/'+x.d[2]+'/submission/'+x.d[1];

              eventEmitter.emit('result',{success:false,link:link,reason:reason,testcase:testcase});
              ws.close();
              done=true;
            }
            if(reason=='OK'){
              let link='http://www.codeforces.com/contest/'+x.d[2]+'/submission/'+x.d[1];
              eventEmitter.emit('result',{success:true,link:link});

              ws.close();
              done=true;

            }
            eventEmitter.emit('live_result',{reason:reason,testcase:testcase});

          }
          catch(e){
            console.log(e);
            return reject(e);
          }
        }
      }
      });



    })
  }
}


module.exports=get_reason;
