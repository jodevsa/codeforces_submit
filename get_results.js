const request = require('request').defaults({jar:true});
const options = require('./http_options');
const WebSocket = require('ws');
function get_results(data){


  let http_options=options();
  http_options.url='http://pubsub2.codeforces.com/ws/'+data.uc+'/'+data.cc+'/'+data.pc+'?_=1472812847834&tag=&time=&eventid='

  const ws=new WebSocket(http_options.url);
  var x={};
  var counter=1;
  let done=false;
  ws.on('message', function(data, flags) {

    // flags.binary will be set if a binary data is received.
    // flags.masked will be set if the data was masked.
    let test=JSON.parse(data);
    var x=test.text;
    var x=JSON.parse(x);

    if(!done){
      try{
        var results=x.d[6];


        if(results=='COMPILATION_ERROR' || results=='WRONG_ANSWER'){
          console.log("<!>".blue+"   "+(x.d[6].toString()+" on test "+x.d[8].toString()).red);
          var link='http://www.codeforces.com/contest/'+x.d[2]+'/submission/'+x.d[1];
          console.log("<!>".blue+"   "+link.red)
          ws.close();
          done=true;
        }
        if(results=='OK'){
          var link='http://www.codeforces.com/contest/'+x.d[2]+'/submission/'+x.d[1];
          console.log("<!>".blue+"   "+"Accepted".green);
          console.log("<!>".blue+"   "+link.green)
          ws.close();
          done=true;

        }

      }
      catch(e){

      }
    }
  });



}



module.exports=get_results;
