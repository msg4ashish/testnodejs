/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
 
 exports.githubifidproxy = (req, res) => {
    console.log("Request method here is :" + req.method);
    let message = 'All good';
    if (req.method === "GET"){
      message = req.query.message || req.body.message || 'All good!!';
      res.status(200).send(message);
      //return new Response("All Good")
    } else if (req.method === "POST") {
      console.log("POST request:" + req);
      console.log(JSON.stringify(req.body));
      console.log(JSON.stringify(req.rawBody));

      console.log("\n\n" + "headers are");
      console.log(JSON.stringify(req.headers));
      
  
      const allowedParamKeysArray = "colors|event|plugins|referrer|sender|sH|sW|tzOffset|url|wH|wW".split("|")
  
      console.log("sender data is:" + req.body.sender);
      
      
      const keys = Object.keys(req.body);
      const map = new Map();
         for(let i = 0; i < keys.length; i++){
        map.set(keys[i], req.body[keys[i]]);
         };
      console.log("Printing map..");
      console.log(map);
      
      var events= [];
      var sender;
      
      invalidRequest("some message", req);
      for (const param of map) {
        paramKey = param[0];
        console.log("Param key is:" + paramKey);
        if(!allowedParamKeysArray.includes(paramKey)) {
          //return invalidRequest("bad parameter "+paramKey, request);
          res.status(400).send("Bad request");
        } else{
          if(paramKey === "sender"){
            sender = param[1]; // value of param key
          } else if (paramKey === "event"){
            events.push(param[1]); // value of param key
          }
        }
      }
      console.log("Done most of the validation");
      
      if(sender == null || sender == ""){
        res.status(400).send("missing sender");
      }

      if(sender == null || sender == ""){
        return invalidRequest("missing sender", request);
      }
  
      // There are no more than 10 events in the request
      var eventCount = events.length;
      console.log("Event count is:"+ eventCount);
      if(eventCount < 1 || eventCount > 10){
        res.status(400).send("Invalid event count");
      }


      // The request is no more than 10k in size
      const contentLength = req.headers['content-length'];
      console.log("Content length is:" + contentLength);

      if (contentLength && contentLength > 10240) {
        res.status(400).send("POST content too long: " + contentLength);
      }


      res.status(200).send("All is well");
   }
  
  };
  
  // Method to log error message and respond with 400 status to client in case of bad request
  function invalidRequest(errorMessage, request) {
    console.log("Method called");
  }
