var logging = require("./logging");


function route(handle, pathname, response, request) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    // TODO on HTTP PUT/POST/DELETE, should be a 403
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
  logging.logRequest(request, response);
}

exports.route = route;
