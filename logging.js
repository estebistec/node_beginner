// TODO need a string-formatting lib. all this strcat'ing with + sucks

function logRequest(request, response) {
  // TODO also log extra response info (e.g., 302's location)
  console.log(request.method + " " + request.url + " HTTP/" + request.httpVersion +
      " => " + response.statusCode);
  if(process.env.NODE_ENV == "DEVELOPMENT") {
    for(headerName in request.headers) {
      console.log("\t" + headerName + ": " + request.headers[headerName]);
    }
  }
}

exports.logRequest = logRequest;
