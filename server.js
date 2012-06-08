var http = require("http");
var url = require("url");

function start(route, handle, port) {
  port = typeof port !== "undefined" ? port : 8888;

  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(port);

  console.log("Server has started. Running at: http://localhost:" + port);
}

exports.start = start;
